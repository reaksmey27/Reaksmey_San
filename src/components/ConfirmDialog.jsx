import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, LogOut, Trash2 } from "lucide-react";

export const discardConfirmation = {
  title: "Discard unsaved changes?",
  description:
    "Your latest edits have not been saved. Leaving now will discard them.",
  confirmLabel: "Discard changes",
  cancelLabel: "Keep editing",
  kind: "discard",
};

export function useConfirmation() {
  const [options, setOptions] = useState(null);
  const pending = useRef(null);
  useEffect(
    () => () => {
      pending.current?.(false);
      pending.current = null;
    },
    [],
  );

  function confirm(next) {
    if (pending.current) return Promise.resolve(false);
    return new Promise((resolve) => {
      pending.current = resolve;
      setOptions(next);
    });
  }
  function settle(accepted) {
    const resolve = pending.current;
    pending.current = null;
    setOptions(null);
    resolve?.(accepted);
  }
  return {
    confirm,
    confirmation: options ? (
      <ConfirmDialog {...options} onResolve={settle} />
    ) : null,
  };
}

function ConfirmDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  kind,
  onResolve,
}) {
  const dialog = useRef(null);
  const id = useId();
  const destructive = kind === "delete" || kind === "discard";
  const Icon =
    kind === "delete" ? Trash2 : kind === "logout" ? LogOut : AlertTriangle;

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    element.showModal();
    return () => {
      element.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialog}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => {
        event.preventDefault();
        onResolve(false);
      }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 text-[var(--color-foreground)] shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div
        className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${destructive ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"}`}
      >
        <Icon size={23} aria-hidden="true" />
      </div>
      <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <p
        id={`${id}-description`}
        className="mt-3 break-words text-sm leading-6 text-[var(--color-muted)]"
      >
        {description}
      </p>
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          autoFocus
          onClick={() => onResolve(false)}
          className="min-h-11 cursor-pointer rounded-xl border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium hover:bg-[var(--color-card-active)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => onResolve(true)}
          className={`min-h-11 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 ${destructive ? "bg-red-600 hover:bg-red-700 focus-visible:outline-red-500" : "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-500"}`}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>,
    document.body,
  );
}
