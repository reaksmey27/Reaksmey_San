// Shared Tailwind utilities for the admin screens.
// Semantic class names remain as stable hooks for component states and browser tests.
// Keep utility strings literal so Tailwind can discover every responsive and state variant.
const styles = {
  "admin-shell": [
    "[--admin-accent:#2563eb] max-w-310 m-auto pt-0 px-10 pb-16 min-h-screen [color-scheme:light]",
    "[.dark_&]:[color-scheme:dark]",
    "[:where(&)_h1]:[font-family:var(--font-display)] [:where(&)_h1]:text-[clamp(30px,_4vw,_42px)] [:where(&)_h1]:leading-[1.2] [:where(&)_h1]:tracking-[-0.045em] [:where(&)_h1]:font-semibold [:where(&)_h1]:mb-2.5",
    "[:where(&)_h2]:text-[21px] [:where(&)_h2]:font-semibold [:where(&)_h2]:tracking-[-0.025em]",
    "[:where(&)_h3]:text-[17px] [:where(&)_h3]:font-semibold [:where(&)_h3]:tracking-[-0.02em]",
    "[:where(&)_p]:text-[var(--color-muted)] [:where(&)_p]:text-[14px] [:where(&)_p]:leading-[1.65]",
    "[:where(&)_label]:grid [:where(&)_label]:gap-[9px] [:where(&)_label]:min-w-0 [:where(&)_label]:text-[13px] [:where(&)_label]:font-medium",
    "[:where(&)_input]:w-full [:where(&)_input]:min-w-0 [:where(&)_input]:py-3 [:where(&)_input]:px-3.5 [:where(&)_input]:[border:1px_solid_var(--color-border)] [:where(&)_input]:rounded-[10px] [:where(&)_input]:bg-[var(--color-background)] [:where(&)_input]:text-[var(--color-foreground)] [:where(&)_input]:[font:inherit] [:where(&)_input]:font-normal [:where(&)_input]:[transition:border-color_0.2s,_box-shadow_0.2s]",
    "[:where(&)_textarea]:w-full [:where(&)_textarea]:min-w-0 [:where(&)_textarea]:py-3 [:where(&)_textarea]:px-3.5 [:where(&)_textarea]:[border:1px_solid_var(--color-border)] [:where(&)_textarea]:rounded-[10px] [:where(&)_textarea]:bg-[var(--color-background)] [:where(&)_textarea]:text-[var(--color-foreground)] [:where(&)_textarea]:[font:inherit] [:where(&)_textarea]:font-normal [:where(&)_textarea]:[transition:border-color_0.2s,_box-shadow_0.2s] [:where(&)_textarea]:resize-y [:where(&)_textarea]:leading-[1.6]",
    "[:where(&)_select]:w-full [:where(&)_select]:min-w-0 [:where(&)_select]:py-3 [:where(&)_select]:px-3.5 [:where(&)_select]:[border:1px_solid_var(--color-border)] [:where(&)_select]:rounded-[10px] [:where(&)_select]:bg-[var(--color-background)] [:where(&)_select]:text-[var(--color-foreground)] [:where(&)_select]:[font:inherit] [:where(&)_select]:font-normal [:where(&)_select]:[transition:border-color_0.2s,_box-shadow_0.2s]",
    "[:where(&)_input:focus]:[outline:2px_solid_var(--color-primary)] [:where(&)_input:focus]:[outline-offset:2px]",
    "[:where(&)_textarea:focus]:[outline:2px_solid_var(--color-primary)] [:where(&)_textarea:focus]:[outline-offset:2px]",
    "[:where(&)_select:focus]:[outline:2px_solid_var(--color-primary)] [:where(&)_select:focus]:[outline-offset:2px]",
    "[:where(&)_input::placeholder]:text-[var(--color-muted)] [:where(&)_input::placeholder]:opacity-80",
    "[:where(&)_textarea::placeholder]:text-[var(--color-muted)] [:where(&)_textarea::placeholder]:opacity-80",
    "[:where(&)_button]:inline-flex [:where(&)_button]:items-center [:where(&)_button]:justify-center [:where(&)_button]:gap-2 [:where(&)_button]:cursor-pointer [:where(&)_button]:py-2.5 [:where(&)_button]:px-4 [:where(&)_button]:[border:1px_solid_var(--color-border)] [:where(&)_button]:rounded-[10px] [:where(&)_button]:min-h-10.5 [:where(&)_button]:text-[13px] [:where(&)_button]:font-medium [:where(&)_button]:[transition:background_0.2s,_border-color_0.2s,_box-shadow_0.2s]",
    "[:where(&)_button:hover:not(:disabled)]:bg-[var(--color-highlight)] [:where(&)_button:hover:not(:disabled)]:border-[var(--color-primary)]",
    "[:where(&)_button:disabled]:opacity-50 [:where(&)_button:disabled]:cursor-wait",
    "[:where(&)_small]:text-[var(--color-muted)] [:where(&)_small]:font-normal [:where(&)_small]:leading-[1.6]",
    "[:where(&)_code]:[overflow-wrap:anywhere]",
    "max-[641px]:pt-0 max-[641px]:px-4 max-[641px]:pb-9",
    "motion-reduce:[:where(&)_*]:transition-none!",
    "motion-reduce:[:where(&)_*::before]:transition-none!",
    "motion-reduce:[:where(&)_*::after]:transition-none!",
  ].join(" "),
  "admin-form-intro": [
    "pb-5 [border-bottom:1px_solid_var(--color-border)]",
    "[&_p]:mt-1.5",
  ].join(" "),
  "admin-required": ["text-[var(--color-primary)] font-semibold"].join(" "),
  "admin-cover-layout": [
    "grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] gap-6 items-center",
    "[&_.admin-cover-preview_img]:h-45",
    "[&_.admin-cover-preview_>_div]:min-h-45 [&_.admin-cover-preview_>_div]:p-5",
    "max-[641px]:grid-cols-[1fr] max-[641px]:gap-4",
  ].join(" "),
  "admin-optional": [
    "[border:1px_solid_var(--color-border)] rounded-[12px] bg-[var(--color-background)]",
    "[&_summary]:flex [&_summary]:justify-between [&_summary]:items-center [&_summary]:gap-3 [&_summary]:p-4.5 [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:text-[14px] [&_summary]:font-medium",
    "[&_summary::-webkit-details-marker]:hidden",
    "[&_summary:focus-visible]:[outline:2px_solid_var(--color-primary)] [&_summary:focus-visible]:[outline-offset:2px] [&_summary:focus-visible]:rounded-[12px]",
    "[&_summary_small]:ml-2.5 [&_summary_small]:text-[11px] [&_summary_small]:font-normal",
    "[&_summary_svg]:shrink-0",
    "[&[open]_summary]:[border-bottom:1px_solid_var(--color-border)]",
    "[&[open]_summary_svg]:[transform:rotate(180deg)]",
    "max-[641px]:[&_summary]:p-4",
  ].join(" "),
  "admin-form-section-title": [
    "[&_small]:ml-2.5 [&_small]:text-[11px] [&_small]:font-normal",
    "flex items-center",
  ].join(" "),
  "admin-optional-fields": ["grid gap-5 p-5", "max-[641px]:p-4"].join(" "),
  "admin-translate-tools": [
    "grid gap-2.5",
    "[&_button]:justify-self-start [&_button]:text-[var(--color-primary)] [&_button]:bg-[var(--color-highlight)]",
  ].join(" "),
  "admin-translation-message": [
    "py-3 px-3.5 [border:1px_solid_var(--color-border)] rounded-[10px] bg-[var(--color-card)]",
  ].join(" "),
  "admin-form-links": [
    "grid gap-4",
    "[&_>_button]:justify-self-start",
    "[&_>_p]:mt-[-10px]",
  ].join(" "),
  "admin-topbar": [
    "flex justify-between items-center gap-4 py-[25px] px-0 [border-bottom:1px_solid_var(--color-border)]",
    "max-[641px]:py-4.5 max-[641px]:px-0",
  ].join(" "),
  "admin-topbar-actions": [
    "flex items-center gap-5",
    "max-[641px]:gap-2.5",
  ].join(" "),
  "admin-theme-toggle": [
    "[.admin-shell_&]:min-h-11 [.admin-shell_&]:bg-[var(--color-card)] [.admin-shell_&]:text-[var(--color-foreground)]",
    "max-[641px]:[.admin-shell_&]:p-2.5 max-[641px]:[.admin-shell_&]:w-11 max-[641px]:[.admin-shell_&]:shrink-0",
    "max-[641px]:[&_span]:hidden",
  ].join(" "),
  "admin-brand": [
    "inline-flex items-center gap-2.5 font-bold tracking-[0.04em]",
    "max-[641px]:text-[12px] max-[641px]:gap-[7px]",
  ].join(" "),
  "admin-visit": [
    "inline-flex items-center gap-2.5 font-normal text-[var(--color-muted)] text-[14px] tracking-[0]",
    "[&:hover]:text-[var(--color-primary)]",
    "max-[641px]:text-[11px] max-[641px]:gap-1",
  ].join(" "),
  "admin-eyebrow": [
    "inline-flex items-center gap-2.5 text-[var(--color-primary)] text-[10px] tracking-[0.16em] font-semibold mb-2.5",
    "[&_>_span]:w-1.5 [&_>_span]:h-1.5 [&_>_span]:rounded-[50%] [&_>_span]:bg-[var(--color-primary)]",
  ].join(" "),
  "admin-login-note": [
    "inline-flex items-center gap-2.5 text-[11px] leading-[1.6] justify-center text-center",
    "[&_svg]:shrink-0",
  ].join(" "),
  "admin-brand-icon": [
    "inline-flex items-center justify-center bg-[#2563eb] text-[white] w-9.5 h-9.5 rounded-[12px]",
    "max-[641px]:w-7.5 max-[641px]:h-7.5 max-[641px]:rounded-[9px]",
  ].join(" "),
  "admin-login-icon": [
    "inline-flex items-center justify-center bg-[var(--color-highlight)] text-[var(--color-primary)] w-13 h-13 rounded-[16px]",
  ].join(" "),
  "admin-brand-divider": [
    "text-[var(--color-border)] my-0 mx-1 font-normal",
    "max-[641px]:m-0",
  ].join(" "),
  "admin-brand-label": [
    "font-normal text-[var(--color-muted)] text-[14px] tracking-[0]",
    "max-[641px]:text-[12px]",
  ].join(" "),
  "admin-header": [
    "flex justify-between items-center gap-4 flex-wrap pt-11 px-0 pb-8",
    "max-[641px]:pt-7.5 max-[641px]:px-0 max-[641px]:pb-6",
  ].join(" "),
  "admin-toolbar": [
    "flex justify-between items-center gap-4 flex-wrap mb-5.5",
    "[&_p]:mt-1 [&_p]:text-[13px]",
    "max-[641px]:items-start",
    "max-[641px]:[&_p]:max-w-[185px]",
  ].join(" "),
  "admin-actions": ["flex justify-start items-center gap-4 flex-wrap"].join(
    " ",
  ),
  "admin-panel": [
    "bg-[var(--color-card)] [border:1px_solid_var(--color-border)] rounded-[18px] p-7",
    "[&_>_p]:mt-3",
    "max-[641px]:p-5",
  ].join(" "),
  "admin-login": [
    "max-w-110 mt-4 mx-auto mb-12 grid gap-5 p-9 shadow-[0_12px_45px_#0f172a08]",
    "[&_>_p]:mt-[-12px]",
    "max-[641px]:p-6",
  ].join(" "),
  "admin-primary": [
    "[.admin-shell_&]:bg-[#2563eb] [.admin-shell_&]:text-[white] [.admin-shell_&]:border-[#2563eb] [.admin-shell_&]:shadow-[0_4px_10px_#2563eb20]",
    "[.admin-shell_&:hover:not(:disabled)]:bg-[#1d4ed8] [.admin-shell_&:hover:not(:disabled)]:text-[white]",
  ].join(" "),
  "admin-stats": [
    "grid grid-cols-3 gap-4.5 mt-0 mx-0 mb-9.5",
    "max-[641px]:gap-2 max-[641px]:mb-7",
  ].join(" "),
  "admin-stat": [
    "grid gap-1.5 [border:1px_solid_var(--color-border)] rounded-[14px] py-5.5 px-6 bg-[var(--color-card)]",
    "[&_>_span]:text-[12px] [&_>_span]:text-[var(--color-muted)]",
    "[&_strong]:[font-family:var(--font-display)] [&_strong]:text-[32px] [&_strong]:leading-[1.3] [&_strong]:font-medium [&_strong]:tracking-[-0.05em]",
    "[&_small]:text-[11px]",
    "max-[641px]:py-3.5 max-[641px]:px-2.5 max-[641px]:gap-[5px]",
    "max-[641px]:[&_>_span]:text-[10px]",
    "max-[641px]:[&_strong]:text-[27px]",
    "max-[641px]:[&_small]:hidden",
  ].join(" "),
  "admin-collection-tools": [
    "flex items-center justify-between gap-4 py-4 px-0 [border-top:1px_solid_var(--color-border)]",
    "max-[641px]:flex-col max-[641px]:items-stretch max-[641px]:gap-3",
  ].join(" "),
  "admin-filters": [
    "flex p-1 gap-0.5 [border:1px_solid_var(--color-border)] rounded-[12px] bg-[var(--color-card)]",
    "[&_button]:[border:0] [&_button]:min-h-8.5 [&_button]:py-1.5 [&_button]:px-3.5 [&_button]:text-[var(--color-muted)]",
    '[&_button[aria-pressed="true"]]:text-[var(--color-primary)] [&_button[aria-pressed="true"]]:bg-[var(--color-highlight)]',
    "max-[641px]:justify-between",
    "max-[641px]:[&_button]:py-1.5 max-[641px]:[&_button]:px-3",
  ].join(" "),
  "admin-search": [
    "[.admin-shell_&]:flex [.admin-shell_&]:items-center [.admin-shell_&]:relative [.admin-shell_&]:w-67.5",
    "[&_svg]:absolute [&_svg]:left-3.5 [&_svg]:text-[var(--color-muted)] [&_svg]:[pointer-events:none]",
    "[&_input]:pl-10 [&_input]:text-[12px]",
    "max-[641px]:[.admin-shell_&]:w-full",
  ].join(" "),
  "admin-result-count": [
    "[.admin-shell_&]:text-[11px] [.admin-shell_&]:mt-0.5 [.admin-shell_&]:mx-0 [.admin-shell_&]:mb-4",
  ].join(" "),
  "admin-grid": [
    "grid grid-cols-3 gap-5.5",
    "max-[1001px]:grid-cols-2",
    "max-[641px]:grid-cols-[1fr]",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:grid-cols-2",
  ].join(" "),
  "admin-columns": [
    "grid grid-cols-2 gap-5.5",
    "max-[641px]:grid-cols-[1fr]",
  ].join(" "),
  "admin-fields": ["grid gap-6 min-w-0"].join(" "),
  "admin-editor": [
    "w-full max-w-[none] my-0 mx-auto",
    "[&_.admin-fields]:gap-7",
    "[&_.admin-form-intro]:p-0 [&_.admin-form-intro]:[border:0]",
    "[&_.admin-form-intro_h3]:[font-family:var(--font-display)] [&_.admin-form-intro_h3]:text-[26px] [&_.admin-form-intro_h3]:tracking-[-0.04em]",
    "[&_.admin-form-intro_p]:text-[13px]",
    "[&_.admin-date-error]:text-[#b91c1c]",
    "[.dark_&_.admin-date-error]:text-[#fca5a5]",
    '[&_input[type="date"]]:block [&_input[type="date"]]:min-w-0 [&_input[type="date"]]:max-w-full',
    "[&_input:disabled]:opacity-65",
    "[&_textarea:disabled]:opacity-65",
    "[&_label]:text-[14px] [&_label]:gap-2.5",
    '[&_input:not([type="checkbox"])]:min-h-12.5 [&_input:not([type="checkbox"])]:text-[14px] [&_input:not([type="checkbox"])]:pt-[13px] [&_input:not([type="checkbox"])]:pb-[13px]',
    "[&_select]:min-h-12.5 [&_select]:text-[14px] [&_select]:pt-[13px] [&_select]:pb-[13px]",
    "[&_textarea]:text-[15px] [&_textarea]:leading-[1.75] [&_textarea]:py-3.5 [&_textarea]:px-4",
    "[&_textarea[required]]:min-h-40",
    "[&_.admin-cover-layout]:grid-cols-[1fr] [&_.admin-cover-layout]:gap-5.5",
    "[&_.admin-cover-preview]:[border-style:solid]",
    "[&_.admin-cover-preview_img]:h-60",
    "[&_.admin-cover-preview_>_div]:min-h-55",
    "[&_.admin-optional]:rounded-[14px]",
    "[&_.admin-optional_summary]:min-h-17 [&_.admin-optional_summary]:py-5 [&_.admin-optional_summary]:px-6 [&_.admin-optional_summary]:text-[14px]",
    "[&_.admin-optional-fields]:p-6 [&_.admin-optional-fields]:gap-6",
    "[&_.admin-tech-picker]:p-6 [&_.admin-tech-picker]:gap-4.5 [&_.admin-tech-picker]:rounded-[16px]",
    "[&_.admin-link]:p-5 [&_.admin-link]:bg-[var(--color-background)]",
    "[&_.admin-savebar]:[position:static] [&_.admin-savebar]:m-0 [&_.admin-savebar]:pt-5 [&_.admin-savebar]:px-0 [&_.admin-savebar]:pb-0 [&_.admin-savebar]:[border:0] [&_.admin-savebar]:[border-top:1px_solid_var(--color-border)] [&_.admin-savebar]:rounded-[0] [&_.admin-savebar]:shadow-[none] [&_.admin-savebar]:justify-end [&_.admin-savebar]:bg-[transparent]",
    "[&_.admin-savebar_button]:min-h-12 [&_.admin-savebar_button]:py-3 [&_.admin-savebar_button]:px-6",
    '[&_.admin-savebar_button[type="submit"]]:[order:1]',
    "max-[641px]:[&_.admin-fields]:gap-5",
    "max-[641px]:[&_.admin-tech-picker]:p-5",
    "max-[641px]:[&_.admin-optional_summary]:p-4.5",
    "max-[641px]:[&_.admin-optional-fields]:p-4.5",
    "max-[641px]:[&_.admin-cover-preview_img]:h-50",
    "max-[641px]:[&_.admin-savebar]:[justify-content:stretch]",
    "max-[641px]:[&_.admin-savebar_button]:flex-1 max-[641px]:[&_.admin-savebar_button]:p-3",
  ].join(" "),
  "admin-shell-editing": ["max-w-360"].join(" "),
  "admin-project-dates": [
    "grid gap-3 pt-5.5 [border-top:1px_solid_var(--color-border)]",
  ].join(" "),
  "admin-date-preview": [
    "py-3 px-3.5 rounded-[10px] bg-[var(--color-highlight)]",
    "[&_strong]:text-[var(--color-foreground)] [&_strong]:font-medium",
  ].join(" "),
  "admin-editor-layout": [
    "grid grid-cols-[minmax(0,_1.4fr)_minmax(340px,_1fr)] items-start gap-7",
    "max-[1001px]:grid-cols-[1fr]",
    "max-[641px]:gap-5",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:grid-cols-[1fr]",
  ].join(" "),
  "admin-editor-main": [
    "grid gap-6 min-w-0",
    "max-[641px]:grid-cols-[1fr] max-[641px]:gap-4.5",
  ].join(" "),
  "admin-editor-sidebar": [
    "grid gap-6 min-w-0",
    "[&_.admin-tech-options]:grid-cols-2 [&_.admin-tech-options]:max-h-75",
    "max-[1001px]:grid-cols-2 max-[1001px]:items-start",
    "max-[1001px]:[&_>_details]:[grid-column:1/-1]",
    "max-[641px]:grid-cols-[1fr] max-[641px]:gap-4.5",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:grid-cols-2 min-[1001px]:max-[1281px]:[.admin-dashboard_&]:items-start",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&_>_details]:[grid-column:1/-1]",
  ].join(" "),
  "admin-editor-section": [
    "grid gap-6 min-w-0 p-7 [border:1px_solid_var(--color-border)] rounded-[16px] bg-[var(--color-card)]",
    "max-[641px]:p-5",
  ].join(" "),
  "admin-editor-section-heading": [
    "[&_h3]:text-[18px]",
    "[&_p]:mt-[5px] [&_p]:text-[12px]",
  ].join(" "),
  "admin-section-heading": [
    "flex items-start gap-3.5 [border-top:1px_solid_var(--color-border)] pt-6 mt-1.5",
    "[&:first-child]:[border:0] [&:first-child]:pt-0 [&:first-child]:mt-0",
    "[&_>_span]:bg-[var(--color-highlight)] [&_>_span]:text-[var(--color-primary)] [&_>_span]:text-[11px] [&_>_span]:rounded-[8px] [&_>_span]:p-2 [&_>_span]:font-semibold",
    "[&_p]:text-[12px] [&_p]:mt-1",
  ].join(" "),
  "admin-cover-preview": [
    "rounded-[12px] overflow-hidden [border:1px_dashed_var(--color-border)] bg-[var(--color-background)]",
    "[&_>_img]:w-full [&_>_img]:h-60 [&_>_img]:[object-fit:contain]",
    "[&_>_div]:flex [&_>_div]:flex-col [&_>_div]:items-center [&_>_div]:justify-center [&_>_div]:gap-3 [&_>_div]:py-9 [&_>_div]:px-4 [&_>_div]:min-h-50 [&_>_div]:text-center [&_>_div]:text-[var(--color-muted)]",
    "[&_strong]:text-[13px] [&_strong]:font-medium [&_strong]:text-[var(--color-foreground)]",
    "[&_span]:text-[12px]",
    "max-[641px]:[&_>_img]:h-45",
  ].join(" "),
  "admin-project": [
    "flex flex-col overflow-hidden p-0 [transition:box-shadow_0.2s,_border-color_0.2s]",
    "[&:hover]:border-[var(--color-glass-border)] [&:hover]:shadow-[0_8px_24px_#0f172a0a]",
    "[&_.admin-project-cover]:relative [&_.admin-project-cover]:pt-2.5 [&_.admin-project-cover]:px-2.5 [&_.admin-project-cover]:pb-0",
    "[&_>_div:last-child]:flex [&_>_div:last-child]:flex-col [&_>_div:last-child]:flex-1 [&_>_div:last-child]:p-5 [&_>_div:last-child]:min-w-0",
    "[&_h3]:my-2 [&_h3]:mx-0 [&_h3]:leading-[1.45] [&_h3]:[overflow-wrap:anywhere]",
    "[&_.admin-actions]:pt-[15px] [&_.admin-actions]:[border-top:1px_solid_var(--color-border)] [&_.admin-actions]:gap-2",
    "[&_.admin-actions_>_button:first-child]:flex-1",
    "max-[641px]:p-0",
  ].join(" "),
  "admin-project-cover": [
    "[&_img]:w-full [&_img]:[aspect-ratio:16/10] [&_img]:object-cover [&_img]:rounded-[10px] [&_img]:bg-[var(--color-background)]",
  ].join(" "),
  "admin-new": [
    "absolute top-5 left-5 text-[10px] font-semibold text-[#166534] bg-[#dcfce7] py-1 px-[9px] rounded-[6px]",
  ].join(" "),
  "admin-category": [
    "[.admin-shell_&]:text-[var(--color-primary)] [.admin-shell_&]:text-[9px] [.admin-shell_&]:font-semibold [.admin-shell_&]:uppercase [.admin-shell_&]:tracking-[0.1em]",
  ].join(" "),
  "admin-project-description": [
    "[.admin-shell_&]:text-[12px] [.admin-shell_&]:[display:-webkit-box] [.admin-shell_&]:[-webkit-box-orient:vertical] [.admin-shell_&]:[-webkit-line-clamp:2] [.admin-shell_&]:overflow-hidden [.admin-shell_&]:mb-4",
  ].join(" "),
  "admin-tech": [
    "flex flex-wrap gap-[5px] mt-auto pb-5",
    "[&_span]:inline-flex [&_span]:items-center [&_span]:gap-[5px] [&_span]:text-[9px] [&_span]:py-1 [&_span]:px-[7px] [&_span]:rounded-[5px] [&_span]:[border:1px_solid_var(--color-border)] [&_span]:text-[var(--color-muted)]",
  ].join(" "),
  "admin-tech-picker": [
    "grid gap-3.5 p-5 [border:1px_solid_var(--color-border)] rounded-[12px] bg-[var(--color-background)]",
    "[&_>_p]:text-[12px]",
    "max-[641px]:p-4",
  ].join(" "),
  "admin-tech-selected": [
    "flex flex-wrap gap-2 list-none p-0",
    "[&_li]:inline-flex [&_li]:items-center [&_li]:gap-2 [&_li]:pt-1 [&_li]:pr-1 [&_li]:pb-1 [&_li]:pl-2.5 [&_li]:bg-[var(--color-highlight)] [&_li]:[border:1px_solid_var(--color-border)] [&_li]:rounded-[9px] [&_li]:text-[12px] [&_li]:max-w-full",
    "[&_li_>_span]:[overflow-wrap:anywhere] [&_li_>_span]:min-w-0",
    "[&_li_button]:min-h-8 [&_li_button]:w-8 [&_li_button]:p-0 [&_li_button]:[border:0] [&_li_button]:shrink-0",
  ].join(" "),
  "admin-tech-search": [
    "[.admin-shell_&]:flex [.admin-shell_&]:items-center [.admin-shell_&]:relative",
    "[&_>_svg]:absolute [&_>_svg]:left-3 [&_>_svg]:text-[var(--color-muted)] [&_>_svg]:[pointer-events:none]",
    "[&_input]:pl-9",
  ].join(" "),
  "admin-tech-filters": [
    "flex gap-1.5 flex-wrap",
    "[&_button]:min-h-9 [&_button]:py-1.5 [&_button]:px-3 [&_button]:text-[12px]",
    '[&_button[aria-pressed="true"]]:text-[var(--color-primary)] [&_button[aria-pressed="true"]]:bg-[var(--color-highlight)] [&_button[aria-pressed="true"]]:border-[var(--color-primary)]',
  ].join(" "),
  "admin-tech-options": [
    "grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1 m-[-4px]",
    "[&_button]:justify-start [&_button]:text-left [&_button]:p-2.5 [&_button]:min-w-0 [&_button]:gap-2 [&_button]:text-[12px]",
    "[&_button_>_span]:min-w-0 [&_button_>_span]:[overflow-wrap:anywhere]",
    '[&_button[aria-pressed="true"]]:bg-[var(--color-highlight)] [&_button[aria-pressed="true"]]:border-[var(--color-primary)]',
    '[&_button[aria-pressed="true"]_.admin-tech-check]:text-[var(--color-primary)]',
    "max-[641px]:grid-cols-2",
    "max-[641px]:[&_button]:text-[11px] max-[641px]:[&_button]:p-2 max-[641px]:[&_button]:gap-1.5",
  ].join(" "),
  "admin-tech-check": ["ml-auto shrink-0 text-[var(--color-muted)]"].join(" "),
  "admin-tech-custom": [
    "justify-self-start max-w-full [overflow-wrap:anywhere]",
  ].join(" "),
  "admin-delete": [
    "[.admin-shell_&]:py-2.5 [.admin-shell_&]:px-3 [.admin-shell_&]:text-[var(--color-muted)]",
    "[.admin-shell_&:hover:not(:disabled)]:bg-[#fef2f2] [.admin-shell_&:hover:not(:disabled)]:border-[#fecaca] [.admin-shell_&:hover:not(:disabled)]:text-[#b91c1c]",
  ].join(" "),
  "admin-link": [
    "grid gap-4 p-5 [border:1px_solid_var(--color-border)] rounded-[12px] bg-[var(--color-background)]",
    "[&_>_button]:justify-self-start",
  ].join(" "),
  "admin-savebar": [
    "sticky bottom-3 p-4 mt-0 mx-[-8px] mb-[-8px] [border:1px_solid_var(--color-border)] rounded-[14px] bg-[var(--color-background)] shadow-[0_-5px_25px_#0f172a08] z-2",
  ].join(" "),
  "admin-checkbox": [
    "[.admin-shell_&]:flex [.admin-shell_&]:items-center [.admin-shell_&]:p-4 [.admin-shell_&]:bg-[var(--color-highlight)] [.admin-shell_&]:rounded-[10px]",
    "[&_input]:w-4.5 [&_input]:h-4.5 [&_input]:[accent-color:#2563eb]",
  ].join(" "),
  "admin-notice": [
    "py-4 px-5 [border:1px_solid_var(--color-primary)] rounded-[12px] mb-6 bg-[var(--color-highlight)]",
  ].join(" "),
  "admin-empty": [
    "[grid-column:1/-1] flex flex-col items-center gap-3 py-15 px-5 [border:1px_dashed_var(--color-border)] rounded-[16px] text-center",
    "[&_>_svg]:text-[var(--color-muted)]",
  ].join(" "),
  "admin-signin-layout": [
    "grid grid-cols-[1fr_1fr] max-w-255 mt-13 mx-auto mb-0 [border:1px_solid_var(--color-border)] rounded-[26px] overflow-hidden shadow-[0_24px_80px_#0f172a08] min-h-157.5",
    "max-[641px]:grid-cols-[1fr] max-[641px]:mt-6 max-[641px]:rounded-[20px] max-[641px]:min-h-auto",
  ].join(" "),
  "admin-signin-story": [
    "relative overflow-hidden flex flex-col justify-between gap-7 p-10.5 text-[#eff6ff] bg-[image:radial-gradient(ellipse_at_100%_100%,_#3274e2_0%,_transparent_58%),_linear-gradient(145deg,_#102d69,_#15449c)]",
    "[&_h1]:text-[clamp(38px,_4vw,_52px)] [&_h1]:leading-[1.12] [&_h1]:tracking-[-0.05em] [&_h1]:mt-0 [&_h1]:mx-0 [&_h1]:mb-5 [&_h1]:text-[white]",
    "[&_h1_span]:text-[#9ec6ff]",
    "[&_p]:text-[#bfd3f5] [&_p]:text-[13px]",
    "max-[901px]:p-7.5",
    "max-[641px]:p-6 max-[641px]:gap-4.5",
    "max-[641px]:[&_h1]:text-[30px] max-[641px]:[&_h1]:m-0",
    "max-[641px]:[&_h1_br]:hidden",
    "max-[641px]:[&_h1_span]:block",
    "max-[641px]:[&_p]:hidden",
  ].join(" "),
  "admin-signin-kicker": [
    "flex items-center gap-[9px] text-[10px] font-semibold tracking-[0.18em] text-[#bfdbfe]",
  ].join(" "),
  "admin-signin-story-footer": [
    "text-[9px] tracking-[0.22em] text-[#a9c7f4]",
    "max-[641px]:hidden",
  ].join(" "),
  "admin-signin-art": [
    "relative max-w-72.5 w-full my-0 mx-auto pt-0 px-[15px] pb-[5px]",
    "max-[641px]:hidden",
  ].join(" "),
  "admin-art-window": [
    "p-3.5 [border:1px_solid_#ffffff30] rounded-[15px] bg-[#ffffff12] shadow-[10px_15px_0_#ffffff08] [transform:rotate(-6deg)]",
  ].join(" "),
  "admin-art-dots": [
    "flex gap-1 mb-3",
    "[&_i]:w-1 [&_i]:h-1 [&_i]:bg-[#ffffff60] [&_i]:rounded-[50%]",
  ].join(" "),
  "admin-art-cover": [
    "relative h-[85px] rounded-[8px] overflow-hidden bg-[linear-gradient(140deg,_#a5c9ff,_#658be6)]",
    '[&::before]:[content:""] [&::before]:absolute [&::before]:w-27.5 [&::before]:h-27.5 [&::before]:[border:18px_solid_#ffffff45] [&::before]:rounded-[24px] [&::before]:[transform:rotate(-30deg)] [&::before]:top-3 [&::before]:left-[25px]',
    '[&::after]:[content:""] [&::after]:absolute [&::after]:w-27.5 [&::after]:h-27.5 [&::after]:[border:18px_solid_#ffffff45] [&::after]:rounded-[50%] [&::after]:[transform:rotate(-30deg)] [&::after]:top-[-50px] [&::after]:left-32.5 [&::after]:border-[#2c57a955]',
  ].join(" "),
  "admin-art-line": [
    "h-1.5 w-[65%] bg-[#ffffff75] mt-[15px] rounded-[6px]",
    "[&.short]:w-[40%] [&.short]:h-1 [&.short]:mt-[7px] [&.short]:bg-[#ffffff30]",
  ].join(" "),
  "admin-art-tags": [
    "flex gap-[5px] mt-3",
    "[&_i]:w-7 [&_i]:h-2.5 [&_i]:bg-[#ffffff15] [&_i]:[border:1px_solid_#ffffff20] [&_i]:rounded-[4px]",
  ].join(" "),
  "admin-art-badge": [
    "absolute right-[-6px] bottom-3.5 flex items-center gap-[7px] py-2.5 px-[13px] bg-[#fff] text-[#1e3a5f] shadow-[0_5px_20px_#0c255730] text-[10px] rounded-[8px] [transform:rotate(4deg)]",
    "[&_>_span]:h-1.5 [&_>_span]:w-1.5 [&_>_span]:rounded-[50%] [&_>_span]:bg-[#22c55e]",
  ].join(" "),
  "admin-signin-main": [
    "flex items-center min-w-0 p-12 bg-[var(--color-background)]",
    "max-[901px]:p-8",
    "max-[641px]:py-7 max-[641px]:px-6",
  ].join(" "),
  "admin-signin-form": [
    "w-full grid gap-6",
    "[&_fieldset]:flex [&_fieldset]:flex-col [&_fieldset]:min-w-0",
    "[&_label]:mb-[9px]",
    "[&_.admin-caps-lock]:text-[12px] [&_.admin-caps-lock]:mt-[-10px] [&_.admin-caps-lock]:mx-0 [&_.admin-caps-lock]:mb-4 [&_.admin-caps-lock]:text-[var(--color-primary)]",
  ].join(" "),
  "admin-signin-heading": [
    "[&_.admin-login-icon]:mb-6",
    "[&_.admin-eyebrow]:flex [&_.admin-eyebrow]:text-[9px] [&_.admin-eyebrow]:mb-2.5",
    "[&_h2]:[font-family:var(--font-display)] [&_h2]:text-[30px] [&_h2]:mb-2 [&_h2]:tracking-[-0.04em]",
    "[&_>_p:last-child]:text-[13px]",
    "max-[641px]:[&_.admin-login-icon]:hidden",
    "max-[641px]:[&_h2]:text-[28px]",
    "max-[641px]:[&_.admin-eyebrow]:text-[8px]",
  ].join(" "),
  "admin-signin-input": [
    "relative mb-5.5",
    "[&_>_svg]:absolute [&_>_svg]:top-[50%] [&_>_svg]:left-3.5 [&_>_svg]:[transform:translateY(-50%)] [&_>_svg]:text-[var(--color-muted)] [&_>_svg]:[pointer-events:none]",
    "[&_input]:h-12.5 [&_input]:pl-10.5 [&_input]:text-[14px] [&_input]:bg-[var(--color-card)]",
    '[&_input[name="password"]]:pr-12.5',
  ].join(" "),
  "admin-password-toggle": [
    "[.admin-shell_&]:absolute [.admin-shell_&]:right-[3px] [.admin-shell_&]:top-[3px] [.admin-shell_&]:min-h-11 [.admin-shell_&]:w-11 [.admin-shell_&]:p-0 [.admin-shell_&]:[border:0] [.admin-shell_&]:text-[var(--color-muted)]",
  ].join(" "),
  "admin-signin-submit": [
    "[.admin-shell_&]:min-h-12.5 [.admin-shell_&]:text-[14px] [.admin-shell_&]:justify-center [.admin-shell_&]:gap-3 [.admin-shell_&]:mt-0.5",
  ].join(" "),
  "admin-signin-footer": [
    "flex items-center justify-center gap-2 text-[10px] text-[var(--color-muted)] pt-5 [border-top:1px_solid_var(--color-border)] leading-[1.6]",
    "[&_svg]:shrink-0",
  ].join(" "),
  "admin-signin-error": [
    "[&_svg]:shrink-0",
    "flex items-start gap-2.5 p-3.5 rounded-[10px] bg-[#ef444410] [border:1px_solid_#ef444440] text-[#b91c1c] text-[12px] leading-[1.6]",
    "[.dark_&]:text-[#fca5a5]",
  ].join(" "),
  "admin-signin-spinner": ["animate-spin", "motion-reduce:animate-none"].join(
    " ",
  ),
  "admin-dashboard": [
    "[.admin-shell&]:max-w-[none] [.admin-shell&]:p-0 [.admin-shell&]:m-0 [.admin-shell&]:bg-[var(--color-background)]",
  ].join(" "),
  "dash-sidebar": [
    "[.admin-dashboard_&]:fixed [.admin-dashboard_&]:[inset:0_auto_0_0] [.admin-dashboard_&]:w-61 [.admin-dashboard_&]:z-40 [.admin-dashboard_&]:flex [.admin-dashboard_&]:flex-col [.admin-dashboard_&]:pt-7 [.admin-dashboard_&]:px-4.5 [.admin-dashboard_&]:pb-4.5 [.admin-dashboard_&]:[border-right:1px_solid_var(--color-border)] [.admin-dashboard_&]:bg-[var(--color-card)] [.admin-dashboard_&]:overflow-y-auto",
    "max-[1001px]:[.admin-dashboard_&]:hidden",
  ].join(" "),
  "dash-brand": [
    "[.admin-dashboard_&]:pt-0 [.admin-dashboard_&]:px-3 [.admin-dashboard_&]:pb-6.5 [.admin-dashboard_&]:text-[19px] [.admin-dashboard_&]:tracking-[-0.04em] [.admin-dashboard_&]:gap-[11px]",
    "[.admin-dashboard_&_>_span:last-child]:grid [.admin-dashboard_&_>_span:last-child]:gap-0.5",
    "[.admin-dashboard_&_small]:text-[8px] [.admin-dashboard_&_small]:tracking-[0.18em]",
  ].join(" "),
  "dash-workspace": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-2.5 [.admin-dashboard_&]:p-3 [.admin-dashboard_&]:[border:1px_solid_var(--color-border)] [.admin-dashboard_&]:rounded-[12px] [.admin-dashboard_&]:bg-[var(--color-background)] [.admin-dashboard_&]:mb-7.5",
    "[.admin-dashboard_&_>_div]:grid [.admin-dashboard_&_>_div]:gap-0.5",
    "[.admin-dashboard_&_strong]:text-[12px] [.admin-dashboard_&_strong]:font-medium",
    "[.admin-dashboard_&_small]:text-[10px]",
    "[.admin-dashboard_&_.dash-status-dot]:ml-auto",
  ].join(" "),
  "dash-workspace-symbol": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:[place-items:center] [.admin-dashboard_&]:w-[31px] [.admin-dashboard_&]:h-[31px] [.admin-dashboard_&]:bg-[var(--color-highlight)] [.admin-dashboard_&]:text-[var(--color-primary)] [.admin-dashboard_&]:rounded-[8px] [.admin-dashboard_&]:text-[13px] [.admin-dashboard_&]:font-semibold",
  ].join(" "),
  "dash-status-dot": [
    "[.admin-dashboard_&]:w-1.5 [.admin-dashboard_&]:h-1.5 [.admin-dashboard_&]:bg-[#22c55e] [.admin-dashboard_&]:rounded-[50%] [.admin-dashboard_&]:shrink-0",
  ].join(" "),
  "dash-nav-label": [
    "[.admin-dashboard_&]:text-[9px] [.admin-dashboard_&]:tracking-[0.14em] [.admin-dashboard_&]:py-0 [.admin-dashboard_&]:px-[13px] [.admin-dashboard_&]:mb-3 [.admin-dashboard_&]:font-semibold",
  ].join(" "),
  "dash-navigation": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:gap-1.5",
    "[.admin-dashboard_&_button]:justify-start [.admin-dashboard_&_button]:border-[transparent] [.admin-dashboard_&_button]:text-[var(--color-muted)] [.admin-dashboard_&_button]:py-3 [.admin-dashboard_&_button]:px-3.5 [.admin-dashboard_&_button]:min-h-11.5 [.admin-dashboard_&_button]:gap-[11px]",
    '[.admin-dashboard_&_button[aria-current="page"]]:bg-[var(--color-highlight)] [.admin-dashboard_&_button[aria-current="page"]]:text-[var(--color-primary)]',
    "[.admin-dashboard_&_button_small]:ml-auto [.admin-dashboard_&_button_small]:bg-[var(--color-background)] [.admin-dashboard_&_button_small]:rounded-[6px] [.admin-dashboard_&_button_small]:py-[1px] [.admin-dashboard_&_button_small]:px-[7px] [.admin-dashboard_&_button_small]:text-[inherit] [.admin-dashboard_&_button_small]:text-[10px]",
  ].join(" "),
  "dash-add-project": [
    "[.admin-dashboard_&]:mt-5.5 [.admin-dashboard_&]:mx-2.5 [.admin-dashboard_&]:mb-6",
  ].join(" "),
  "dash-sidebar-bottom": [
    "[.admin-dashboard_&]:mt-auto [.admin-dashboard_&]:pt-7",
  ].join(" "),
  "dash-view-site": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:w-full [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-[11px] [.admin-dashboard_&]:py-3 [.admin-dashboard_&]:px-3.5 [.admin-dashboard_&]:text-[var(--color-muted)] [.admin-dashboard_&]:text-[12px] [.admin-dashboard_&]:[border:0] [.admin-dashboard_&]:justify-between",
    "[.admin-dashboard_&:hover]:text-[var(--color-primary)]",
  ].join(" "),
  "dash-theme": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:w-full [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-[11px] [.admin-dashboard_&]:py-3 [.admin-dashboard_&]:px-3.5 [.admin-dashboard_&]:text-[var(--color-muted)] [.admin-dashboard_&]:text-[12px] [.admin-dashboard_&]:[border:0] [.admin-dashboard_&]:justify-start",
  ].join(" "),
  "dash-account": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-2.5 [.admin-dashboard_&]:pt-4.5 [.admin-dashboard_&]:px-1 [.admin-dashboard_&]:pb-0 [.admin-dashboard_&]:mt-4 [.admin-dashboard_&]:[border-top:1px_solid_var(--color-border)]",
    "[.admin-dashboard_&_>_div]:min-w-0 [.admin-dashboard_&_>_div]:grid [.admin-dashboard_&_>_div]:flex-1",
    "[.admin-dashboard_&_strong]:text-[12px] [.admin-dashboard_&_strong]:font-medium [.admin-dashboard_&_strong]:whitespace-nowrap [.admin-dashboard_&_strong]:text-ellipsis [.admin-dashboard_&_strong]:overflow-hidden",
    "[.admin-dashboard_&_small]:text-[10px]",
    "[.admin-dashboard_&_button]:[border:0] [.admin-dashboard_&_button]:p-2 [.admin-dashboard_&_button]:min-w-9 [.admin-dashboard_&_button]:text-[var(--color-muted)]",
  ].join(" "),
  "dash-avatar": [
    "[.admin-dashboard_&]:w-8.5 [.admin-dashboard_&]:h-8.5 [.admin-dashboard_&]:grid [.admin-dashboard_&]:[place-items:center] [.admin-dashboard_&]:rounded-[50%] [.admin-dashboard_&]:shrink-0 [.admin-dashboard_&]:bg-[var(--color-highlight)] [.admin-dashboard_&]:text-[var(--color-primary)] [.admin-dashboard_&]:text-[13px] [.admin-dashboard_&]:font-semibold",
  ].join(" "),
  "dash-body": [
    "[.admin-dashboard_&]:ml-61 [.admin-dashboard_&]:min-w-0 [.admin-dashboard_&]:min-h-screen [.admin-dashboard_&]:flex [.admin-dashboard_&]:flex-col",
    "max-[1001px]:[.admin-dashboard_&]:ml-0",
  ].join(" "),
  "dash-topbar": [
    "[.admin-dashboard_&]:min-h-19.5 [.admin-dashboard_&]:py-4.5 [.admin-dashboard_&]:px-9 [.admin-dashboard_&]:flex [.admin-dashboard_&]:justify-between [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-4 [.admin-dashboard_&]:[border-bottom:1px_solid_var(--color-border)]",
    "max-[1001px]:[.admin-dashboard_&]:py-3 max-[1001px]:[.admin-dashboard_&]:px-6 max-[1001px]:[.admin-dashboard_&]:min-h-17",
    "max-[641px]:[.admin-dashboard_&]:py-2.5 max-[641px]:[.admin-dashboard_&]:px-3",
  ].join(" "),
  "dash-breadcrumb": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:gap-3 [.admin-dashboard_&]:items-center [.admin-dashboard_&]:text-[var(--color-muted)] [.admin-dashboard_&]:text-[12px]",
    "[.admin-dashboard_&_strong]:text-[var(--color-foreground)] [.admin-dashboard_&_strong]:font-medium",
    "max-[641px]:[.admin-dashboard_&]:text-[11px] max-[641px]:[.admin-dashboard_&]:gap-2",
  ].join(" "),
  "dash-topbar-meta": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-2 [.admin-dashboard_&]:text-[var(--color-muted)] [.admin-dashboard_&]:text-[11px]",
    "[.admin-dashboard_&_.dash-avatar]:ml-4",
    "max-[641px]:[.admin-dashboard_&]:text-[0px] max-[641px]:[.admin-dashboard_&]:gap-0",
    "max-[641px]:[.admin-dashboard_&_>_.dash-status-dot]:hidden",
    "max-[641px]:[.admin-dashboard_&_.dash-avatar]:ml-0",
  ].join(" "),
  "dash-content": [
    "[.admin-dashboard_&]:w-full [.admin-dashboard_&]:max-w-390 [.admin-dashboard_&]:p-9 [.admin-dashboard_&]:my-0 [.admin-dashboard_&]:mx-auto [.admin-dashboard_&]:flex-1 [.admin-dashboard_&]:min-w-0",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:p-7",
    "max-[1001px]:[.admin-dashboard_&]:py-7 max-[1001px]:[.admin-dashboard_&]:px-6",
    "max-[641px]:[.admin-dashboard_&]:py-6 max-[641px]:[.admin-dashboard_&]:px-4",
  ].join(" "),
  "dash-page-heading": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:items-center [.admin-dashboard_&]:justify-between [.admin-dashboard_&]:gap-5 [.admin-dashboard_&]:mb-7.5",
    "[.admin-dashboard_&_h1]:text-[32px] [.admin-dashboard_&_h1]:mb-2",
    "[.admin-dashboard_&_p:last-child]:text-[13px]",
    "[.admin-dashboard_&_.admin-eyebrow]:text-[9px] [.admin-dashboard_&_.admin-eyebrow]:mb-2.5",
    "max-[641px]:[.admin-dashboard_&]:items-start max-[641px]:[.admin-dashboard_&]:flex-col max-[641px]:[.admin-dashboard_&]:gap-4.5",
    "max-[641px]:[.admin-dashboard_&_h1]:text-[29px]",
  ].join(" "),
  "dash-stats": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:grid-cols-4 [.admin-dashboard_&]:gap-4 [.admin-dashboard_&]:mb-7",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:gap-3",
    "max-[641px]:[.admin-dashboard_&]:grid-cols-2 max-[641px]:[.admin-dashboard_&]:gap-3 max-[641px]:[.admin-dashboard_&]:mb-5",
  ].join(" "),
  "dash-stat": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:grid-cols-[1fr_auto] [.admin-dashboard_&]:gap-[8px_10px] [.admin-dashboard_&]:p-5 [.admin-dashboard_&]:[border:1px_solid_var(--color-border)] [.admin-dashboard_&]:rounded-[14px] [.admin-dashboard_&]:bg-[var(--color-card)]",
    "[.admin-dashboard_&_>_span:not(.dash-stat-icon)]:text-[11px] [.admin-dashboard_&_>_span:not(.dash-stat-icon)]:text-[var(--color-muted)] [.admin-dashboard_&_>_span:not(.dash-stat-icon)]:self-center",
    "[.admin-dashboard_&_strong]:[font-family:var(--font-display)] [.admin-dashboard_&_strong]:font-medium [.admin-dashboard_&_strong]:text-[30px] [.admin-dashboard_&_strong]:tracking-[-0.04em] [.admin-dashboard_&_strong]:leading-[1.2]",
    "[.admin-dashboard_&_small]:[grid-column:1/-1] [.admin-dashboard_&_small]:text-[10px]",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:p-4",
    "max-[641px]:[.admin-dashboard_&]:p-4 max-[641px]:[.admin-dashboard_&]:gap-2.5",
    "max-[641px]:[.admin-dashboard_&_>_span:not(.dash-stat-icon)]:[grid-row:1] max-[641px]:[.admin-dashboard_&_>_span:not(.dash-stat-icon)]:text-[10px]",
    "max-[641px]:[.admin-dashboard_&_strong]:text-[28px]",
  ].join(" "),
  "dash-stat-icon": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:[place-items:center] [.admin-dashboard_&]:w-8.5 [.admin-dashboard_&]:h-8.5 [.admin-dashboard_&]:rounded-[10px] [.admin-dashboard_&]:[grid-column:2] [.admin-dashboard_&]:[grid-row:1_/_3]",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:w-7 min-[1001px]:max-[1281px]:[.admin-dashboard_&]:h-7",
    "max-[641px]:[.admin-dashboard_&]:[grid-row:1] max-[641px]:[.admin-dashboard_&]:w-7 max-[641px]:[.admin-dashboard_&]:h-7",
  ].join(" "),
  "dash-accent-blue": [
    "[.admin-dashboard_&]:text-[#3b82f6] [.admin-dashboard_&]:bg-[#3b82f618]",
  ].join(" "),
  "dash-accent-purple": [
    "[.admin-dashboard_&]:text-[#a078e8] [.admin-dashboard_&]:bg-[#a078e818]",
  ].join(" "),
  "dash-accent-amber": [
    "[.admin-dashboard_&]:text-[#d59a22] [.admin-dashboard_&]:bg-[#d59a2218]",
  ].join(" "),
  "dash-overview-grid": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:grid-cols-[minmax(0,_1.5fr)_minmax(0,_1fr)] [.admin-dashboard_&]:gap-6 [.admin-dashboard_&]:items-start",
    "[.admin-dashboard_&_.admin-panel]:p-6 [.admin-dashboard_&_.admin-panel]:bg-[var(--color-card)] [.admin-dashboard_&_.admin-panel]:rounded-[16px] [.admin-dashboard_&_.admin-panel]:min-w-0",
    "max-[641px]:[.admin-dashboard_&]:grid-cols-[1fr] max-[641px]:[.admin-dashboard_&]:gap-5",
    "max-[641px]:[.admin-dashboard_&_.admin-panel]:p-5",
  ].join(" "),
  "dash-panel-heading": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:justify-between [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-4 [.admin-dashboard_&]:mb-5.5",
    "[.admin-dashboard_&_h2]:text-[17px]",
    "[.admin-dashboard_&_p]:text-[11px] [.admin-dashboard_&_p]:mt-1",
    "[.admin-dashboard_&_button]:[border:0] [.admin-dashboard_&_button]:text-[var(--color-primary)] [.admin-dashboard_&_button]:py-[5px] [.admin-dashboard_&_button]:px-0 [.admin-dashboard_&_button]:min-h-9 [.admin-dashboard_&_button]:text-[11px] [.admin-dashboard_&_button]:whitespace-nowrap",
    "max-[641px]:[.admin-dashboard_&]:gap-2",
    "max-[641px]:[.admin-dashboard_&_h2]:text-[16px]",
  ].join(" "),
  "dash-project-list": ["[.admin-dashboard_&]:grid"].join(" "),
  "dash-project-row": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:w-full [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-3 [.admin-dashboard_&]:py-3.5 [.admin-dashboard_&]:px-0 [.admin-dashboard_&]:[border:0] [.admin-dashboard_&]:[border-bottom:1px_solid_var(--color-border)] [.admin-dashboard_&]:rounded-[0] [.admin-dashboard_&]:text-left",
    "[.admin-dashboard_&:last-child]:[border:0] [.admin-dashboard_&:last-child]:pb-0",
    "[.admin-dashboard_&:first-child]:pt-0",
    "[.admin-dashboard_&:hover]:bg-[transparent]",
    "[.admin-dashboard_&_img]:w-14.5 [.admin-dashboard_&_img]:h-11 [.admin-dashboard_&_img]:rounded-[7px] [.admin-dashboard_&_img]:object-cover [.admin-dashboard_&_img]:shrink-0 [.admin-dashboard_&_img]:[border:1px_solid_var(--color-border)]",
    "[.admin-dashboard_&_>_span:first-of-type]:grid [.admin-dashboard_&_>_span:first-of-type]:gap-1 [.admin-dashboard_&_>_span:first-of-type]:min-w-0 [.admin-dashboard_&_>_span:first-of-type]:flex-1",
    "[.admin-dashboard_&_strong]:text-[12px] [.admin-dashboard_&_strong]:font-medium [.admin-dashboard_&_strong]:overflow-hidden [.admin-dashboard_&_strong]:text-ellipsis [.admin-dashboard_&_strong]:whitespace-nowrap",
    "[.admin-dashboard_&_small]:text-[10px]",
    "[.admin-dashboard_&_>_svg]:text-[var(--color-muted)] [.admin-dashboard_&_>_svg]:shrink-0",
    "max-[641px]:[.admin-dashboard_&]:gap-2.5",
    "max-[641px]:[.admin-dashboard_&_img]:w-12 max-[641px]:[.admin-dashboard_&_img]:h-9.5",
    "max-[641px]:[.admin-dashboard_&_strong]:text-[11px]",
    "max-[641px]:[.admin-dashboard_&_small]:text-[9px]",
  ].join(" "),
  "dash-project-type": [
    "[.admin-dashboard_&]:text-[9px] [.admin-dashboard_&]:[text-transform:capitalize] [.admin-dashboard_&]:py-1 [.admin-dashboard_&]:px-2 [.admin-dashboard_&]:rounded-[6px] [.admin-dashboard_&]:bg-[var(--color-highlight)] [.admin-dashboard_&]:text-[var(--color-primary)]",
    "min-[1001px]:max-[1281px]:[.admin-dashboard_&]:hidden",
    "max-[641px]:[.admin-dashboard_&]:hidden",
  ].join(" "),
  "dash-type-design": [
    "[.admin-dashboard_&.dash-type-design]:text-[#a078e8] [.admin-dashboard_&.dash-type-design]:bg-[#a078e818]",
  ].join(" "),
  "dash-type-vlog": [
    "[.admin-dashboard_&.dash-type-vlog]:text-[#d59a22] [.admin-dashboard_&.dash-type-vlog]:bg-[#d59a2218]",
  ].join(" "),
  "dash-category-row": [
    "[.admin-dashboard_&]:mb-6",
    "[.admin-dashboard_&_>_div:first-child]:flex [.admin-dashboard_&_>_div:first-child]:justify-between [.admin-dashboard_&_>_div:first-child]:text-[12px] [.admin-dashboard_&_>_div:first-child]:mb-2.5",
    "[.admin-dashboard_&_strong]:font-medium",
  ].join(" "),
  "dash-progress": [
    "[.admin-dashboard_&]:h-[7px] [.admin-dashboard_&]:rounded-[5px] [.admin-dashboard_&]:overflow-hidden [.admin-dashboard_&]:bg-[var(--color-border)]",
    "[.admin-dashboard_&_>_span]:block [.admin-dashboard_&_>_span]:h-full [.admin-dashboard_&_>_span]:rounded-[inherit]",
    "[.admin-dashboard_&_.dash-accent-blue]:bg-[#3b82f6]",
    "[.admin-dashboard_&_.dash-accent-purple]:bg-[#a078e8]",
    "[.admin-dashboard_&_.dash-accent-amber]:bg-[#d59a22]",
  ].join(" "),
  "dash-category-note": [
    "[.admin-dashboard_&]:pt-4 [.admin-dashboard_&]:[border-top:1px_solid_var(--color-border)] [.admin-dashboard_&]:text-[10px]",
  ].join(" "),
  "dash-tool-row": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-3 [.admin-dashboard_&]:py-3 [.admin-dashboard_&]:px-0 [.admin-dashboard_&]:[border-bottom:1px_solid_var(--color-border)]",
    "[.admin-dashboard_&:last-child]:[border:0] [.admin-dashboard_&:last-child]:pb-0",
    "[.admin-dashboard_&_strong]:text-[12px] [.admin-dashboard_&_strong]:font-medium",
    "[.admin-dashboard_&_small]:ml-auto [.admin-dashboard_&_small]:text-[10px]",
  ].join(" "),
  "dash-create-card": [
    "[.admin-dashboard_&]:p-7 [.admin-dashboard_&]:rounded-[16px] [.admin-dashboard_&]:bg-[linear-gradient(140deg,_#123470,_#245cc0)] [.admin-dashboard_&]:text-[white] [.admin-dashboard_&]:min-h-72.5 [.admin-dashboard_&]:flex [.admin-dashboard_&]:items-start [.admin-dashboard_&]:flex-col [.admin-dashboard_&]:gap-4",
    "[.admin-dashboard_&_h2]:text-[23px] [.admin-dashboard_&_h2]:leading-[1.3]",
    "[.admin-dashboard_&_p]:text-[#bfd6ff] [.admin-dashboard_&_p]:text-[12px]",
    "[.admin-dashboard_&_button]:bg-[#fff] [.admin-dashboard_&_button]:text-[#1d4ed8] [.admin-dashboard_&_button]:[border:0] [.admin-dashboard_&_button]:mt-auto",
    "[.admin-dashboard_&_button:hover]:bg-[#dbeafe]",
  ].join(" "),
  "dash-create-icon": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:[place-items:center] [.admin-dashboard_&]:w-10 [.admin-dashboard_&]:h-10 [.admin-dashboard_&]:rounded-[12px] [.admin-dashboard_&]:[border:1px_solid_#ffffff30] [.admin-dashboard_&]:bg-[#ffffff10]",
  ].join(" "),
  "dash-footer": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:justify-between [.admin-dashboard_&]:gap-4 [.admin-dashboard_&]:my-0 [.admin-dashboard_&]:mx-9 [.admin-dashboard_&]:py-5.5 [.admin-dashboard_&]:px-0 [.admin-dashboard_&]:text-[var(--color-muted)] [.admin-dashboard_&]:text-[10px] [.admin-dashboard_&]:[border-top:1px_solid_var(--color-border)]",
    "max-[641px]:[.admin-dashboard_&]:my-0 max-[641px]:[.admin-dashboard_&]:mx-4 max-[641px]:[.admin-dashboard_&]:text-[9px]",
  ].join(" "),
  "dash-appearance": [
    "[.admin-dashboard_&]:max-w-212.5",
    "[.admin-dashboard_&_>_p]:mt-2",
  ].join(" "),
  "dash-theme-options": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:grid-cols-[1fr_1fr] [.admin-dashboard_&]:gap-5 [.admin-dashboard_&]:mt-7",
    "[.admin-dashboard_&_>_button]:block [.admin-dashboard_&_>_button]:p-3 [.admin-dashboard_&_>_button]:text-left",
    '[.admin-dashboard_&_>_button[aria-pressed="true"]]:border-[var(--color-primary)] [.admin-dashboard_&_>_button[aria-pressed="true"]]:shadow-[0_0_0_1px_var(--color-primary)]',
    "[.admin-dashboard_&_>_button_>_span]:flex [.admin-dashboard_&_>_button_>_span]:items-center [.admin-dashboard_&_>_button_>_span]:gap-2 [.admin-dashboard_&_>_button_>_span]:pt-3.5 [.admin-dashboard_&_>_button_>_span]:px-0.5 [.admin-dashboard_&_>_button_>_span]:pb-0.5 [.admin-dashboard_&_>_button_>_span]:text-[13px]",
    "[.admin-dashboard_&_small]:ml-auto [.admin-dashboard_&_small]:text-[10px]",
    "max-[641px]:[.admin-dashboard_&]:gap-3",
    "max-[641px]:[.admin-dashboard_&_>_button]:p-2",
    "max-[641px]:[.admin-dashboard_&_>_button_>_span]:flex-wrap",
    "max-[641px]:[.admin-dashboard_&_small]:ml-0 max-[641px]:[.admin-dashboard_&_small]:w-full",
  ].join(" "),
  "dash-theme-preview": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:h-35 [.admin-dashboard_&]:[border:1px_solid_#94a3b830] [.admin-dashboard_&]:rounded-[8px] [.admin-dashboard_&]:overflow-hidden",
    "[.admin-dashboard_&_>_i]:w-[22%] [.admin-dashboard_&_>_i]:h-full [.admin-dashboard_&_>_i]:bg-[#94a3b820] [.admin-dashboard_&_>_i]:[border-right:1px_solid_#94a3b830]",
    "[.admin-dashboard_&_>_div]:flex-1 [.admin-dashboard_&_>_div]:flex [.admin-dashboard_&_>_div]:flex-wrap [.admin-dashboard_&_>_div]:[align-content:start] [.admin-dashboard_&_>_div]:gap-2.5 [.admin-dashboard_&_>_div]:p-4.5",
    "[.admin-dashboard_&_b]:h-2 [.admin-dashboard_&_b]:w-[70%] [.admin-dashboard_&_b]:bg-[#3b82f6] [.admin-dashboard_&_b]:rounded-[4px] [.admin-dashboard_&_b]:mb-2.5",
    "[.admin-dashboard_&_span]:w-[42%] [.admin-dashboard_&_span]:h-12.5 [.admin-dashboard_&_span]:bg-[#94a3b820] [.admin-dashboard_&_span]:[border:1px_solid_#94a3b830] [.admin-dashboard_&_span]:rounded-[5px]",
    "max-[641px]:[.admin-dashboard_&]:h-25",
    "max-[641px]:[.admin-dashboard_&_>_div]:p-2.5 max-[641px]:[.admin-dashboard_&_>_div]:gap-1.5",
    "max-[641px]:[.admin-dashboard_&_span]:h-[35px]",
  ].join(" "),
  "dash-theme-preview-light": ["[.admin-dashboard_&]:bg-[#fff]"].join(" "),
  "dash-theme-preview-dark": ["[.admin-dashboard_&]:bg-[#0f172a]"].join(" "),
  "dash-profile": [
    "[.admin-dashboard_&]:max-w-212.5 [.admin-dashboard_&]:mt-6",
    "[.admin-dashboard_&_dl]:grid [.admin-dashboard_&_dl]:gap-4 [.admin-dashboard_&_dl]:mt-5",
    "[.admin-dashboard_&_dl_>_div]:grid [.admin-dashboard_&_dl_>_div]:gap-1",
    "[.admin-dashboard_&_dt]:text-[11px] [.admin-dashboard_&_dt]:text-[var(--color-muted)]",
    "[.admin-dashboard_&_dd]:text-[13px] [.admin-dashboard_&_dd]:[overflow-wrap:anywhere]",
  ].join(" "),
  "dash-empty": [
    "[.admin-dashboard_&]:grid [.admin-dashboard_&]:[justify-items:center] [.admin-dashboard_&]:text-center [.admin-dashboard_&]:py-7.5 [.admin-dashboard_&]:px-3 [.admin-dashboard_&]:gap-3.5",
  ].join(" "),
  "dash-menu-button": [
    "[.admin-dashboard_&]:hidden",
    "max-[1001px]:[.admin-dashboard_&]:inline-flex max-[1001px]:[.admin-dashboard_&]:p-2 max-[1001px]:[.admin-dashboard_&]:[border:0]",
  ].join(" "),
  "dash-mobile-drawer": [
    "[.admin-dashboard_&]:fixed [.admin-dashboard_&]:[inset:0_auto_0_0] [.admin-dashboard_&]:w-71 [.admin-dashboard_&]:max-w-[calc(100vw_-_36px)] [.admin-dashboard_&]:h-dvh [.admin-dashboard_&]:max-h-dvh [.admin-dashboard_&]:m-0 [.admin-dashboard_&]:p-4.5 [.admin-dashboard_&]:[border:0] [.admin-dashboard_&]:[border-right:1px_solid_var(--color-border)] [.admin-dashboard_&]:bg-[var(--color-background)] [.admin-dashboard_&]:text-[var(--color-foreground)]",
    "[.admin-dashboard_&[open]]:flex [.admin-dashboard_&[open]]:flex-col",
    "[.admin-dashboard_&::backdrop]:bg-[#02061788] [.admin-dashboard_&::backdrop]:[backdrop-filter:blur(3px)]",
  ].join(" "),
  "dash-drawer-header": [
    "[.admin-dashboard_&]:flex [.admin-dashboard_&]:justify-between [.admin-dashboard_&]:items-center [.admin-dashboard_&]:gap-4 [.admin-dashboard_&]:mb-5.5 [.admin-dashboard_&]:text-[12px] [.admin-dashboard_&]:text-[var(--color-muted)]",
    "[.admin-dashboard_&_button]:p-2 [.admin-dashboard_&_button]:[border:0]",
  ].join(" "),
};

export function adminClasses(classNames) {
  return classNames
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => (styles[name] ? name + " " + styles[name] : name))
    .join(" ");
}
