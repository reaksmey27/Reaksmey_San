import { adminClasses } from "../styles/adminStyles";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Layers3,
  LayoutDashboard,
  FolderKanban,
  Palette,
  Plus,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  PenTool,
  Video,
  ChevronRight,
} from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { findTechnology, technologyKey } from "../data/technologies";
import { TechIcon } from "./ui/TechIcon";
import { projectSortDate } from "../utils/projectSort";
import { useConfirmation, discardConfirmation } from "./ConfirmDialog";

const views = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "appearance", label: "Appearance", icon: Palette },
];

export function AdminDashboard({
  user,
  theme,
  toggleTheme,
  busy,
  editing,
  onDiscard,
  onAdd,
  onEdit,
  onSignOut,
  message,
  children,
}) {
  const [view, setView] = useState("overview");
  const { projects, loading, error } = useProjects();
  const drawer = useRef(null);
  const menuButton = useRef(null);
  const { confirm, confirmation } = useConfirmation();
  function confirmNavigation() {
    return !editing || confirm(discardConfirmation);
  }
  async function navigate(next) {
    if (busy) return;
    if (next !== view && !(await confirmNavigation())) return;
    if (next !== view) onDiscard();
    setView(next);
    drawer.current?.close();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  async function addProject() {
    if (busy || !(await confirmNavigation())) return;
    onAdd();
    setView("projects");
    drawer.current?.close();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function editProject(project) {
    onEdit(project);
    setView("projects");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Admin";
  function sidebarContent() {
    return (
      <>
        <a
          href="/admin"
          className={adminClasses("admin-brand dash-brand")}
          onClick={(event) => {
            event.preventDefault();
            navigate("overview");
          }}
        >
          <span className={adminClasses("admin-brand-icon")}>
            <Layers3 size={20} />
          </span>
          <span>
            SMEY <small>CONTENT STUDIO</small>
          </span>
        </a>
        <div className={adminClasses("dash-workspace")}>
          <span className={adminClasses("dash-workspace-symbol")}>S</span>
          <div>
            <strong>My portfolio</strong>
            <small>Personal workspace</small>
          </div>
          <span className={adminClasses("dash-status-dot")} />
        </div>
        <p className={adminClasses("dash-nav-label")}>WORKSPACE</p>
        <nav
          className={adminClasses("dash-navigation")}
          aria-label="Dashboard navigation"
        >
          {views.map(({ key, label, icon: Icon }) => (
            <button
              type="button"
              key={key}
              disabled={busy}
              aria-current={view === key ? "page" : undefined}
              onClick={() => navigate(key)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {key === "projects" && !loading && !error && (
                <small>{projects.length}</small>
              )}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className={adminClasses("admin-primary dash-add-project")}
          disabled={busy || loading || Boolean(error)}
          onClick={addProject}
        >
          <Plus size={17} />
          New project
        </button>
        <div className={adminClasses("dash-sidebar-bottom")}>
          <a
            className={adminClasses("dash-view-site")}
            href="/"
            onClick={async (event) => {
              if (busy || editing) event.preventDefault();
              if (!busy && editing && (await confirmNavigation()))
                window.location.assign("/");
            }}
          >
            View portfolio
            <ArrowUpRight size={17} />
          </a>
          <button
            type="button"
            className={adminClasses("dash-theme")}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
          <div className={adminClasses("dash-account")}>
            <span className={adminClasses("dash-avatar")}>
              {displayName.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <strong>{displayName}</strong>
              <small>Administrator</small>
            </div>
            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              disabled={busy}
              onClick={async () => {
                if (busy) return;
                if (
                  await confirm({
                    title: "Sign out?",
                    description: editing
                      ? "You have unsaved edits. Signing out will discard them. You can sign in again whenever you're ready."
                      : "You'll need to sign in again to manage your portfolio.",
                    confirmLabel: "Sign out",
                    kind: "logout",
                  })
                )
                  onSignOut();
              }}
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className={adminClasses("admin-shell admin-dashboard")}>
      {confirmation}
      <aside className={adminClasses("dash-sidebar")}>{sidebarContent()}</aside>
      <dialog
        ref={drawer}
        className={adminClasses("dash-mobile-drawer")}
        aria-label="Dashboard menu"
        onClick={(event) => {
          if (event.target === drawer.current) {
            const box = drawer.current.getBoundingClientRect();
            if (event.clientX > box.right) drawer.current.close();
          }
        }}
        onClose={() => menuButton.current?.focus()}
      >
        <div className={adminClasses("dash-drawer-header")}>
          <span>Workspace menu</span>
          <button
            type="button"
            aria-label="Close dashboard menu"
            onClick={() => drawer.current.close()}
          >
            <X size={20} />
          </button>
        </div>
        {sidebarContent()}
      </dialog>
      <div className={adminClasses("dash-body")}>
        <header
          className={adminClasses(
            "dash-topbar sticky top-0 z-30 bg-[var(--color-background)]",
          )}
        >
          <div className={adminClasses("dash-breadcrumb")}>
            <button
              type="button"
              ref={menuButton}
              className={adminClasses("dash-menu-button")}
              aria-label="Open dashboard menu"
              aria-haspopup="dialog"
              onClick={() => drawer.current.showModal()}
            >
              <Menu size={20} />
            </button>
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>
              {editing && view === "projects"
                ? "Project editor"
                : views.find((item) => item.key === view).label}
            </strong>
          </div>
          <div className={adminClasses("dash-topbar-meta")}>
            <span className={adminClasses("dash-status-dot")} />
            Admin workspace
            <span className={adminClasses("dash-avatar")}>
              {displayName.slice(0, 1).toUpperCase()}
            </span>
          </div>
        </header>
        <main className={adminClasses("dash-content")}>
          {message && (
            <p role="status" className={adminClasses("admin-notice")}>
              {message}
            </p>
          )}
          {view === "overview" && (
            <>
              <div className={adminClasses("dash-page-heading")}>
                <div>
                  <p className={adminClasses("admin-eyebrow")}>
                    YOUR PORTFOLIO AT A GLANCE
                  </p>
                  <h1>Overview</h1>
                  <p>
                    Welcome back, {displayName}. Here’s a look at your work.
                  </p>
                </div>
                <button
                  type="button"
                  className={adminClasses("admin-primary")}
                  disabled={busy || loading || Boolean(error)}
                  onClick={addProject}
                >
                  <Plus size={18} />
                  Add project
                </button>
              </div>
              {loading ? (
                <p role="status" className={adminClasses("admin-panel")}>
                  Loading your dashboard…
                </p>
              ) : error ? (
                <p role="alert" className={adminClasses("admin-notice")}>
                  {error}
                </p>
              ) : (
                <Overview
                  projects={projects}
                  onEdit={editProject}
                  onManage={() => navigate("projects")}
                  onAdd={addProject}
                />
              )}
            </>
          )}
          {view === "projects" && children}
          {view === "appearance" && (
            <>
              <div className={adminClasses("dash-page-heading")}>
                <div>
                  <p className={adminClasses("admin-eyebrow")}>MAKE IT YOURS</p>
                  <h1>Appearance</h1>
                  <p>Choose the look that works best for you.</p>
                </div>
              </div>
              <section className={adminClasses("admin-panel dash-appearance")}>
                <h2>Color theme</h2>
                <p>
                  Your choice is saved on this device and shared with your
                  portfolio.
                </p>
                <div className={adminClasses("dash-theme-options")}>
                  {["light", "dark"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      aria-pressed={theme === option}
                      onClick={() => {
                        if (theme !== option) toggleTheme();
                      }}
                    >
                      <div
                        className={adminClasses(
                          `dash-theme-preview dash-theme-preview-${option}`,
                        )}
                        aria-hidden="true"
                      >
                        <i />
                        <div>
                          <b />
                          <span />
                          <span />
                        </div>
                      </div>
                      <span>
                        {option === "light" ? (
                          <Sun size={17} />
                        ) : (
                          <Moon size={17} />
                        )}
                        {option === "light" ? "Light" : "Dark"}
                        <small>
                          {theme === option ? "Selected" : "Select"}
                        </small>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
              <section className={adminClasses("admin-panel dash-profile")}>
                <h2>Your account</h2>
                <dl>
                  <div>
                    <dt>Email</dt>
                    <dd>{user?.email || "Signed-in admin"}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>Administrator</dd>
                  </div>
                </dl>
              </section>
            </>
          )}
        </main>
        <footer className={adminClasses("dash-footer")}>
          <span>SMEY Studio</span>
          <span>A little space for your best work.</span>
        </footer>
      </div>
    </div>
  );
}

function Overview({ projects, onEdit, onManage, onAdd }) {
  const categories = [
    { key: "web", label: "Web projects", icon: Globe, color: "blue" },
    { key: "design", label: "Design projects", icon: PenTool, color: "purple" },
    { key: "vlog", label: "Vlogs", icon: Video, color: "amber" },
  ].map((category) => ({
    ...category,
    count: projects.filter((project) => project.type === category.key).length,
  }));
  const toolkit = new Map();
  for (const project of projects)
    for (const key of new Set(project.tech.map(technologyKey))) {
      const original = project.tech.find((name) => technologyKey(name) === key);
      const current = toolkit.get(key);
      toolkit.set(key, {
        name: findTechnology(original)?.label || original,
        count: (current?.count || 0) + 1,
      });
    }
  const tools = [...toolkit.values()]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 5);
  return (
    <>
      <div className={adminClasses("dash-stats")}>
        {[
          {
            key: "all",
            label: "Total projects",
            icon: FolderKanban,
            color: "blue",
            count: projects.length,
          },
          ...categories,
        ].map(({ key, label, icon: Icon, color, count }) => (
          <div className={adminClasses("dash-stat")} key={key}>
            <span
              className={adminClasses(`dash-stat-icon dash-accent-${color}`)}
            >
              <Icon size={20} />
            </span>
            <span>{label}</span>
            <strong>{String(count).padStart(2, "0")}</strong>
            <small>
              {key === "all" ? "In your portfolio" : "In this category"}
            </small>
          </div>
        ))}
      </div>
      <div className={adminClasses("dash-overview-grid")}>
        <section className={adminClasses("admin-panel dash-latest")}>
          <div className={adminClasses("dash-panel-heading")}>
            <div>
              <h2>Latest work</h2>
              <p>Your projects, newest dates first.</p>
            </div>
            <button type="button" onClick={onManage}>
              View all
              <ArrowRight size={15} />
            </button>
          </div>
          {projects.length ? (
            <div className={adminClasses("dash-project-list")}>
              {projects.slice(0, 5).map((project) => (
                <button
                  type="button"
                  className={adminClasses("dash-project-row")}
                  key={project.id}
                  aria-label={`Edit ${project.title}`}
                  onClick={() => onEdit(project)}
                >
                  <img src={project.image} alt="" />
                  <span>
                    <strong>{project.title}</strong>
                    <small>
                      {typeof project.date === "string"
                        ? project.date
                        : project.date?.en ||
                          projectSortDate(project) ||
                          "No date set"}
                    </small>
                  </span>
                  <span
                    className={adminClasses(
                      `dash-project-type dash-type-${project.type}`,
                    )}
                  >
                    {project.type}
                  </span>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          ) : (
            <div className={adminClasses("dash-empty")}>
              <FolderKanban size={32} />
              <h3>Your first project starts here</h3>
              <p>Add your work to start building your collection.</p>
              <button type="button" onClick={onAdd}>
                Create a project
              </button>
            </div>
          )}
        </section>
        <section className={adminClasses("admin-panel dash-categories")}>
          <div className={adminClasses("dash-panel-heading")}>
            <div>
              <h2>Project mix</h2>
              <p>A balance of what you create.</p>
            </div>
          </div>
          {categories.map(({ key, label, color, count }) => (
            <div className={adminClasses("dash-category-row")} key={key}>
              <div>
                <span>{label}</span>
                <strong>{count}</strong>
              </div>
              <div
                className={adminClasses("dash-progress")}
                role="meter"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={Math.max(1, projects.length)}
                aria-valuenow={count}
              >
                <span
                  className={adminClasses(
                    `dash-accent-${color} w-[var(--project-share)]`,
                  )}
                  style={{
                    "--project-share": `${projects.length ? (count / projects.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
          <p className={adminClasses("dash-category-note")}>
            Based on your current portfolio projects.
          </p>
        </section>
        <section className={adminClasses("admin-panel dash-toolkit")}>
          <div className={adminClasses("dash-panel-heading")}>
            <div>
              <h2>Your toolkit</h2>
              <p>Technologies you use most often.</p>
            </div>
          </div>
          {tools.length ? (
            tools.map((tool) => (
              <div className={adminClasses("dash-tool-row")} key={tool.name}>
                <TechIcon name={tool.name} className="h-5 w-5" />
                <strong>{tool.name}</strong>
                <small>
                  {tool.count} {tool.count === 1 ? "project" : "projects"}
                </small>
              </div>
            ))
          ) : (
            <p>Add technologies to your projects to see them here.</p>
          )}
        </section>
        <section className={adminClasses("dash-create-card")}>
          <span className={adminClasses("dash-create-icon")}>
            <Plus size={22} />
          </span>
          <h2>What’s your next project?</h2>
          <p>
            Give your latest idea a place in your portfolio. Add a cover, tell
            its story, and share your work.
          </p>
          <button type="button" onClick={onAdd}>
            Add something new
            <ArrowRight size={17} />
          </button>
        </section>
      </div>
    </>
  );
}
