# Product Manager — React SPA

A React single-page application that consumes the **Products REST API** and provides a full CRUD UI for managing products.

Built with functional components, React hooks, React Router, and Axios.

## Features

- **List products** with category, stock, and price filters
- **View product details** including timestamps
- **Create** new products with form validation
- **Update** existing products
- **Delete** products with confirmation dialog
- **Loading states** and **error handling** with retry support

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- The Products REST API running at `http://localhost:3000` (see parent `../README.md`)
- MongoDB connected to the API

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment (optional)**

   ```bash
   cp .env.example .env
   ```

   Leave `VITE_API_URL` empty to use the Vite dev-server proxy (recommended for local development).

3. **Start the API** (from the parent directory)

   ```bash
   cd ..
   npm run dev
   ```

4. **Start the React app**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start Vite dev server          |
| `npm run build` | Production build               |
| `npm run preview` | Preview production build     |
| `npm run lint`  | Run Oxlint                     |

## Routes

| Path                    | Page            |
|-------------------------|-----------------|
| `/`                     | Product list    |
| `/products/new`         | Create product  |
| `/products/:id`         | Product detail  |
| `/products/:id/edit`    | Edit product    |

## API Integration

All HTTP calls go through `src/api/products.js` using Axios:

| Action  | Method | Endpoint              |
|---------|--------|-----------------------|
| List    | GET    | `/api/products`       |
| Read    | GET    | `/api/products/:id`   |
| Create  | POST   | `/api/products`       |
| Update  | PUT    | `/api/products/:id`   |
| Delete  | DELETE | `/api/products/:id`   |

During development, Vite proxies `/api` and `/health` to `http://localhost:3000` (see `vite.config.js`).

## Project Structure

```
src/
├── api/
│   ├── client.js          # Axios instance & error helpers
│   └── products.js        # CRUD API functions
├── components/
│   ├── Layout.jsx         # App shell & navigation
│   ├── ProductCard.jsx    # Product list card
│   ├── ProductForm.jsx    # Shared create/edit form
│   ├── ProductFilters.jsx # List filters
│   ├── LoadingSpinner.jsx
│   ├── ErrorAlert.jsx
│   └── ConfirmDialog.jsx
├── pages/
│   ├── ProductList.jsx
│   ├── ProductDetail.jsx
│   ├── CreateProduct.jsx
│   └── EditProduct.jsx
├── constants/
│   └── categories.js
├── App.jsx                # Router setup
└── main.jsx
```

## Screenshots

See the `screenshots/` folder for live UI captures:

- `01-product-list.png` — Product list with filters
- `02-product-detail.png` — Product detail view
- `03-create-product.png` — Create product form
- `04-edit-product.png` — Edit product form

## License

MIT
