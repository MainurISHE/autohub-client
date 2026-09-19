# AutoHub Client 🚗

Frontend application for **AutoHub**, a full-stack car marketplace where users can browse, search, filter, publish and manage cars, save favorites and communicate with other users in real time.

## 🌐 Production

- **Frontend:** https://autohubdma.vercel.app
- **Backend:** https://autohub-server-2inc.onrender.com

## ✨ Features

### 🚗 Car Marketplace

- Browse available cars
- View detailed car pages
- Create car listings
- Edit own listings
- Delete own listings
- Upload multiple images
- Responsive car cards
- Pagination

### 🔎 Search & Filters

- Search by car model/title
- Search by brand
- Multi-word search
- Brand filter
- Price range
- Fuel type
- Transmission
- Drive type
- Body type
- Color
- Status
- Sorting
- Pagination
- Reset filters

Search examples:

```text
BMW
BMW M5
BMW M5 F90
Mercedes C63
Toyota Camry
```

### ❤️ Favorites

- Add cars to favorites
- Remove cars from favorites
- Dedicated favorites page

### 🔐 Authentication

- Registration
- Login
- Logout
- Protected routes
- User profile
- Profile editing
- Avatar upload
- Password change
- Automatic access token refresh

### 💬 Realtime Chat

- Conversations list
- Realtime messaging
- Message history
- Unread message count
- Conversation selection
- Mobile chat navigation
- Swipe-to-back interaction
- Socket.IO authentication

### 📱 Responsive UI

The application is designed for:

- Desktop
- Tablet
- Mobile

The messages interface includes a dedicated mobile layout and navigation behavior.

## 🛠 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack Query**
- **Zustand**
- **Axios**
- **React Hook Form**
- **Zod**
- **Socket.IO Client**
- **Lucide React**

## 🏗 Architecture

```text
src/
├── app/
│   ├── (auth)/
│   ├── (main)/
│   ├── (protected)/
│   └── layout.tsx
│
├── components/
│   └── ui/
│
├── entities/
│   ├── car/
│   ├── brand/
│   ├── message/
│   ├── conversation/
│   └── user/
│
├── features/
│   ├── auth/
│   ├── car-form/
│   └── ...
│
├── widgets/
│   ├── header/
│   ├── footer/
│   ├── cars/
│   └── ...
│
└── shared/
    ├── api/
    ├── ui/
    └── ...
```

The application separates:

- Pages and layouts
- Entities
- Features
- Widgets
- Shared UI
- API infrastructure

## 🔄 Data Fetching

Server data is handled with **TanStack Query**.

Example:

```ts
useQuery({
  queryKey: ["brands"],
  queryFn: brandService.getAll,
});
```

Mutations are used for login, registration, car management, image uploads, favorites and messages.

## 🔐 Authentication

The Axios API client automatically attaches the access token:

```http
Authorization: Bearer <access_token>
```

When an API request returns `401`, the client automatically attempts to refresh the access token using the HTTP-only refresh token cookie.

The original request is then retried with the new access token.

## 🌐 API Client

Production API:

```text
https://autohub-server-2inc.onrender.com/api
```

Example:

```ts
apiClient.get("/cars");
```

## 💬 WebSocket

Realtime messaging uses Socket.IO.

The client connects using the current access token:

```ts
socket.auth = {
  token: accessToken,
};

socket.connect();
```

Messages are sent with:

```ts
socket.emit("sendMessage", {
  conversationId,
  content,
});
```

## 📝 Forms & Validation

Forms use:

- React Hook Form
- Zod

```text
Create Car
   │
   ▼
React Hook Form
   │
   ▼
Zod validation
   │
   ▼
API request
   │
   ▼
NestJS backend
```

## 🖼 Image Uploads

Images are uploaded through the backend and stored in Cloudinary.

The frontend supports:

- Multiple car images
- Image previews
- Image deletion
- Upload progress states
- Image validation
- User avatar uploads

## ⚙️ Environment Variables

Create `.env.local`.

For local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:

```env
NEXT_PUBLIC_API_URL=https://autohub-server-2inc.onrender.com/api
```

Do not commit `.env.local`.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MainurISHE/autohub-client.git
cd autohub-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📦 Build

```bash
npm run build
npm run start
```

## 🚀 Deployment

The frontend is deployed on **Vercel**.

```text
User
 │
 ▼
Vercel
 │
 │ REST API
 │
 ▼
Render
 │
 └── NestJS API
      │
      ├── Neon PostgreSQL
      └── Cloudinary

Vercel
 │
 └── Socket.IO
       │
       ▼
     Render
```

## 🔗 Related Repository

Backend:

https://github.com/MainurISHE/autohub-server

## 📸 Main Sections

The application includes:

- Home page
- Car catalog
- Car details
- Create car
- Edit car
- Favorites
- Profile
- Messages
- Authentication pages

## 📄 License

This project was created as a portfolio and educational project.
