# TestimonialApp

Collect, manage, and display customer testimonials for your business.

---

## What it does

| Feature | URL |
|---|---|
| Business dashboard (login/register) | `/login` or `/register` |
| Customer review form | `/collect/your-business-slug` |
| Public wall of testimonials | `/wall/your-business-slug` |
| Embeddable widget | `<script src="…/widget/your-business-slug.js">` |

---

## Requirements

- [Node.js](https://nodejs.org) version 18 or newer
- No database install needed — it uses a local file automatically

---

## Setup (first time)

Open a terminal, go to this folder, then run:

```bash
npm run install:all
```

This installs everything for both the server and the front-end.

---

## Running in development

```bash
npm run dev
```

This starts:
- **API server** on `http://localhost:3001`
- **Front-end** on `http://localhost:5173` ← open this in your browser

---

## Running in production (single server)

1. Build the front-end:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open `http://localhost:3001` in your browser.

To change the port, set the `PORT` environment variable:
```bash
PORT=8080 npm start
```

---

## Environment variables (optional)

Create a `.env` file in the root folder:

```
JWT_SECRET=replace-with-a-long-random-string
PORT=3001
```

> **Important:** Change `JWT_SECRET` before deploying publicly. You can generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

## File storage

- Database: `data/testimonials.db` (created automatically)
- Uploaded screenshots: `uploads/` folder

Both are excluded from git. Back them up if you care about the data.

---

## Plans & monetization

Each business account has a `plan` field (`free` or `paid`).

- **Free:** shows the 3 most recent approved testimonials publicly, displays "Powered by TestimonialApp" badge
- **Paid:** unlimited testimonials, no badge

To manually upgrade an account, open the SQLite database and run:
```sql
UPDATE businesses SET plan = 'paid' WHERE email = 'customer@example.com';
```

---

## Embedding the widget

After logging in, copy the script tag from the dashboard and paste it into any HTML page:

```html
<script src="https://your-domain.com/widget/your-slug.js"></script>
```

By default the widget renders in the element it finds with `data-testimonial-widget="your-slug"` or `id="testimonial-widget"`. If neither exists, it appends to `<body>`.

Custom placement:
```html
<div data-testimonial-widget="your-slug"></div>
<script src="https://your-domain.com/widget/your-slug.js"></script>
```

---

## Project structure

```
testimonial-app/
├── server/
│   ├── index.js          # Express entry point
│   ├── db.js             # SQLite setup
│   ├── middleware/
│   │   └── auth.js       # JWT middleware
│   └── routes/
│       ├── auth.js       # Register / login
│       ├── dashboard.js  # Protected dashboard API
│       ├── collect.js    # Public submission endpoint
│       ├── wall.js       # Public wall API
│       └── widget.js     # Embeddable JS widget
├── client/               # React + Vite + Tailwind front-end
├── uploads/              # Uploaded screenshot images
├── data/                 # SQLite database (auto-created)
└── package.json
```
