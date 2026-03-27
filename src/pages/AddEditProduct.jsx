import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProducts, saveProducts } from '../utils/localStorage';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({ 
    name: '', 
    price: '', 
    category: 'Tablets', 
    quantity: '', 
    image: '' 
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const products = getProducts();
      const existing = products.find(p => p.id === parseInt(id));
      if (existing) setProduct(existing);
    }
  }, [id]);

  // PROFESSIONAL VALIDATION LOGIC
  const validate = () => {
    let tempErrors = {};
    if (!product.name.trim()) tempErrors.name = "Medicine name is required";
    if (product.price <= 0) tempErrors.price = "Price must be greater than 0";
    if (product.quantity < 0) tempErrors.quantity = "Stock cannot be negative";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return; // Stop if validation fails

    let products = getProducts();
    
    const finalProduct = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
      id: id ? parseInt(id) : Date.now()
    };

    if (id) {
      products = products.map(p => p.id === parseInt(id) ? finalProduct : p);
    } else {
      products.push(finalProduct);
    }

    saveProducts(products);
    alert(id ? "✅ Inventory Updated!" : "✅ Medicine Registered!");
    navigate("/products");
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '650px', borderRadius: '15px' }}>
        
        <div style={{ 
          background: id ? '#87CEEB' : '#2D6A4F', 
          padding: '25px', 
          borderTopLeftRadius: '15px', 
          borderTopRightRadius: '15px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 className="mb-0 fw-bold">{id ? "Edit Stock Details" : "Add New Medicine"}</h3>
          <small>{id ? "ID: " + id : "Create a new entry in Zanith Prime Database"}</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Name */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-bold">Medicine Name</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Panadol 500mg"
                  value={product.name} 
                  onChange={(e) => setProduct({...product, name: e.target.value})} 
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              {/* Price */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Price (PKR)</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  value={product.price} 
                  onChange={(e) => setProduct({...product, price: e.target.value})} 
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>

              {/* Quantity */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Current Stock</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                  value={product.quantity} 
                  onChange={(e) => setProduct({...product, quantity: e.target.value})} 
                />
                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
              </div>

              {/* Category */}
              <div className="col-md-12 mb-3">
                <label className="form-label fw-bold">Category</label>
                <select 
                  className="form-select" 
                  value={product.category} 
                  onChange={(e) => setProduct({...product, category: e.target.value})}
                >
                  <option>Tablets</option>
                  <option>Syrups</option>
                  <option>Medical Equipment</option>
                  <option>Health & Safety</option>
                </select>
              </div>

              {/* Image */}
              <div className="col-md-12 mb-4">
                <label className="form-label fw-bold">Product Image URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="https://example.com/image.jpg"
                  value={product.image} 
                  onChange={(e) => setProduct({...product, image: e.target.value})} 
                />
                {product.image && (
                  <div className="mt-3 text-center bg-light p-2 rounded">
                    <img src={product.image} alt="Preview" style={{ maxHeight: '100px', borderRadius: '5px' }} />
                    <p className="small text-muted mt-1">Live Preview</p>
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-success flex-grow-1 fw-bold shadow-sm">
                {id ? "Update Item" : "Save Item"}
              </button>
              <Link to="/products" className="btn btn-outline-secondary flex-grow-1 shadow-sm">
                Discard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditProduct;