# Changelog

## 2026-07-13

### Positionierung und Inhalte

- Hero auf „Digitale Produkte ohne Agenturleerlauf“ fokussiert und Zielgruppe, Angebot, Differenzierung sowie nächste Aktion im ersten sichtbaren Bereich zusammengeführt.
- Zielgruppenprobleme konkretisiert: veraltete Auftritte, Performance, mobile Nutzung, unklare Angebote, lange Änderungsschleifen, Alttechnik und fehlende Verbindung von Content und Website.
- Experience, Build, Attention und Care & Growth in vier klar abgegrenzte Leistungsbereiche überführt.
- Arbeitsweise als fünfstufigen Prozess mit frühen Prototypen, klaren Sprints, direkter Kommunikation und messbarer Qualität ausgearbeitet.
- KI als Werkzeug für Recherche, Konzeption, Content, Entwicklung, Testing und Qualitätssicherung eingeordnet; menschliche Verantwortung ausdrücklich beibehalten.
- Founder-, CTO-, Software-, SaaS-, Journalismus-, Creator- und UX-Erfahrung vollständig und ohne erfundene Namen oder Referenzen integriert.
- Einheitlichen primären CTA „Projekt besprechen“ im Hero, nach Leistungen, nach Arbeitsweise, nach dem Team und im Footer eingesetzt.

### Eleventy und Erweiterbarkeit

- Zentrale Marken- und Navigationsdaten nach `src/_data/site.json` ausgelagert.
- Leistungen, Prozesse, Team, Angebote und FAQ nach `src/_data/home.json` ausgelagert.
- Wiederverwendbare Nunjucks-Komponenten für Header, Footer und CTA-Bänder ergänzt.
- Saubere URLs für Impressum, Datenschutz und Danke-Seite eingeführt; alte `.html`-URLs werden auf Netlify weitergeleitet.

### Formulare, SEO und technische Basis

- Barrierearm beschriftetes Netlify-Formular mit Pflichtfeldern, Honeypot, Datenschutzeinwilligung und Danke-Seite ergänzt.
- Datenschutz-Platzhalter an die tatsächliche Formularverarbeitung angepasst.
- Canonical URLs, Open Graph, Twitter Cards und JSON-LD für `ProfessionalService` ergänzt.
- Dynamische XML-Sitemap und `robots.txt` ergänzt.
- Sicherheits- und Asset-Cache-Header in `netlify.toml` ergänzt.
- Produktions-Build bereinigt `_site/` vor jeder Generierung, damit keine veralteten Dateien erhalten bleiben.

### Performance und Accessibility

- Hero-Bild zusätzlich als WebP erzeugt und mit festen Abmessungen, `picture`, asynchronem Decoding und priorisiertem Laden eingebunden.
- JavaScript auf Mobile-Navigation und Headerzustand begrenzt; Escape-Taste, Fokus-Rückgabe und dynamische Menübeschriftung ergänzt.
- Sichtbare Fokuszustände, mindestens 44 Pixel große Navigationsziele, semantische Landmark-Namen und responsive Formularfelder ergänzt.
- Generiertes HTML, JSON-LD, Sitemap, interne Sprungziele, Formularfelder und lokale HTTP-Ziele automatisiert geprüft.
