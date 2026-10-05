import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://api.emailjs.com/**", (route) => route.abort());
  await page.addInitScript(() => {
    localStorage.setItem("smey-portfolio-language", "en");
    localStorage.setItem("smey-portfolio-theme", "light");
  });
});

for (const width of [360, 768, 1024, 1440]) {
  test(`layout, filters and popup at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(1800);
    await expect(page.locator("body")).toBeVisible();
    const overflow = await page.evaluate(() => ({
      width: innerWidth,
      actual: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll("body *")]
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return (
            rect.width > 0 &&
            rect.right > innerWidth + 1 &&
            getComputedStyle(el).position !== "fixed"
          );
        })
        .map((el) => `${el.tagName}.${el.className}`)
        .slice(0, 10),
    }));
    expect(overflow.actual, JSON.stringify(overflow)).toBeLessThanOrEqual(
      width,
    );
    if (width < 1280) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(page.locator("#mobile-navigation")).not.toHaveAttribute(
        "inert",
      );
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
      await expect(page.locator("#mobile-navigation")).toHaveAttribute("inert");
    }
    await page
      .locator("#skills")
      .getByRole("button", { name: "Testing" })
      .click();
    await expect(
      page.locator("#skills").getByRole("heading", { name: "Postman" }),
    ).toBeVisible();
    await expect(
      page.locator("#skills").getByRole("heading", { name: "MySQL" }),
    ).toHaveCount(0);
    const readMore = page.getByRole("button", { name: "Read more" }).first();
    await readMore.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toBeVisible();
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true);
    await dialog.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    const close = dialog.getByRole("button", { name: "Close project details" });
    await expect(close).toBeInViewport();
    await page.screenshot({ path: `test-results/dialog-${width}.png` });
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(readMore).toBeFocused();
    await page.getByRole("button", { name: "Khmer", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "km");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
  });
}

async function fillForm(page) {
  await page.goto("/#contact");
  await page.waitForTimeout(1700);
  await page.getByLabel("Name", { exact: true }).fill("Portfolio Test");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Form check");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Testing the contact form without sending an email.");
}

test("contact success sends trimmed values and clears the form", async ({
  page,
}) => {
  await page.route("https://api.emailjs.com/**", async (route) => {
    const payload = route.request().postDataJSON();
    expect(payload.template_params.reply_to).toBe("test@example.com");
    expect(payload.template_params.name).toBe("Portfolio Test");
    expect(payload.template_params.title).toBe(payload.template_params.subject);
    expect(payload.template_params.time).toMatch(/\(UTC\+07:00\)$/);
    await route.fulfill({ status: 200, body: "OK" });
  });
  await fillForm(page);
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("status")).toContainText("successfully");
  await expect(page.getByLabel("Message", { exact: true })).toHaveValue("");
});

test("contact failure preserves message and permits retry", async ({
  page,
}) => {
  await page.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 500, body: "Server error" }),
  );
  await fillForm(page);
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("alert")).toContainText("Please try again");
  await expect(page.getByLabel("Message", { exact: true })).not.toHaveValue("");
  await expect(
    page.getByRole("button", { name: "Send Message" }),
  ).toBeEnabled();
});

test("whitespace-only message never sends", async ({ page }) => {
  let requests = 0;
  await page.route("https://api.emailjs.com/**", (route) => {
    requests++;
    return route.abort();
  });
  await fillForm(page);
  await page.getByLabel("Message", { exact: true }).fill("   ");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("alert")).toContainText("fill in all fields");
  expect(requests).toBe(0);
});

test("unconfigured form hides the notice before submission", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5175/#contact");
  await expect(page.locator("form")).not.toContainText(
    "Online messaging is temporarily unavailable",
  );
  await expect(page.locator("#contact a[href^='mailto:']")).toBeVisible();
});

test("CV downloads as a PDF", async ({ page }) => {
  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download CV" }).first().click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("REAKSMEY SAN-CV.pdf");
  expect(await download.failure()).toBeNull();
});

test("dark theme keeps form status readable", async ({ page }) => {
  await fillForm(page);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page.screenshot({ path: "test-results/contact-dark.png" });
});
