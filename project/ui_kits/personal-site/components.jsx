/* ============================================================
   Salim Dellali Design System — Components
   React/JSX. Loaded with <script type="text/babel" src="components.jsx">.
   All styling lives in components.css; this file only owns markup + behavior.

   Components are exported to window at the bottom for cross-file use.
   ============================================================ */

const { useState, useEffect, useRef, useCallback, createContext, useContext, Fragment } = React;

/* ---------------- Layout primitives ---------------- */
function Container({ size, children, ...rest }) {
  return <div className={"sd-container" + (size === "md" ? " sd-container-md" : "")} {...rest}>{children}</div>;
}
function Section({ size, children, style, ...rest }) {
  return <section className={size === "lg" ? "sd-section-lg" : "sd-section"} style={style} {...rest}>{children}</section>;
}
function Stack({ gap = 4, children, style, ...rest }) {
  const g = `var(--sp-${gap})`;
  return <div className="sd-stack" style={{ gap: g, ...style }} {...rest}>{children}</div>;
}
function Row({ gap = 3, align = "center", wrap = true, children, style, ...rest }) {
  const g = `var(--sp-${gap})`;
  return <div className="sd-row" style={{ gap: g, alignItems: align, flexWrap: wrap ? "wrap" : "nowrap", ...style }} {...rest}>{children}</div>;
}

/* ---------------- Branded primitives ---------------- */
function Stripe({ thick, soft, style, ...rest }) {
  return <div className={"sd-stripe" + (soft ? " sd-stripe--soft" : "") + (thick ? " sd-stripe--thick" : "")} style={style} {...rest} />;
}
function Eyebrow({ children, ...rest }) {
  return <div className="eyebrow" {...rest}>{children}</div>;
}
function Wordmark({ dark, height = 36, ...rest }) {
  const src = dark ? "../../assets/wordmark-dark.svg" : "../../assets/wordmark.svg";
  return <img src={src} alt="Salim Dellali" style={{ height }} {...rest} />;
}

/* ---------------- Button ---------------- */
function Button({ variant = "primary", size, block, as = "button", href, children, className = "", ...rest }) {
  const cn = [
    "sd-btn",
    `sd-btn-${variant}`,
    size === "sm" && "sd-btn-sm",
    size === "lg" && "sd-btn-lg",
    block && "sd-btn-block",
    className,
  ].filter(Boolean).join(" ");
  if (as === "a" || href) {
    return <a className={cn} href={href} {...rest}>{children}</a>;
  }
  return <button className={cn} {...rest}>{children}</button>;
}

/* ---------------- Form fields ---------------- */
function Field({ label, help, error, children, htmlFor }) {
  return (
    <div className="sd-field">
      {label && <label className="sd-label" htmlFor={htmlFor}>{label}</label>}
      {children}
      {error ? <div className="sd-help sd-help-error">{error}</div> : help ? <div className="sd-help">{help}</div> : null}
    </div>
  );
}
function Input({ invalid, ...rest }) {
  return <input className="sd-input" aria-invalid={invalid || undefined} {...rest} />;
}
function Select({ children, ...rest }) {
  return <select className="sd-select" {...rest}>{children}</select>;
}
function Textarea(rest) {
  return <textarea className="sd-textarea" {...rest} />;
}
function Checkbox({ label, ...rest }) {
  return <label className="sd-check"><input type="checkbox" {...rest} /><span>{label}</span></label>;
}
function Radio({ label, name, ...rest }) {
  return <label className="sd-check"><input type="radio" name={name} {...rest} /><span>{label}</span></label>;
}

/* ---------------- Tag / Badge ---------------- */
function Tag({ tone = "neutral", children, ...rest }) {
  return <span className={`sd-tag sd-tag-${tone}`} {...rest}>{children}</span>;
}
function BadgeDot({ color, children, ...rest }) {
  return <span className="sd-badge-dot" style={{ "--c": color }} {...rest}>{children}</span>;
}
function Kbd({ children, ...rest }) {
  return <kbd {...rest}>{children}</kbd>;
}

/* ---------------- Banner ---------------- */
const BANNER_ICONS = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  danger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  ),
};
function Banner({ tone = "info", title, children, onDismiss, ...rest }) {
  return (
    <div className={`sd-banner sd-banner-${tone}`} role="status" {...rest}>
      <span className="sd-banner-icon" aria-hidden="true">{BANNER_ICONS[tone]}</span>
      <div style={{ flex: 1 }}>
        {title && <strong>{title} </strong>}
        {children}
      </div>
      {onDismiss && <button onClick={onDismiss} className="sd-btn sd-btn-ghost sd-btn-sm" aria-label="Dismiss" style={{ marginLeft: "auto", padding: "2px 6px" }}>×</button>}
    </div>
  );
}

/* ---------------- Card ---------------- */
function Card({ featured, as = "div", href, children, className = "", style, ...rest }) {
  const cn = ["sd-card", featured && "sd-card-featured", href && "sd-card-link", className].filter(Boolean).join(" ");
  if (href) return <a className={cn} href={href} style={style} {...rest}>{children}</a>;
  const Tag = as;
  return <Tag className={cn} style={style} {...rest}>{children}</Tag>;
}
function FeaturedCard(props) { return <Card featured {...props} />; }

/* ---------------- Theme toggle ---------------- */
const ThemeContext = createContext(null);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("sd-theme") || (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sd-theme", theme);
  }, [theme]);
  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext) || {};
  if (!toggle) return null;
  return (
    <button className="sd-theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? "☀ LIGHT" : "☾ DARK"}
    </button>
  );
}

/* ---------------- Nav ---------------- */
function Nav({ brand = "Salim Dellali", links = [], current, onNavigate, cta, showStripe = true }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {showStripe && <Stripe soft style={{ height: 6 }} />}
      <div className="sd-nav-wrap">
        <Container>
          <nav className="sd-nav">
            <a className="sd-nav-brand" href="#" onClick={(e) => { e.preventDefault(); onNavigate?.(links[0]?.id); }}>{brand}</a>
            <ul className={"sd-nav-links" + (open ? " open" : "")}>
              {links.map(l => (
                <li key={l.id}>
                  <a href={`#${l.id}`}
                     className={current === l.id ? "active" : ""}
                     onClick={(e) => { e.preventDefault(); onNavigate?.(l.id); setOpen(false); }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="sd-nav-actions">
              <ThemeToggle />
              {cta && <Button size="sm" {...cta} />}
              <button className="sd-nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
                <svg className="sd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ eyebrow, title, lede, children }) {
  return (
    <section className="sd-hero">
      <Container>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{title}</h1>
        {lede && <p className="sd-lede">{lede}</p>}
        {children && <div className="sd-row" style={{ gap: "var(--sp-3)" }}>{children}</div>}
      </Container>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ brand = "Salim Dellali", tag = "Software Engineer · Fullstack · AI", columns = [] }) {
  return (
    <footer className="sd-footer">
      <Container>
        <div className="sd-footer-top">
          <div>
            <div className="sd-footer-brand">{brand}</div>
            <div className="sd-footer-tag">{tag}</div>
          </div>
          <div className="sd-footer-links">
            {columns.map((col, i) => (
              <a key={i} href={col.href || "#"}>{col.label}</a>
            ))}
          </div>
        </div>
        <div className="sd-footer-bottom">
          <span>© {new Date().getFullYear()} SALIM DELLALI</span>
          <span>BUILT WITH HTML &amp; PATIENCE</span>
        </div>
      </Container>
      <div className="sd-footer-stripe" />
    </footer>
  );
}

/* ---------------- Modal ---------------- */
function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="sd-scrim" onClick={onClose}>
      <div className="sd-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="sd-modal-stripe" />
        <div className="sd-modal-body">
          {title && <h4 style={{ marginBottom: "var(--sp-2)" }}>{title}</h4>}
          {children}
          {footer && <div className="sd-modal-foot">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Tabs ---------------- */
function Tabs({ items = [], value, onChange }) {
  const active = value ?? items[0]?.id;
  const current = items.find(i => i.id === active);
  return (
    <div>
      <div className="sd-tabs" role="tablist">
        {items.map(item => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === active}
            className={"sd-tab" + (item.id === active ? " active" : "")}
            onClick={() => onChange?.(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ paddingTop: "var(--sp-4)" }}>
        {current?.content}
      </div>
    </div>
  );
}

/* ---------------- Accordion ---------------- */
function Accordion({ items = [], allowMultiple = false }) {
  const [openIds, setOpenIds] = useState(() => new Set(items.filter(i => i.defaultOpen).map(i => i.id)));
  const toggle = (id) => {
    setOpenIds(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <div className="sd-acc">
      {items.map(item => {
        const open = openIds.has(item.id);
        return (
          <div key={item.id} className={"sd-acc-item" + (open ? " open" : "")}>
            <button className="sd-acc-head" onClick={() => toggle(item.id)} aria-expanded={open}>
              <span>{item.title}</span>
              <span className="sd-acc-chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </button>
            {open && <div className="sd-acc-body">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Table ---------------- */
function Table({ columns = [], rows = [] }) {
  return (
    <div className="sd-table-wrap">
      <table className="sd-table">
        <thead>
          <tr>{columns.map(c => <th key={c.key} style={{ textAlign: c.align || "left" }}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map(c => (
                <td key={c.key} style={{ textAlign: c.align || "left" }}>
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Code ---------------- */
function Code({ children, ...rest }) {
  return <code {...rest}>{children}</code>;
}
function CodeBlock({ filename, children, lang }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(codeRef.current?.innerText || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="sd-codeblock">
      {(filename || lang) && (
        <div className="sd-codeblock-head">
          <span>{filename || lang}</span>
          <button className="sd-codeblock-copy" onClick={copy}>{copied ? "copied" : "copy"}</button>
        </div>
      )}
      <pre><code ref={codeRef}>{children}</code></pre>
    </div>
  );
}

/* ---------------- Export ---------------- */
Object.assign(window, {
  // layout
  Container, Section, Stack, Row,
  // brand
  Stripe, Eyebrow, Wordmark,
  // primitives
  Button, Field, Input, Select, Textarea, Checkbox, Radio,
  Tag, BadgeDot, Kbd,
  // compound
  Banner, Card, FeaturedCard, Nav, Hero, Footer, Modal, Tabs, Accordion, Table,
  Code, CodeBlock,
  // theme
  ThemeProvider, ThemeToggle,
});
