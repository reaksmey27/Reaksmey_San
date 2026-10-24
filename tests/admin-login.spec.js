import { test, expect } from "@playwright/test";

for (const width of [360, 1280]) {
  test(`login visibility, retry and responsive layout at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/admin");
    await expect(
      page.getByRole("heading", { name: "Project manager" }),
    ).toBeVisible();
    await page.evaluate(async () => {
      const { default: React } =
        await import("/node_modules/.vite/deps/react.js");
      const { default: ReactDOM } =
        await import("/node_modules/.vite/deps/react-dom_client.js");
      const { AdminLogin } = await import("/src/components/AdminLogin.jsx");
      document.getElementById("root").style.display = "none";
      const container = document.createElement("main");
      const { adminClasses } = await import("/src/styles/adminStyles.js");
      container.className = adminClasses("admin-shell");
      document.body.append(container);
      function Preview() {
        const [busy, setBusy] = React.useState(false);
        const [error, setError] = React.useState("");
        return React.createElement(AdminLogin, {
          busy,
          error,
          onSubmit: (event) => {
            event.preventDefault();
            setBusy(true);
            setError("");
            window.setTimeout(() => {
              setBusy(false);
              setError("The email or password is incorrect. Please try again.");
            }, 600);
          },
        });
      }
      ReactDOM.createRoot(container).render(React.createElement(Preview));
    });
    const password = page.getByLabel("Password", { exact: true });
    await expect(page.locator(".admin-signin-story")).toHaveCSS(
      "background-image",
      /radial-gradient.*linear-gradient/,
    );
    await expect(password).toHaveAttribute("type", "password");
    await page.getByLabel("Email address").fill("admin@example.com");
    await password.fill("test-only-password");
    await page.getByRole("button", { name: "Show password" }).click();
    await expect(password).toHaveAttribute("type", "text");
    await expect(password).toHaveValue("test-only-password");
    await page.getByRole("button", { name: "Hide password" }).click();
    await expect(password).toHaveAttribute("type", "password");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Signing in" }),
    ).toBeDisabled();
    await expect(password).toBeDisabled();
    await expect(page.getByRole("alert")).toContainText(
      "email or password is incorrect",
    );
    await expect(password).toBeEnabled();
    await expect(password).toHaveValue("test-only-password");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/login-${width}.png`,
      fullPage: true,
    });
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.screenshot({
      path: `test-results/login-dark-${width}.png`,
      fullPage: true,
    });
  });
}
