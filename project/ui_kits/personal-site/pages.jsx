/* ============================================================
   Demo pages — landing, projects, about, contact.
   Built from components.jsx primitives. Hash-routed.
   ============================================================ */

const { useState, useEffect } = React;

/* Sample data */
const PROJECTS = [
  { id: "pg-rename", title: "Postgres rename CLI", blurb: "A small Node tool for batch-renaming database columns safely with a dry-run preview.", tags: ["node", "postgres", "cli"], featured: true, year: "2026" },
  { id: "toolbar", title: "Toolbar.dev", blurb: "A keyboard-first launcher for macOS built with Tauri and Rust.", tags: ["rust", "tauri"], featured: true, year: "2025" },
  { id: "askmd", title: "askmd", blurb: "Ask questions about a folder of markdown notes from the command line.", tags: ["python", "llm"], year: "2025" },
  { id: "fp-postal", title: "fp-postal", blurb: "Functional address parser for Canadian postal data.", tags: ["typescript"], year: "2024" },
  { id: "rsync-watch", title: "rsync-watch", blurb: "rsync wrapper that re-syncs on file change. Tiny, no deps.", tags: ["shell"], year: "2024" },
  { id: "hello-htmx", title: "hello-htmx", blurb: "A tutorial repo for HTMX with Laravel — small, deliberate examples.", tags: ["php", "htmx"], year: "2023" },
];

const RESUME = {
  experience: [
    { role: "Senior Software Engineer", org: "Independent", period: "2023 — present", bullets: ["Web apps for SMBs across Canada and Europe.", "AI tooling: RAG over private docs, internal copilots.", "Stack: TypeScript, Postgres, React, Laravel, Python."] },
    { role: "Fullstack Engineer", org: "Previous role", period: "2020 — 2023", bullets: ["Shipped customer-facing dashboards.", "Mentored juniors on Postgres and SQL fundamentals."] },
  ],
  skills: ["TypeScript", "React", "Postgres", "Laravel", "Python", "Rust", "Tauri", "Docker", "AWS"],
};

/* ---------- Landing ---------- */
function LandingPage({ go }) {
  const featured = PROJECTS.filter(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured).slice(0, 3);
  return (
    <>
      <Hero
        eyebrow="FULLSTACK · AI · OTTAWA"
        title="I build full-stack web apps and AI tools."
        lede="Software engineer focused on practical interfaces, fast backends, and the occasional ML side-quest. Available for new work in 2026.">
        <Button onClick={() => go("projects")}>View projects</Button>
        <Button variant="secondary" onClick={() => go("contact")}>Get in touch</Button>
      </Hero>

      <Section>
        <Container>
          <Row gap={4} style={{ justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--sp-5)" }}>
            <h2 style={{ margin: 0 }}>Featured work</h2>
            <a href="#projects" onClick={(e) => { e.preventDefault(); go("projects"); }}>All projects →</a>
          </Row>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--sp-4)" }}>
            {featured.map(p => (
              <FeaturedCard key={p.id}>
                <Eyebrow style={{ marginBottom: 6 }}>FEATURED · {p.year}</Eyebrow>
                <h4 style={{ margin: "0 0 var(--sp-2)" }}>{p.title}</h4>
                <p style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)", margin: "0 0 var(--sp-3)" }}>{p.blurb}</p>
                <Row gap={2}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</Row>
              </FeaturedCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 style={{ marginBottom: "var(--sp-5)" }}>Recent</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--sp-4)" }}>
            {rest.map(p => (
              <Card key={p.id}>
                <Eyebrow style={{ marginBottom: 6 }}>PROJECT · {p.year}</Eyebrow>
                <h4 style={{ margin: "0 0 var(--sp-2)", fontSize: "var(--fs-md)" }}>{p.title}</h4>
                <p style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)", margin: "0 0 var(--sp-3)" }}>{p.blurb}</p>
                <Row gap={2}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</Row>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-5)", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: "0 0 var(--sp-2)" }}>Have a project in mind?</h3>
              <p style={{ margin: 0, color: "var(--fg-muted)" }}>I take on a small number of new clients each quarter.</p>
            </div>
            <Button onClick={() => go("contact")}>Start a conversation</Button>
          </Card>
        </Container>
      </Section>
    </>
  );
}

/* ---------- Projects ---------- */
function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const tabs = [
    { id: "all", label: "All" },
    { id: "node", label: "Node" },
    { id: "python", label: "Python" },
    { id: "rust", label: "Rust" },
  ];
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));
  return (
    <>
      <Section>
        <Container>
          <Eyebrow>PROJECTS · 2023 — PRESENT</Eyebrow>
          <h1 style={{ marginTop: "var(--sp-2)" }}>Things I've built.</h1>
          <p className="lede" style={{ maxWidth: 540 }}>A mix of CLI tools, web apps, and small experiments. Each one solves a problem I had myself.</p>

          <div style={{ marginTop: "var(--sp-5)" }}>
            <Tabs
              items={tabs.map(t => ({ ...t, content: null }))}
              value={filter}
              onChange={setFilter}
            />
          </div>

          <div style={{ marginTop: "var(--sp-5)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--sp-4)" }}>
            {filtered.map(p => (
              <Card key={p.id} featured={p.featured}>
                <Eyebrow style={{ marginBottom: 6 }}>{p.featured ? "FEATURED · " : ""}{p.year}</Eyebrow>
                <h4 style={{ margin: "0 0 var(--sp-2)" }}>{p.title}</h4>
                <p style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)", margin: "0 0 var(--sp-3)" }}>{p.blurb}</p>
                <Row gap={2}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</Row>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Card style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--fg-subtle)" }}>
                No projects in this category yet.
              </Card>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ---------- About ---------- */
function AboutPage() {
  const skillTags = RESUME.skills.map(s => <Tag key={s}>{s}</Tag>);
  return (
    <>
      <Section>
        <Container size="md">
          <Eyebrow>ABOUT</Eyebrow>
          <h1 style={{ marginTop: "var(--sp-2)" }}>Salim Dellali.</h1>
          <p className="lede">I'm a fullstack engineer working at the intersection of web and AI. I build small, useful tools and the occasional long blog post.</p>

          <Banner tone="info" title="Available in 2026.">Taking on a small number of new clients per quarter.</Banner>

          <h3 style={{ marginTop: "var(--sp-7)" }}>Experience</h3>
          {RESUME.experience.map((job, i) => (
            <Card key={i} style={{ marginBottom: "var(--sp-3)" }}>
              <Row gap={3} style={{ justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "var(--fs-md)" }}>{job.role}</h4>
                  <div style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>{job.org}</div>
                </div>
                <div className="eyebrow" style={{ marginTop: 0 }}>{job.period}</div>
              </Row>
              <ul style={{ margin: "var(--sp-3) 0 0", paddingLeft: "var(--sp-5)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
                {job.bullets.map((b, j) => <li key={j} style={{ marginBottom: 4 }}>{b}</li>)}
              </ul>
            </Card>
          ))}

          <h3 style={{ marginTop: "var(--sp-7)" }}>Skills</h3>
          <Row gap={2} style={{ marginBottom: "var(--sp-5)" }}>{skillTags}</Row>

          <h3 style={{ marginTop: "var(--sp-7)" }}>FAQ</h3>
          <Accordion items={[
            { id: "stack", title: "What's your stack?", content: <>TypeScript, React, Postgres, Laravel. Sometimes Rust for systems work and Python for ML.</> },
            { id: "remote", title: "Do you work remotely?", content: <>Yes — based in Ottawa, comfortable with async-first remote teams.</> },
            { id: "rates", title: "How do you bill?", content: <>Weekly retainer for ongoing work, fixed fee for scoped projects. <a href="#contact">Get in touch</a> for details.</> },
          ]} />
        </Container>
      </Section>
    </>
  );
}

/* ---------- Contact ---------- */
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", projectType: "Web app", budget: "5–15k", message: "", subscribe: true });
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <Section>
      <Container size="md">
        <Eyebrow>CONTACT</Eyebrow>
        <h1 style={{ marginTop: "var(--sp-2)" }}>Get in touch.</h1>
        <p className="lede">Tell me about the project. I usually reply within a day.</p>

        {submitted && <Banner tone="success" title="Message sent.">I'll be in touch shortly.</Banner>}

        <Card style={{ marginTop: "var(--sp-4)" }}>
          <form onSubmit={submit}>
            <Stack gap={4}>
              <Row gap={3} style={{ alignItems: "stretch" }} wrap>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Field label="Name" htmlFor="name">
                    <Input id="name" required value={form.name} onChange={upd("name")} placeholder="Your name" />
                  </Field>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Field label="Email" htmlFor="email" help="Used to reply, never shared.">
                    <Input id="email" type="email" required value={form.email} onChange={upd("email")} placeholder="you@example.com" />
                  </Field>
                </div>
              </Row>
              <Row gap={3} style={{ alignItems: "stretch" }} wrap>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Field label="Project type" htmlFor="ptype">
                    <Select id="ptype" value={form.projectType} onChange={upd("projectType")}>
                      <option>Marketing site</option>
                      <option>Web app</option>
                      <option>API / backend</option>
                      <option>AI integration</option>
                      <option>Other</option>
                    </Select>
                  </Field>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Field label="Budget" htmlFor="budget">
                    <Select id="budget" value={form.budget} onChange={upd("budget")}>
                      <option>Under 5k</option>
                      <option>5–15k</option>
                      <option>15–40k</option>
                      <option>40k+</option>
                    </Select>
                  </Field>
                </div>
              </Row>
              <Field label="Message" htmlFor="msg">
                <Textarea id="msg" rows={5} value={form.message} onChange={upd("message")} placeholder="Tell me about the project, timeline, anything relevant…" />
              </Field>
              <Checkbox label="Send me occasional updates (no spam)." checked={form.subscribe} onChange={upd("subscribe")} />
              <Row gap={3} style={{ justifyContent: "flex-end", marginTop: "var(--sp-2)" }}>
                <Button type="submit">Send message</Button>
              </Row>
            </Stack>
          </form>
        </Card>

        <div style={{ marginTop: "var(--sp-5)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
          Or email directly: <a href="mailto:hello@dellali.dev">hello@dellali.dev</a>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- App shell ---------- */
function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace("#", "") || "home");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (id) => { window.location.hash = id; };

  const links = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  let body;
  if (route === "projects") body = <ProjectsPage />;
  else if (route === "about") body = <AboutPage />;
  else if (route === "contact") body = <ContactPage />;
  else body = <LandingPage go={go} />;

  return (
    <ThemeProvider>
      <Nav brand="Salim Dellali" links={links} current={route} onNavigate={go}
           cta={{ children: "Hire me", onClick: () => go("contact") }} />
      <main>{body}</main>
      <Footer brand="Salim Dellali" tag="Software Engineer · Fullstack · AI"
        columns={[
          { label: "GitHub", href: "https://github.com" },
          { label: "LinkedIn", href: "https://linkedin.com" },
          { label: "Email", href: "mailto:hello@dellali.dev" },
        ]} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
