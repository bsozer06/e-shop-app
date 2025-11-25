# ⚛️ e-Shop/TS Project - Development Instructions

This file defines the project's architecture, technology stack, and all core requirements. Please ensure all code suggestions adhere strictly to these instructions.

## 🎯 Project Goal

To build a modern, type-safe, and performance-driven E-commerce Product Catalog and Cart application using **React** and **TypeScript**, showcasing advanced frontend engineering skills.

## 🛠️ Technology Stack and Constraints

1.  **Framework:** React (Strictly Function Components and Hooks).
2.  **Language:** TypeScript (TSX). Defining **Interfaces** or **Types** is mandatory for all Component Props, Context Values, State, and API response shapes.
3.  **Styling:** Tailwind CSS or Styled Components (A modern, component-based CSS solution is required).
4.  **Routing:** React Router DOM (v6+).
5.  **State Management:** React Context API or Zustand (A lightweight solution is preferred for global state like Auth and Cart).
6.  **Data Source:** DummyJSON API (`/products`, `/auth/login`, etc.).

## 📁 File Structure and Architecture

Please organize the code following an **Atomic Design** and feature-separated approach within the `src/` directory:

* `src/types/`: Centralized location for all TypeScript Interface/Type definitions.
* `src/api/`: All HTTP request functions and data fetching logic (using Axios or Fetch).
* `src/hooks/`: All custom Hooks (`useFetch`, `useAuth`, `useProducts`) for logic abstraction.
* `src/context/`: Central Context/Store for Auth and Cart global state.
* `src/pages/`: Main page components called by the Router (`HomePage.tsx`, `ProductDetailPage.tsx`).
* `src/components/atoms`, `molecules`, `organisms`: Reusable components hierarchy.

## 🔑 Core Features and Development Focus

### 1. Product Catalog and Filtering (`/`)

* **Data Fetching:** Create a `useProducts` custom hook to handle data fetching from the `/products` endpoint.
* **Search:** Implement a **debounced** search feature on product names to prevent excessive API calls.
* **Filtering:** Implement multi-criteria filtering based on **Category** and **Price Range** (using a slider or min/max inputs).
* **Display:** Products must be listed using responsive `ProductCard` molecules.

### 2. Product Detail and Cart

* **Detail View:** The detail page (`/product/:id`) must include a Carousel/Gallery component for product images.
* **Cart Management:** Implement Add/Remove/Update quantity logic managed within a **Cart Context/Store**.
* **User Feedback:** Use a **Toast/Snackbar** notification system to confirm actions (e.g., "Product added to cart").

### 3. Dummy Authentication (Mandatory)

* **Login Page (`/login`):** A form that sends a POST request to the DummyJSON `/auth/login` endpoint.
* **Token Management:** On successful login, the returned **JWT token** must be stored in **LocalStorage/SessionStorage** (simulating persistence).
* **Protected Routes:** Sensitive routes like the Cart Page (`/cart`) must be wrapped with a **`<ProtectedRoute>`** component that redirects unauthenticated users to `/login`.
* **Logout:** Implement a "Logout" function in the Header that clears the stored token and authentication state.

## ✨ Quality and Performance Goals

* All code must be clean, readable, and adhere to the **DRY** principle.
* Implement proper **Loading States** (e.g., Skeleton Screens) and **Error Handling** during data fetching.
* Use **Code Splitting** via `React.lazy` and `Suspense` for large page components (e.g., `CartPage`) to improve initial load time.

---

**Please start by creating the necessary TypeScript interfaces for `src/types/product.ts` and `src/types/auth.ts` based on the DummyJSON API structure.**