import { adminClasses } from "../styles/adminStyles";
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  AlertCircle,
  LoaderCircle,
  Layers3,
} from "lucide-react";

export function AdminLogin({ onSubmit, busy, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  return (
    <section
      className={adminClasses("admin-signin-layout")}
      aria-label="Admin sign in"
    >
      <aside className={adminClasses("admin-signin-story")}>
        <span className={adminClasses("admin-signin-kicker")}>
          <Layers3 size={16} /> SMEY STUDIO
        </span>
        <div>
          <h1>
            Your work. <br />
            Your story.
            <br />
            <span>Your space.</span>
          </h1>
          <p>
            A little space to keep your portfolio
            <br className={adminClasses("admin-desktop-break")} /> growing with
            you.
          </p>
        </div>
        <div className={adminClasses("admin-signin-art")} aria-hidden="true">
          <div className={adminClasses("admin-art-window")}>
            <div className={adminClasses("admin-art-dots")}>
              <i />
              <i />
              <i />
            </div>
            <div className={adminClasses("admin-art-cover")}>
              <span />
            </div>
            <div className={adminClasses("admin-art-line")} />
            <div className={adminClasses("admin-art-line short")} />
            <div className={adminClasses("admin-art-tags")}>
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className={adminClasses("admin-art-badge")}>
            <span /> Made by you
          </span>
        </div>
        <span className={adminClasses("admin-signin-story-footer")}>
          CREATE. REFINE. SHARE.
        </span>
      </aside>
      <div className={adminClasses("admin-signin-main")}>
        <form
          onSubmit={onSubmit}
          className={adminClasses("admin-signin-form")}
          aria-busy={busy}
          aria-labelledby="admin-signin-title"
        >
          <div className={adminClasses("admin-signin-heading")}>
            <span className={adminClasses("admin-login-icon")}>
              <LockKeyhole size={24} />
            </span>
            <p className={adminClasses("admin-eyebrow")}>
              WELCOME TO YOUR WORKSPACE
            </p>
            <h2 id="admin-signin-title">Welcome back</h2>
            <p>Sign in to bring your next project to life.</p>
          </div>
          {error && (
            <div
              id="admin-signin-error"
              className={adminClasses("admin-signin-error")}
              role="alert"
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          <fieldset disabled={busy}>
            <label htmlFor="admin-email">Email address</label>
            <div className={adminClasses("admin-signin-input")}>
              <Mail size={18} aria-hidden="true" />
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="you@example.com"
                required
                aria-describedby={error ? "admin-signin-error" : undefined}
              />
            </div>
            <label htmlFor="admin-password">Password</label>
            <div className={adminClasses("admin-signin-input")}>
              <LockKeyhole size={18} aria-hidden="true" />
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                aria-describedby={
                  [
                    error ? "admin-signin-error" : "",
                    capsLock ? "admin-caps-lock" : "",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined
                }
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onKeyDown={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
              />
              <button
                type="button"
                className={adminClasses("admin-password-toggle")}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-controls="admin-password"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {capsLock && (
              <p
                id="admin-caps-lock"
                className={adminClasses("admin-caps-lock")}
                role="status"
              >
                Caps Lock is on.
              </p>
            )}
            <button
              className={adminClasses("admin-primary admin-signin-submit")}
              type="submit"
            >
              {busy ? (
                <>
                  <LoaderCircle
                    className={adminClasses("admin-signin-spinner")}
                    size={18}
                  />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </fieldset>
          <div className={adminClasses("admin-signin-footer")}>
            <ShieldCheck size={16} />
            <span>Private workspace. Approved accounts only.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
