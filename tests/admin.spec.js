import { test, expect } from "@playwright/test";

test("project overrides preserve images, deletions and ordering", async ({
  page,
}) => {
  await page.goto("/admin");
  const result = await page.evaluate(async () => {
    const { mergeProjects } = await import("/src/hooks/useProjects.js");
    const baseline = mergeProjects([]);
    const first = baseline[0];
    const next = baseline[1];
    const merged = mergeProjects([
      {
        ...first,
        title: "Updated project",
        image: "",
        date: { start: "2020-01-01" },
      },
      { id: next.id, deleted: true },
      {
        ...first,
        id: "new-project",
        title: "New project",
        order: 999,
        date: { start: "2027-01-01" },
      },
    ]);
    return {
      firstTitle: merged[0].title,
      lastTitle: merged.at(-1).title,
      imagePreserved:
        merged.find((p) => p.id === first.id).image === first.image,
      deleted: !merged.some((p) => p.id === next.id),
      updated: merged.some((p) => p.title === "Updated project"),
      count: merged.length,
      baselineCount: baseline.length,
    };
  });
  expect(result).toEqual({
    firstTitle: "New project",
    lastTitle: "Updated project",
    imagePreserved: true,
    deleted: true,
    updated: true,
    count: result.baselineCount,
    baselineCount: result.baselineCount,
  });
});

for (const width of [360, 1280]) {
  test(`project manager filters and editor at ${width}px`, async ({ page }) => {
    await page.route("**/src/lib/translateProject.js*", (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: `export async function translateProject(fields) {
        window.translationFields = fields;
        if (window.translationShouldFail) throw new Error("Translation service is unavailable. Please retry.");
        return Object.fromEntries(Object.keys(fields).map(key => [key, "ការបកប្រែសាកល្បង"]));
      }`,
      }),
    );
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
      const { ProjectManager } = await import("/src/pages/Admin.jsx");
      const container = document.createElement("div");
      const { adminClasses } = await import("/src/styles/adminStyles.js");
      container.className = adminClasses("admin-shell");
      container.id = "manager-preview";
      document.getElementById("root").style.display = "none";
      document.body.append(container);
      function Preview() {
        const [editing, setEditing] = React.useState(null);
        const [busy, setBusy] = React.useState(false);
        return React.createElement(ProjectManager, {
          editing,
          setEditing,
          busy,
          setBusy,
          setMessage: () => {},
        });
      }
      ReactDOM.createRoot(container).render(React.createElement(Preview));
    });
    const manager = page.locator("#manager-preview");
    await expect(manager.locator("article")).toHaveCount(11);
    await page.screenshot({
      path: `test-results/admin-dashboard-${width}.png`,
      fullPage: true,
    });
    await manager
      .getByRole("searchbox", { name: "Search projects" })
      .fill("no-such-project");
    await expect(manager.getByText("No matching projects")).toBeVisible();
    await manager.getByRole("button", { name: "Clear filters" }).click();
    await manager.getByRole("button", { name: "Design", exact: true }).click();
    await expect(manager.locator(".admin-category").first()).toHaveText(
      "Design",
    );
    await manager.getByRole("button", { name: "Edit project" }).first().click();
    await expect(
      manager.getByRole("img", { name: "Project cover preview" }),
    ).toBeVisible();
    await expect(manager.getByLabel("Project title")).not.toHaveValue("");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/admin-editor-${width}.png`,
      fullPage: true,
    });
    await manager.getByRole("button", { name: "Cancel", exact: true }).click();
    await page
      .getByRole("dialog", { name: "Discard unsaved changes?" })
      .getByRole("button", { name: "Discard changes", exact: true })
      .click();
    const firstProject = manager.locator("article").first();
    await firstProject.getByRole("button", { name: /delete/i }).click();
    const deletion = page.getByRole("dialog", { name: "Delete project?" });
    await expect(deletion).toBeVisible();
    await expect(
      deletion.getByRole("button", { name: "Cancel", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(deletion).not.toBeVisible();
    await expect(firstProject).toBeVisible();
    await manager
      .getByRole("button", { name: "Add project", exact: true })
      .click();
    await expect(
      manager.getByText("Your project cover goes here"),
    ).toBeVisible();
    await expect(manager.getByLabel("Project title")).toHaveValue("");
    await manager.getByLabel("Project title").fill("Minimal project");
    await manager
      .getByLabel("Start date (optional)", { exact: true })
      .fill("2026-07-03");
    await expect(manager.locator(".admin-date-preview")).toContainText(
      "Jul 3, 2026 – Present",
    );
    await manager
      .getByLabel("End date (optional)", { exact: true })
      .fill("2026-07-30");
    await expect(manager.locator(".admin-date-preview")).toContainText(
      "Jul 3, 2026 – Jul 30, 2026",
    );
    await expect(
      manager.getByLabel("Date label (Khmer, optional)"),
    ).toHaveValue("៣ កក្កដា ២០២៦ – ៣០ កក្កដា ២០២៦");
    await manager
      .getByLabel("End date (optional)", { exact: true })
      .fill("2026-07-01");
    await expect(manager.getByRole("alert")).toHaveText(
      "End date must be on or after the start date.",
    );
    await manager.getByLabel("End date (optional)", { exact: true }).fill("");
    await manager.getByLabel("Start date (optional)", { exact: true }).fill("");
    await expect(manager.getByText("Portfolio date:")).toHaveCount(0);
    await manager
      .getByLabel("Short description (English)")
      .fill("A short project summary.");
    await manager
      .getByLabel("Image URL")
      .fill("https://example.com/cover.webp");
    const picker = manager.getByRole("region", {
      name: "Technologies and tools",
    });
    const techSearch = picker.getByRole("searchbox");
    await techSearch.fill("firebase");
    await picker
      .getByRole("button", { name: "Select Firebase", exact: true })
      .click();
    await expect(
      picker.getByRole("button", { name: "Select Firebase", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await techSearch.fill("");
    await picker.getByRole("button", { name: "Tools", exact: true }).click();
    await picker
      .getByRole("button", { name: "Select Postman", exact: true })
      .click();
    await techSearch.fill("My custom tool");
    await techSearch.press("Enter");
    const selectedTech = picker.getByRole("list", {
      name: "Selected technologies and tools",
    });
    await expect(selectedTech.getByRole("listitem")).toHaveCount(3);
    await expect(selectedTech.locator("li > svg")).toHaveCount(3);
    await picker
      .getByRole("button", { name: "Remove Postman", exact: true })
      .click();
    await expect(selectedTech.getByRole("listitem")).toHaveCount(2);
    await picker.getByRole("button", { name: "All", exact: true }).click();
    await techSearch.fill("JavaScript");
    await picker
      .getByRole("button", { name: "Select JavaScript", exact: true })
      .click();
    await techSearch.fill("js");
    await techSearch.press("Enter");
    await expect(selectedTech.getByRole("listitem")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await picker.screenshot({
      path: `test-results/technology-picker-${width}.png`,
    });
    await manager
      .getByRole("button", { name: "Add link", exact: true })
      .click();
    await expect(
      manager.getByLabel("Link label (optional)", { exact: true }),
    ).toBeVisible();
    expect(
      await manager.locator("form").evaluate((form) => form.checkValidity()),
    ).toBe(true);
    await manager
      .getByRole("button", { name: "Remove link", exact: true })
      .click();
    await expect(
      manager.getByLabel("Link label (optional)", { exact: true }),
    ).toHaveCount(0);
    await manager
      .locator("summary")
      .filter({ hasText: "More project details" })
      .click();
    await manager
      .getByLabel("Date label (optional)", { exact: true })
      .fill("July 2026");
    await manager
      .locator("summary")
      .filter({ hasText: "Khmer translations" })
      .click();
    const khmerDescription = manager.getByLabel(
      "Short description (Khmer, optional)",
    );
    const khmerDate = manager.getByLabel("Date label (Khmer, optional)");
    await khmerDate.fill("My existing translation");
    await manager
      .getByRole("button", { name: "Auto-translate to Khmer" })
      .click();
    await expect(khmerDescription).toHaveValue("ការបកប្រែសាកល្បង");
    await expect(khmerDate).toHaveValue("My existing translation");
    expect(await page.evaluate(() => window.translationFields)).toEqual({
      description: "A short project summary.",
    });
    await expect(
      manager.getByText(
        "Khmer translations added. Review them, then save your project.",
      ),
    ).toBeVisible();
    await khmerDescription.fill("");
    await page.evaluate(() => {
      window.translationShouldFail = true;
    });
    await manager
      .getByRole("button", { name: "Auto-translate to Khmer" })
      .click();
    await expect(manager.getByRole("alert")).toContainText(
      "Translation service is unavailable",
    );
    await expect(khmerDescription).toHaveValue("");
    await expect(khmerDate).toHaveValue("My existing translation");
  });

  test(`admin setup is accessible at ${width}px`, async ({ page }) => {
    await page.addInitScript(() => {
      if (!localStorage.getItem("smey-portfolio-theme"))
        localStorage.setItem("smey-portfolio-theme", JSON.stringify("light"));
    });
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/admin");
    await expect(
      page.getByRole("heading", { name: "Project manager" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Connect Firebase to get started" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Add project" })).toHaveCount(
      0,
    );
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(
      page.getByRole("button", { name: "Switch to light mode" }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `test-results/admin-${width}.png` });
    await page.getByRole("link", { name: "Back to portfolio" }).click();
    await expect(page.locator("#work")).toBeAttached();
    expect(errors).toEqual([]);
  });
}
