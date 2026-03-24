<p align="center">
  <img src="https://content.umami.is/website/images/umami-logo.png" alt="Umami Logo" width="100">
</p>

<h1 align="center">Umami</h1>

<p align="center">
  <i>Umami is a simple, fast, privacy-focused web analytics platform.</i>
</p>

---

## 📋 Overview

This is a customized build of Umami. The system has been simplified to a two-role model:

- **Admin**: creates and manages all websites, manages user accounts.
- **User**: can only view and export analytics statistics for the websites configured by the admin.

### What was removed from the original Umami

- **Links** (link tracking / short links)
- **Pixels** (pixel tracking)
- **Teams** (multi-team management and team roles)
- **Website transfer** between users/teams

---

## 🚀 Getting Started

---

## 🛠 Installing from Source

### Requirements

- A server with Node.js version 18.18+.
- A PostgreSQL database version v12.14+.

### Get the source code and install packages

```bash
git clone <this-repo>
cd umami
pnpm install
```

### Configure Umami

Create an `.env` file with the following:

```bash
DATABASE_URL=connection-url
```

The connection URL format:

```bash
postgresql://username:mypassword@localhost:5432/mydb
```

### Build the Application

```bash
pnpm run build
```

The build step will create tables in your database if you are installing for the first time. It will also create a login user with username **admin** and password **umami**.

### Start the Application

```bash
pnpm run start
```

By default, this will launch the application on `http://localhost:3000`. You will need to either [proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) requests from your web server or change the [port](https://nextjs.org/docs/api-reference/cli#production) to serve the application directly.

---

## 🐳 Installing with Docker

```bash
docker compose up -d
```

---

## 🔄 Getting Updates

```bash
git pull
pnpm install
pnpm build
```

---

## 👥 User Management

### Roles

| Role  | Capabilities |
|-------|-------------|
| `admin` | Create / edit / delete websites; manage all users |
| `user`  | View and export analytics for all configured websites (read-only) |

### Adding users

The admin can create new user accounts from the **Admin → Users** panel. All users automatically have read-only access to every website.

---

## 🔒 Security Summary

- Users cannot create, update, or delete websites.
- Only the admin can manage website settings.
- All authenticated users can view analytics for any website.
