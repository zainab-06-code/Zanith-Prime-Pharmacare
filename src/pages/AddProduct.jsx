import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProducts, saveProducts } from "../utils/localStorage";

function AddProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Tablets",
    quantity: "",
    image: "" // Added image state
  });

  // 1. LOAD DATA: Use the utility function instead of raw localStorage
  useEffect(() => {
    if (id) {
      const products = getProducts();
      const productToEdit = products.find((p) => p.id === parseInt(id));
      if (productToEdit) {
        setFormData(productToEdit);
      }
    }
  }, [id]);

  // 2. SUBMIT LOGIC: Handles both Add and Update
  const handleSubmit = (e) => {
    e.preventDefault();
    let products = getProducts();

    if (id) {
      // UPDATE: Find and replace the specific item
      products = products.map((p) => 
        p.id === parseInt(id) ? { ...formData, id: parseInt(id) } : p
      );
    } else {
      // CREATE: Generate a unique ID using timestamp
      const newProduct = { ...formData, id: Date.now() };
      products.push(newProduct);
    }

    saveProducts(products); // Use the utility to save
    alert(id ? "✅ Medicine Updated Successfully!" : "✅ New Medicine Added!");
    navigate("/products");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow border-0 p-4" style={{ borderRadius: "15px" }}>
        {/* Sky Blue & Green Branding Header */}
        <div className="text-center mb-4">
          <h3 style={{ color: "#2D6A4F", fontWeight: "bold" }}>
            {id ? "Edit Stock Entry" : "Register New Medicine"}
          </h3>
          <p className="text-muted small">Update your pharmacy inventory details below.</p>
        </div>

        

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label fw-bold">Medicine Name</label>
            <input 
              type="text" 
              className="form-control shadow-sm" 
              placeholder="e.g. Paracetamol"
              value={formData.name} 
              required
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <div className="row">
            {/* Price Field */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Price (PKR)</label>
              <input 
                type="number" 
                className="form-control shadow-sm" 
                placeholder="0.00"
                value={formData.price} 
                required
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
              />
            </div>
            {/* Quantity Field */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Stock Quantity</label>
              <input 
                type="number" 
                className="form-control shadow-sm" 
                placeholder="e.g. 50"
                value={formData.quantity} 
                required
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || ""})} 
              />
            </div>
          </div>

          {/* Category Field */}
          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
            <select 
              className="form-select shadow-sm" 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Tablets">Tablets</option>
              <option value="Syrups">Syrups</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="Health and Safety">Health and Safety</option>
            </select>
          </div>

          {/* Image URL Field (Crucial for looking professional) */}
          <div className="mb-4">
            <label className="form-label fw-bold">Image URL</label>
            <input 
              type="text" 
              className="form-control shadow-sm" 
              placeholder="Paste image link here"
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
            />
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn py-2 text-white shadow-sm" style={{ backgroundColor: "#4CAF50" }}>
              {id ? "Update Inventory" : "Save to Database"}
            </button>
            <Link to="/products" className="btn btn-light py-2 shadow-sm border">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;