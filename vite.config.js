import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { createTranslationHandler } from "./server/translate-project.js";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "local-project-translation",
      configureServer(server) {
        const handler = createTranslationHandler({
          env: { ...loadEnv(mode, process.cwd(), ""), ...process.env },
        });
        server.middlewares.use("/api/translate-project", async (req, res) => {
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (body) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(body));
            return res;
          };
          try {
            const chunks = [];
            let size = 0;
            for await (const chunk of req) {
              size += chunk.length;
              if (size > 64000) {
                res
                  .status(413)
                  .json({ error: "Translation request is too large." });
                return;
              }
              chunks.push(Buffer.from(chunk));
            }
            req.body = Buffer.concat(chunks).toString("utf8");
            await handler(req, res);
          } catch {
            if (!res.writableEnded)
              res
                .status(500)
                .json({ error: "Translation is unavailable. Please retry." });
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
