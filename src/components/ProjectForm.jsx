import { adminClasses } from "../styles/adminStyles";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ImageIcon,
  Link2,
  Save,
  Trash2,
  Languages,
  LoaderCircle,
} from "lucide-react";
import { CATEGORY_BADGES, LINK_LABELS } from "../utils/projectForm";
import { translateProject } from "../lib/translateProject";
import { TechnologyPicker } from "./TechnologyPicker";
import { prepareProjectDates, projectDateError } from "../utils/projectDates";

export function ProjectForm({
  project,
  setProject,
  busy,
  onSave,
  onCancel,
  existingImage,
}) {
  const [translating, setTranslating] = useState(false);
  const [translationMessage, setTranslationMessage] = useState("");
  const [translationError, setTranslationError] = useState(false);
  const translationRequest = useRef(null);
  useEffect(() => () => translationRequest.current?.abort(), [project.id]);
  async function autoTranslate() {
    if (translationRequest.current || busy) return;
    const fields = Object.fromEntries(
      ["description", "longDescription", "badge", "date"]
        .filter(
          (field) => project[field].en.trim() && !project[field].km.trim(),
        )
        .map((field) => [field, project[field].en.trim()]),
    );
    setTranslationError(false);
    if (!Object.keys(fields).length) {
      setTranslationMessage(
        "Add English text or clear the Khmer field you want to translate. Existing translations are kept.",
      );
      return;
    }
    const controller = new AbortController();
    translationRequest.current = controller;
    setTranslating(true);
    setTranslationMessage("");
    try {
      const translations = await translateProject(fields, controller.signal);
      if (controller.signal.aborted) return;
      setProject((previous) => {
        if (!previous || previous.id !== project.id) return previous;
        const next = { ...previous };
        for (const field of Object.keys(fields)) {
          if (
            !previous[field].km.trim() &&
            previous[field].en.trim() === fields[field]
          )
            next[field] = { ...previous[field], km: translations[field] };
        }
        return next;
      });
      setTranslationMessage(
        "Khmer translations added. Review them, then save your project.",
      );
    } catch (error) {
      if (controller.signal.aborted) return;
      setTranslationError(true);
      setTranslationMessage(
        error instanceof TypeError
          ? "Could not connect to the translation service. Check your connection and retry."
          : error.message,
      );
    } finally {
      if (!controller.signal.aborted) setTranslating(false);
      if (translationRequest.current === controller)
        translationRequest.current = null;
    }
  }
  const update = (field, value) =>
    setProject((previous) => ({ ...previous, [field]: value }));
  const hasDates = Boolean(project.date.start || project.date.end);
  const dateError = projectDateError(project.date);
  const datePreview =
    hasDates && !dateError ? prepareProjectDates(project.date).en : "";
  function updateDate(field, value) {
    const next = { ...project.date, [field]: value, en: "", km: "" };
    update("date", projectDateError(next) ? next : prepareProjectDates(next));
  }
  const text = (field, language, value) =>
    update(field, { ...project[field], [language]: value });
  const linkUpdate = (index, values) =>
    update(
      "links",
      project.links.map((link, i) =>
        i === index ? { ...link, ...values } : link,
      ),
    );
  return (
    <form onSubmit={onSave} className={adminClasses("admin-editor")}>
      <fieldset
        disabled={busy || translating}
        className={adminClasses("admin-fields")}
      >
        <div className={adminClasses("admin-form-intro")}>
          <h3>{existingImage ? "Update your project" : "Create a project"}</h3>
          <p>
            Start with the essentials. Fields marked{" "}
            <span className={adminClasses("admin-required")}>*</span> are
            required; everything else can be added later.
          </p>
        </div>
        <div className={adminClasses("admin-editor-layout")}>
          <div className={adminClasses("admin-editor-main")}>
            <section
              className={adminClasses("admin-editor-section")}
              aria-label="Project information"
            >
              <div className={adminClasses("admin-editor-section-heading")}>
                <h3>Project information</h3>
                <p>The essentials visitors see on your portfolio.</p>
              </div>{" "}
              <div className={adminClasses("admin-columns")}>
                <label>
                  Project title *
                  <input
                    required
                    maxLength={160}
                    placeholder="e.g. Online shop"
                    value={project.title}
                    onChange={(e) => update("title", e.target.value)}
                  />
                </label>
                <label>
                  Category
                  <select
                    value={project.type}
                    onChange={(e) => update("type", e.target.value)}
                  >
                    <option value="web">Web development</option>
                    <option value="design">Design</option>
                    <option value="vlog">Vlog</option>
                  </select>
                </label>
              </div>
              <label>
                Short description (English) *
                <textarea
                  required
                  rows={3}
                  maxLength={10000}
                  placeholder="What does this project do, and what did you contribute?"
                  value={project.description.en}
                  onChange={(e) => text("description", "en", e.target.value)}
                />
                <small>A brief summary for the project card.</small>
              </label>
              <div className={adminClasses("admin-project-dates")}>
                <div className={adminClasses("admin-columns")}>
                  <label>
                    Start date (optional)
                    <input
                      type="date"
                      value={project.date.start || ""}
                      max={project.date.end || "9999-12-31"}
                      min="0001-01-01"
                      onChange={(e) => updateDate("start", e.target.value)}
                      aria-describedby="project-date-help"
                    />
                  </label>
                  <label>
                    End date (optional)
                    <input
                      type="date"
                      value={project.date.end || ""}
                      min={project.date.start || "0001-01-01"}
                      max="9999-12-31"
                      onChange={(e) => updateDate("end", e.target.value)}
                      aria-describedby="project-date-help"
                      aria-invalid={Boolean(dateError)}
                    />
                  </label>
                </div>
                <small id="project-date-help">
                  Leave the end date blank for an ongoing project. Projects are
                  ordered newest first by end date, or start date when no end
                  date is set.
                </small>
                {dateError ? (
                  <p role="alert" className={adminClasses("admin-date-error")}>
                    {dateError}
                  </p>
                ) : (
                  datePreview && (
                    <p className={adminClasses("admin-date-preview")}>
                      Portfolio date: <strong>{datePreview}</strong>
                    </p>
                  )
                )}
              </div>
            </section>{" "}
            <details className={adminClasses("admin-optional")}>
              <summary>
                <span>
                  More project details <small>Optional</small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div className={adminClasses("admin-optional-fields")}>
                <label>
                  Full description (optional)
                  <textarea
                    rows={5}
                    maxLength={10000}
                    placeholder="Add features, your role, or what you learned."
                    value={project.longDescription.en}
                    onChange={(e) =>
                      text("longDescription", "en", e.target.value)
                    }
                  />
                </label>
                <div className={adminClasses("admin-columns")}>
                  <label>
                    Date label (optional)
                    <input
                      placeholder="e.g. July 2026"
                      aria-label="Date label (optional)"
                      aria-describedby="custom-date-label-help"
                      maxLength={200}
                      value={project.date.en}
                      disabled={hasDates}
                      onChange={(e) => text("date", "en", e.target.value)}
                    />
                    <small id="custom-date-label-help">
                      {hasDates
                        ? "Generated from the dates above. Clear both dates to use a custom label."
                        : "Use a custom label if you do not need exact dates."}
                    </small>
                  </label>
                  <label>
                    Custom badge (optional)
                    <input
                      placeholder={CATEGORY_BADGES[project.type]}
                      maxLength={200}
                      value={project.badge.en}
                      onChange={(e) => text("badge", "en", e.target.value)}
                    />
                    <small>Leave blank to use the category name.</small>
                  </label>
                </div>
              </div>
            </details>
            <details className={adminClasses("admin-optional")}>
              <summary>
                <span>
                  Khmer translations <small>Optional</small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div className={adminClasses("admin-optional-fields")}>
                <p>Leave a translation blank to use the English text.</p>
                <div className={adminClasses("admin-translate-tools")}>
                  <button
                    type="button"
                    onClick={autoTranslate}
                    className={adminClasses("admin-translate-button")}
                  >
                    {translating ? (
                      <LoaderCircle
                        size={17}
                        className={adminClasses("admin-signin-spinner")}
                      />
                    ) : (
                      <Languages size={17} />
                    )}
                    {translating ? "Translating…" : "Auto-translate to Khmer"}
                  </button>
                  <small>
                    Translates English text with Gemini. Fills blank Khmer
                    fields only; review before saving.
                  </small>
                </div>
                {translationMessage && (
                  <p
                    className={adminClasses("admin-translation-message")}
                    role={translationError ? "alert" : "status"}
                  >
                    {translationMessage}
                  </p>
                )}
                {[
                  ["description", "Short description"],
                  ["longDescription", "Full description"],
                  ["badge", "Badge"],
                  ["date", "Date label"],
                ].map(([field, label]) => (
                  <label key={field}>
                    {label} (Khmer, optional)
                    <textarea
                      rows={field.includes("escription") ? 3 : 2}
                      maxLength={10000}
                      value={project[field].km}
                      disabled={field === "date" && hasDates}
                      onChange={(e) => text(field, "km", e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </details>
            <section
              className={adminClasses("admin-editor-section")}
              aria-label="Project links"
            >
              {" "}
              <div className={adminClasses("admin-form-links")}>
                <div className={adminClasses("admin-form-section-title")}>
                  <h3>Project links</h3>
                  <small>Optional</small>
                </div>
                <p>
                  Link to a demo, repository, or video. Empty URLs are skipped.
                </p>
                {project.links.map((link, index) => (
                  <div className={adminClasses("admin-link")} key={index}>
                    <div className={adminClasses("admin-columns")}>
                      <label>
                        Link type
                        <select
                          value={link.kind}
                          onChange={(e) =>
                            linkUpdate(index, { kind: e.target.value })
                          }
                        >
                          {Object.keys(LINK_LABELS).map((kind) => (
                            <option key={kind}>{kind}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Link label (optional)
                        <input
                          placeholder={LINK_LABELS[link.kind]}
                          value={
                            typeof link.label === "string"
                              ? link.label
                              : link.label?.en || ""
                          }
                          onChange={(e) =>
                            linkUpdate(index, {
                              label: {
                                en: e.target.value,
                                km: link.label?.km || "",
                              },
                            })
                          }
                        />
                      </label>
                    </div>
                    <label>
                      URL (optional)
                      <input
                        type="url"
                        placeholder="https://…"
                        value={link.url}
                        onChange={(e) =>
                          linkUpdate(index, { url: e.target.value })
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        update(
                          "links",
                          project.links.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <Trash2 size={15} />
                      Remove link
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    update("links", [
                      ...project.links,
                      { kind: "live", url: "", label: { en: "", km: "" } },
                    ])
                  }
                >
                  <Link2 size={16} />
                  Add link
                </button>
              </div>
            </section>
          </div>
          <aside
            className={adminClasses("admin-editor-sidebar")}
            aria-label="Project appearance"
          >
            <section className={adminClasses("admin-editor-section")}>
              <div className={adminClasses("admin-editor-section-heading")}>
                <h3>Project cover</h3>
                <p>A clear image helps your work stand out.</p>
              </div>{" "}
              <div className={adminClasses("admin-cover-layout")}>
                <CoverPreview src={project.image || existingImage} />
                <label>
                  Image URL {existingImage ? "(optional)" : "*"}
                  <input
                    type="url"
                    required={!existingImage}
                    placeholder="https://example.com/project.webp"
                    value={project.image}
                    onChange={(e) => update("image", e.target.value)}
                  />
                  <small>
                    {existingImage
                      ? "Leave blank to keep the current cover."
                      : "Paste a public, direct image URL. Landscape images work best."}
                  </small>
                </label>
              </div>
            </section>{" "}
            <TechnologyPicker
              value={project.tech}
              onChange={(value) => update("tech", value)}
            />
            <details className={adminClasses("admin-optional")}>
              <summary>
                <span>
                  Display settings <small>Optional</small>
                </span>
                <ChevronDown size={17} />
              </summary>
              <div className={adminClasses("admin-optional-fields")}>
                <p>
                  Project order updates automatically when you change its dates.
                  Projects without a date appear last.
                </p>
                <label className={adminClasses("admin-checkbox")}>
                  <input
                    type="checkbox"
                    checked={project.isNew}
                    onChange={(e) => update("isNew", e.target.checked)}
                  />
                  Show “Newest” badge
                </label>
              </div>
            </details>
          </aside>
        </div>{" "}
        <div className={adminClasses("admin-actions admin-savebar")}>
          <button className={adminClasses("admin-primary")} type="submit">
            <Save size={16} />
            {busy ? "Saving…" : "Save project"}
          </button>
          <button type="button" onClick={onCancel}>
            <ArrowLeft size={16} />
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
}

function CoverPreview({ src }) {
  const [failedSource, setFailedSource] = useState(null);
  return (
    <div className={adminClasses("admin-cover-preview")}>
      {src && src !== failedSource ? (
        <img
          src={src}
          alt="Project cover preview"
          onError={() => setFailedSource(src)}
        />
      ) : (
        <div>
          <ImageIcon size={28} />
          <strong>
            {src ? "Image could not be loaded" : "Your project cover goes here"}
          </strong>
          <span>
            {src
              ? "Check the image URL."
              : "Preview appears when you add a URL."}
          </span>
        </div>
      )}
    </div>
  );
}
