import { test, expect } from "@playwright/test";

for (const width of [360, 768, 1440]) {
  test(`dashboard navigation, themes and editing at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/admin");
    await expect(
      page.getByRole("heading", { name: "Project manager" }),
    ).toBeVisible();
    await page.evaluate(async () => {
      const { default: React } =
        await import("/node_modules/.vite/deps/react.js");
      const { default: ReactDOM } =
        await import("/node_modules/.vite/deps/react-dom_client.js");
      const { AdminDashboard } =
        await import("/src/components/AdminDashboard.jsx");
      const { ProjectManager } = await import("/src/pages/Admin.jsx");
      document.getElementById("root").style.display = "none";
      const container = document.createElement("div");
      container.id = "dashboard-preview";
      document.body.append(container);
      function Preview() {
        const [theme, setTheme] = React.useState("light");
        const [editing, setEditing] = React.useState(null);
        const [busy, setBusy] = React.useState(false);
        React.useEffect(() => {
          document.documentElement.classList.toggle("dark", theme === "dark");
        }, [theme]);
        const onAdd = () =>
          setEditing({
            id: "test-new",
            title: "",
            type: "web",
            description: { en: "", km: "" },
            longDescription: { en: "", km: "" },
            badge: { en: "", km: "" },
            date: { en: "", km: "" },
            image: "",
            order: 0,
            links: [],
            tech: [],
            isNew: true,
          });
        return React.createElement(
          AdminDashboard,
          {
            user: { email: "reaksmey@example.com" },
            theme,
            toggleTheme: () =>
              setTheme((old) => (old === "light" ? "dark" : "light")),
            editing,
            busy,
            onAdd,
            onEdit: setEditing,
            onDiscard: () => setEditing(null),
            onSignOut: () => {
              window.didSignOut = true;
            },
          },
          React.createElement(ProjectManager, {
            editing,
            setEditing,
            busy,
            setBusy,
            setMessage: () => {},
            showStats: false,
          }),
        );
      }
      ReactDOM.createRoot(container).render(React.createElement(Preview));
    });
    const dashboard = page.locator("#dashboard-preview");
    await expect(
      dashboard.getByRole("heading", { name: "Overview", exact: true }),
    ).toBeVisible();
    await expect(
      dashboard.getByRole("heading", { name: "Latest work", exact: true }),
    ).toBeVisible();
    await expect(dashboard.locator(".dash-stat").first()).toContainText("11");
    await expect(dashboard.locator(".dash-project-row")).toHaveCount(5);
    const topbar = dashboard.locator(".dash-topbar");
    await expect(topbar).toHaveCSS("position", "sticky");
    await expect(topbar).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await page.evaluate(() =>
      window.scrollTo({ top: 400, behavior: "instant" }),
    );
    expect((await topbar.boundingBox()).y).toBe(0);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    if (width <= 640) {
      await expect(dashboard.locator(".dash-topbar-meta")).toHaveCSS(
        "font-size",
        "0px",
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/dashboard-overview-${width}.png`,
      fullPage: true,
    });
    async function openMenu() {
      if (width <= 1000)
        await dashboard
          .getByRole("button", { name: "Open dashboard menu" })
          .click();
    }
    if (width <= 1000) {
      await openMenu();
      await expect(
        dashboard.getByRole("dialog", { name: "Dashboard menu" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        dashboard.getByRole("button", { name: "Open dashboard menu" }),
      ).toBeFocused();
    }
    await openMenu();
    await dashboard
      .getByRole("button", { name: "Appearance", exact: true })
      .click();
    await expect(
      dashboard.getByRole("heading", { name: "Appearance", exact: true }),
    ).toBeVisible();
    await dashboard
      .getByRole("button", { name: "Dark Select", exact: true })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await openMenu();
    await dashboard
      .getByRole("button", { name: "Overview", exact: true })
      .click();
    await page.screenshot({
      path: `test-results/dashboard-dark-${width}.png`,
      fullPage: true,
    });
    await dashboard.locator(".dash-project-row").first().click();
    await expect(dashboard.getByLabel("Project title")).toHaveValue(
      "Student Leave Management",
    );
    await openMenu();
    await dashboard
      .getByRole("button", { name: "Overview", exact: true })
      .click();
    const discard = page.getByRole("dialog", {
      name: "Discard unsaved changes?",
    });
    await expect(discard).toBeVisible();
    await expect(
      discard.getByRole("button", { name: "Keep editing" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(discard).not.toBeVisible();
    if (width <= 1000) await page.keyboard.press("Escape");
    await expect(dashboard.getByLabel("Project title")).toBeVisible();
    await dashboard
      .getByRole("button", { name: "Cancel", exact: true })
      .click();
    await page
      .getByRole("dialog", { name: "Discard unsaved changes?" })
      .getByRole("button", { name: "Discard changes", exact: true })
      .click();
    await expect(
      dashboard.getByRole("searchbox", { name: "Search projects" }),
    ).toBeVisible();
    await openMenu();
    await dashboard
      .getByRole("button", { name: "New project", exact: true })
      .click();
    await expect(dashboard.getByLabel("Project title")).toHaveValue("");
    await dashboard
      .getByRole("button", { name: "Cancel", exact: true })
      .click();
    await page
      .getByRole("dialog", { name: "Discard unsaved changes?" })
      .getByRole("button", { name: "Discard changes", exact: true })
      .click();
    await openMenu();
    await dashboard
      .getByRole("button", { name: "Sign out", exact: true })
      .click();
    const logout = page.getByRole("dialog", { name: "Sign out?" });
    await expect(logout).toBeVisible();
    expect(await page.evaluate(() => Boolean(window.didSignOut))).toBe(false);
    await logout.getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(
      dashboard
        .getByRole("button", { name: "Sign out", exact: true })
        .filter({ visible: true }),
    ).toBeFocused();
    await dashboard
      .getByRole("button", { name: "Sign out", exact: true })
      .filter({ visible: true })
      .click();
    await page.screenshot({ path: `test-results/confirmation-${width}.png` });
    await logout.getByRole("button", { name: "Sign out", exact: true }).click();
    expect(await page.evaluate(() => window.didSignOut)).toBe(true);
    expect(errors).toEqual([]);
  });
}
