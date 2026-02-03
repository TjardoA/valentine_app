# Valentine App (React + Tailwind + Express)

Playful Valentine experience with a sender form, animated Valentine page, and YES tracking — alles nu in de root (geen aparte frontend/backend mappen).

## Installatie & run
```bash
npm install
cp .env.example .env   # vul SMTP + URLs
npm run server         # start API (poort 4000)
npm run dev            # start Vite frontend (poort 5173)
```
Open http://localhost:5173. Backend draait op poort 4000.

## Belangrijke env vars (.env)
- PORT, FRONTEND_URL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- VITE_API_URL=http://localhost:4000

## Wat zit waar
- `server.js`, `mailer.js`, `data.js` – Express API, Nodemailer, in-memory opslag
- `src/` – React app (Vite + Tailwind): `pages/SenderPage.jsx`, `pages/ValentinePage.jsx`, `components/YesNoButtons.jsx`, `components/SuccessConfetti.jsx`
- `tailwind.config.js`, `postcss.config.js`, `vite.config.js`, `index.html`

## Notes
- Storage is in-memory; herstart wist invites/responses.
- YES triggert confetti, optionele sound, en e-mail naar afzender met timestamp.
- Tailwind-only styling met pastel gradient, afgeronde knoppen, speelse animaties.
