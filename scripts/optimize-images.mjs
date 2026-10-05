import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

let before = 0;
let after = 0;
for (const directory of ["src/assets/images", "src/assets/logo"]) {
  for (const file of await readdir(directory)) {
    if (!file.endsWith(".png")) continue;
    const source = path.join(directory, file);
    const output = source.replace(/\.png$/, ".webp");
    await sharp(source)
      .resize({
        width: directory.endsWith("logo") ? 64 : 1600,
        withoutEnlargement: true,
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(output);
    before += (await stat(source)).size;
    after += (await stat(output)).size;
  }
}
console.log(
  `Images: ${(before / 1e6).toFixed(2)} MB → ${(after / 1e6).toFixed(2)} MB (${Math.round((1 - after / before) * 100)}% smaller)`,
);
