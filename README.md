# 💊 Zanith Prime Pharmacare - Admin Dashboard
### **U Devs Frontend Internship Task**
**Assigned By:** Usama Aslam (CEO & Founder, U Devs)  
**Submission Date:** February 27, 2026



## 🚀 Project Overview
Zanith Prime is a professional **Pharmacy Inventory Management System** built with **React.js**. It provides a centralized interface for pharmacists to track stock levels, manage medicine categories, and monitor critical inventory status using browser **Local Storage**.



## ✨ Key Features & Business Logic
* **📊 Interactive Dashboard:** Real-time statistics showing total inventory, category-wise distribution, and equipment counts.
* **⚠️ Low Stock Alert System:** A specialized feature that identifies medicines with fewer than 5 units remaining, prompting immediate reorder.
* **📦 Full CRUD Operations:** * **Create:** Register new medicines with validation.
    * **Read:** Searchable and filterable product gallery.
    * **Update:** Dynamic form pre-filling for editing existing stock.
    * **Delete:** Secure removal of inventory items with confirmation.
* **🔍 Advanced Filtering:** Search by medicine name or filter by category (Tablets, Syrups, Equipment, etc.).
* **🖼️ Live Image Preview:** Optional image URL support with a real-time preview during the "Add/Edit" process.
* **💾 Data Persistence:** Custom utility functions to ensure data survives page refreshes and browser restarts.



## 🛠️ Technology Stack
* **Frontend:** React.js (Vite)
* **Styling:** Bootstrap 5 (Responsive Layout)
* **Routing:** React Router DOM v6
* **Icons:** FontAwesome / Bootstrap Icons
* **Storage:** Browser Local Storage API



## 📂 Folder Structure
Following the **U Devs Professional Guidelines**, the project is organized into modular folders:


src/
 ├── components/    # Reusable UI (Sidebar, Navbar)
 ├── pages/         # Dashboard, Products, AddEditProduct
 ├── utils/         # localStorage.js (Data Logic)
 ├── App.jsx        # Routing & Main Layout
 └── main.jsx       # Entry Point & Storage Initialization