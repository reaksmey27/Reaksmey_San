import { adminClasses } from "../styles/adminStyles";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Layers3,
  Plus,
  Search,
  Pencil,
  Trash2,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "../lib/firebase";
import { useProjects } from "../hooks/useProjects";
import { PROJECTS } from "../data/projects";
import { ProjectForm } from "../components/ProjectForm";
import { AdminLogin } from "../components/AdminLogin";
import { AdminDashboard } from "../components/AdminDashboard";
import { TechIcon } from "../components/ui/TechIcon";
import { prepareProject } from "../utils/projectForm";
import { useTheme } from "../context/ThemeContext";
import { projectDateError } from "../utils/projectDates";
import {
  useConfirmation,
  discardConfirmation,
} from "../components/ConfirmDialog";

const localizedFields = {
  badge: "Badge",
  date: "Date label",
  description: "Short description",
  longDescription: "Full description",
};
const emptyProject = () => ({
  id: crypto.randomUUID(),
  title: "",
  type: "web",
  badge: { en: "", km: "" },
  date: { en: "", km: "", start: "", end: "" },
  description: { en: "", km: "" },
  longDescription: { en: "", km: "" },
  tech: [],
  image: "",
  isNew: true,
  order: 0,
  links: [],
});
const isHttpUrl = (value) => {
  try {
    return ["https:", "http:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

function createProjectDraft(project) {
  const original = PROJECTS.find((item) => String(item.id) === project.id);
  return {
    ...project,
    image: project.image === original?.image ? "" : project.image,
    ...Object.fromEntries(
      Object.keys(localizedFields).map((field) => [
        field,
        {
          ...(field === "date" && typeof project.date === "object"
            ? project.date
            : {}),
          en:
            typeof project[field] === "string"
              ? project[field]
              : project[field]?.en || "",
          km: project[field]?.km || "",
        },
      ]),
    ),
  };
}

export default function Admin() {
  const { confirm, confirmation } = useConfirmation();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(
    firebaseConfigured ? "loading" : "setup",
  );
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);
  useEffect(() => {
    if (!auth) return;
    let stopRole;
    const stopAuth = onAuthStateChanged(auth, (account) => {
      stopRole?.();
      setUser(account);
      setEditing(null);
      setMessage("");
      setAccess(account ? "loading" : "login");
      if (account)
        stopRole = onSnapshot(
          doc(db, "admins", account.uid),
          (snapshot) => {
            setAccess(snapshot.exists() ? "admin" : "denied");
          },
          () => setAccess("denied"),
        );
    });
    return () => {
      stopAuth();
      stopRole?.();
    };
  }, []);

  async function login(event) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    try {
      await signInWithEmailAndPassword(
        auth,
        data.get("email").trim(),
        data.get("password"),
      );
    } catch (error) {
      const errors = {
        "auth/invalid-credential":
          "The email or password is incorrect. Please try again.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/user-not-found":
          "The email or password is incorrect. Please try again.",
        "auth/wrong-password":
          "The email or password is incorrect. Please try again.",
        "auth/too-many-requests":
          "Too many sign-in attempts. Please wait a moment and try again.",
        "auth/network-request-failed":
          "Unable to connect. Check your internet connection and try again.",
      };
      setMessage(
        errors[error.code] ||
          "Unable to sign in. Please try again or contact the site owner.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (access === "admin") {
    return (
      <AdminDashboard
        user={user}
        theme={theme}
        toggleTheme={toggleTheme}
        busy={busy}
        editing={editing}
        message={message}
        onDiscard={() => {
          setEditing(null);
          setMessage("");
        }}
        onAdd={() => {
          setMessage("");
          setEditing(emptyProject());
        }}
        onEdit={(project) => {
          setMessage("");
          setEditing(createProjectDraft(project));
        }}
        onSignOut={async () => {
          setBusy(true);
          try {
            await signOut(auth);
          } catch {
            setMessage("Could not sign out. Please retry.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <ProjectManager
          editing={editing}
          setEditing={setEditing}
          busy={busy}
          setBusy={setBusy}
          setMessage={setMessage}
          showStats={false}
        />
      </AdminDashboard>
    );
  }

  return (
    <main
      className={adminClasses(
        `admin-shell${editing ? " admin-shell-editing" : ""}`,
      )}
    >
      {confirmation}
      <nav
        className={adminClasses("admin-topbar")}
        aria-label="Admin navigation"
      >
        <a className={adminClasses("admin-brand")} href="/admin">
          <span className={adminClasses("admin-brand-icon")}>
            <Layers3 size={20} />
          </span>
          SMEY<span className={adminClasses("admin-brand-divider")}>/</span>
          <span className={adminClasses("admin-brand-label")}>Studio</span>
        </a>
        <div className={adminClasses("admin-topbar-actions")}>
          <a className={adminClasses("admin-visit")} href="/">
            Back to portfolio <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            className={adminClasses("admin-theme-toggle")}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      </nav>
      {access !== "login" && (
        <header className={adminClasses("admin-header")}>
          <div>
            <p className={adminClasses("admin-eyebrow")}>
              <span />
              YOUR CREATIVE WORKSPACE
            </p>
            <h1>Project manager</h1>
            <p>A home for your work. Make something worth sharing.</p>
          </div>
          {user && (
            <button
              disabled={busy}
              onClick={async () => {
                if (
                  busy ||
                  !(await confirm({
                    title: "Sign out?",
                    description:
                      "You'll need to sign in again to manage your portfolio.",
                    confirmLabel: "Sign out",
                    kind: "logout",
                  }))
                )
                  return;
                setBusy(true);
                try {
                  await signOut(auth);
                } catch {
                  setMessage("Could not sign out. Please retry.");
                } finally {
                  setBusy(false);
                }
              }}
            >
              <LogOut size={16} /> Sign out
            </button>
          )}
        </header>
      )}
      {message && access !== "login" && (
        <p role="status" className={adminClasses("admin-notice")}>
          {message}
        </p>
      )}
      {access === "setup" && (
        <section className={adminClasses("admin-panel")}>
          <h2>Connect Firebase to get started</h2>
          <p>
            Add the four VITE_FIREBASE values from your Firebase web app to your
            environment, then restart or rebuild the website.
          </p>
          <p>
            Enable Email/Password authentication, create your admin user,
            publish firestore.rules, and add an admins document with your user
            UID. Full instructions are in README.md.
          </p>
        </section>
      )}
      {access === "loading" && <p role="status">Checking admin access…</p>}
      {access === "login" && (
        <AdminLogin onSubmit={login} busy={busy} error={message} />
      )}
      {access === "denied" && (
        <section className={adminClasses("admin-panel")}>
          <h2>Admin access required</h2>
          <p>
            This account is not approved, or the access check failed. Check your
            connection and ask the project owner to add this UID to the admins
            collection:
          </p>
          <code>{user?.uid}</code>
        </section>
      )}
    </main>
  );
}

export function ProjectManager({
  editing,
  setEditing,
  busy,
  setBusy,
  setMessage,
  showStats = true,
}) {
  const { confirm, confirmation } = useConfirmation();
  const { projects, loading, error } = useProjects();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const visibleProjects = projects.filter(
    (project) =>
      (category === "all" || project.type === category) &&
      `${project.title} ${project.tech.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );
  const update = (field, value) =>
    setEditing((previous) => ({ ...previous, [field]: value }));
  async function save(event) {
    event.preventDefault();
    if (!editing.title.trim() || !editing.description.en.trim()) {
      setMessage("Enter a title and a short English description.");
      return;
    }
    const dateError = projectDateError(editing.date);
    if (dateError) {
      setMessage(dateError);
      return;
    }
    const existing = projects.find((p) => p.id === editing.id);
    const prepared = prepareProject(editing, existing?.order ?? 0);
    if (!prepared.image && !existing?.image) {
      setMessage("Add a cover image URL for your new project.");
      return;
    }
    if (prepared.image && !isHttpUrl(prepared.image)) {
      setMessage("Use an http or https image URL.");
      return;
    }
    if (prepared.links.some((link) => !isHttpUrl(link.url))) {
      setMessage("Each project link needs an http or https URL.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const { id, ...data } = prepared;
      const bundledImage = PROJECTS.find((p) => String(p.id) === id)?.image;
      await setDoc(doc(db, "projects", id), {
        ...data,
        image:
          data.image ||
          (existing?.image === bundledImage ? "" : existing?.image || ""),
        deleted: false,
      });
      setEditing(null);
      setMessage("Project saved. Your portfolio is updated.");
    } catch {
      setMessage(
        "Could not save the project. Check your connection and admin permissions, then retry.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function remove(project) {
    if (
      busy ||
      !(await confirm({
        title: "Delete project?",
        description: `“${project.title}” will be removed from your public portfolio.`,
        confirmLabel: "Delete project",
        kind: "delete",
      }))
    )
      return;
    setBusy(true);
    setMessage("");
    try {
      await setDoc(doc(db, "projects", project.id), { deleted: true });
      setMessage("Project deleted.");
    } catch {
      setMessage("Could not delete the project. Please retry.");
    } finally {
      setBusy(false);
    }
  }
  function edit(project) {
    setMessage("");
    setEditing(createProjectDraft(project));
  }
  if (loading) return <p role="status">Loading projects…</p>;
  if (error)
    return (
      <p role="alert" className={adminClasses("admin-notice")}>
        {error}
      </p>
    );
  return (
    <>
      {confirmation}
      {!editing && showStats && (
        <div className={adminClasses("admin-stats")}>
          {[
            ["All projects", projects.length, "Your complete collection"],
            [
              "Web projects",
              projects.filter((p) => p.type === "web").length,
              "Built for the browser",
            ],
            [
              "Design & vlogs",
              projects.filter((p) => p.type !== "web").length,
              "Ideas brought to life",
            ],
          ].map(([label, count, caption]) => (
            <div className={adminClasses("admin-stat")} key={label}>
              <span>{label}</span>
              <strong>{String(count).padStart(2, "0")}</strong>
              <small>{caption}</small>
            </div>
          ))}
        </div>
      )}
      {!editing && (
        <div className={adminClasses("admin-toolbar")}>
          <div>
            <h2>{editing ? "Project details" : "Your projects"}</h2>
            <p>
              {editing
                ? "Give your work the details it deserves."
                : "Curate, update, and share your latest work."}
            </p>
          </div>
          {!editing && (
            <button
              className={adminClasses("admin-primary")}
              disabled={busy}
              onClick={() => {
                setMessage("");
                setEditing(emptyProject());
              }}
            >
              <Plus size={18} /> Add project
            </button>
          )}
        </div>
      )}
      {editing ? (
        <ProjectForm
          key={editing.id}
          project={editing}
          setProject={setEditing}
          busy={busy}
          onSave={save}
          onCancel={async () => {
            if (!busy && (await confirm(discardConfirmation))) setEditing(null);
          }}
          existingImage={projects.find((p) => p.id === editing.id)?.image}
        />
      ) : (
        <>
          <div className={adminClasses("admin-collection-tools")}>
            <div
              className={adminClasses("admin-filters")}
              role="group"
              aria-label="Filter projects"
            >
              {[
                ["all", "All work"],
                ["web", "Web"],
                ["design", "Design"],
                ["vlog", "Vlogs"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className={adminClasses("admin-search")}>
              <Search size={17} />
              <input
                aria-label="Search projects"
                type="search"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <p className={adminClasses("admin-result-count")} role="status">
            {visibleProjects.length}{" "}
            {visibleProjects.length === 1 ? "project" : "projects"}
            {search || category !== "all" ? " found" : " in your collection"}
          </p>
          <div className={adminClasses("admin-grid")}>
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                className={adminClasses("admin-panel admin-project")}
              >
                <div className={adminClasses("admin-project-cover")}>
                  <img src={project.image} alt="" loading="lazy" />
                  {project.isNew && (
                    <span className={adminClasses("admin-new")}>Newest</span>
                  )}
                </div>
                <div>
                  <small
                    className={adminClasses(
                      `admin-category admin-category-${project.type}`,
                    )}
                  >
                    {project.type === "web"
                      ? "Web development"
                      : project.type === "design"
                        ? "Design"
                        : "Vlog"}
                  </small>
                  <h3>{project.title}</h3>
                  <p className={adminClasses("admin-project-description")}>
                    {typeof project.description === "string"
                      ? project.description
                      : project.description?.en}
                  </p>
                  <div className={adminClasses("admin-tech")}>
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech}>
                        <TechIcon name={tech} className="h-3 w-3" />
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span>+{project.tech.length - 3}</span>
                    )}
                  </div>
                  <div className={adminClasses("admin-actions")}>
                    <button disabled={busy} onClick={() => edit(project)}>
                      <Pencil size={15} /> Edit project
                    </button>
                    <button
                      className={adminClasses("admin-delete")}
                      aria-label={`Delete ${project.title}`}
                      disabled={busy}
                      onClick={() => remove(project)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {visibleProjects.length === 0 && (
              <div className={adminClasses("admin-empty")}>
                <Layers3 size={32} />
                <h3>
                  {projects.length
                    ? "No matching projects"
                    : "Your next chapter starts here"}
                </h3>
                <p>
                  {projects.length
                    ? "Try a different search or category."
                    : "Add your first project to start your collection."}
                </p>
                {projects.length > 0 && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
