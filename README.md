# Wedding Invitations Web App

Digital invitations for weddings. Work in progress — planning phase.

Domain: wedding.naoufalelouahabi.com

## MVP Plan

### Stack

- Frontend: React / Next.js
- Backend: Flask
- Database: PostgreSQL
- ORM: SQLAlchemy
- Auth: simple admin/couple authentication
- Deployment: VPS

Core product: digital wedding invitation + RSVP tracking backed by PostgreSQL. No guest accounts.

### Architecture

```
                    YOU
             Service Provider
                    │
                    ▼
             Admin Dashboard
                    │
                    ▼
              PostgreSQL
             /           \
            /             \
           ▼               ▼
    Wedding data       RSVP responses
                            │
                    ┌───────┴────────┐
                    ▼                ▼
                   YES              NO
```

### The Flow

1. **You create the wedding** in the admin dashboard (couple name, date, location, template). The backend saves it and generates a public URL from the slug (e.g. `https://wedding.naoufalelouahabi.com/i/ahmed-sara`).
2. **Groom sends that link** via WhatsApp, Messenger, SMS, etc. The app does not handle sending.
3. **Guest opens the link**, sees the invitation, enters their name and answers YES/NO.
4. **Response is stored in PostgreSQL.**
5. **Groom/service provider sees results** in the dashboard: YES/NO counts and a guest list.

### Templates

Templates are pre-built designs. Each wedding selects one and renders it with its own data — no separate site per wedding.

```
                 TEMPLATE
                    │
                    ▼
        ┌─────────────────────┐
        │ Wedding Data        │
        │ Ahmed & Sara        │
        │ 20 June 2027        │
        │ Tangier             │
        └──────────┬──────────┘
                   │
                   ▼
            Render Template
                   │
                   ▼
          /i/ahmed-sara
```

Template contains placeholders like `{wedding.coupleName}`, `{wedding.date}`, `{wedding.location}` — never hard-coded customer data. You can offer many templates (Moroccan Luxury, Minimal White, Floral, etc.) while the backend stays the same.

### Database Model

```
templates
────────────────────────
id
name
slug

weddings
────────────────────────
id
template_id
couple_name
date
location
slug

responses
────────────────────────
id
wedding_id
guest_name
response
created_at
```

```
Template #2
     │
     ├── Wedding #17 → Ahmed & Sara
     │                     ├── Mohamed → YES
     │                     ├── Fatima → NO
     │                     └── Yassine → YES
     │
     └── Wedding #18 → Youssef & Salma
                           ├── Omar → YES
                           └── Imane → NO
```

### Business Model

The customer is buying: template + customization + unique invitation link + RSVP tracking. Not a custom website per wedding.
