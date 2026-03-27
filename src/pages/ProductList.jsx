import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  // Search and Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ marginLeft: '270px', padding: '30px' }}>
      <h2 style={{ color: '#2D6A4F' }}>Medicine Inventory</h2>
      
      {/* Search and Filter Bar */}
      <div className="d-flex gap-3 mb-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search medicine..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="form-select" onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Tablets">Tablets</option>
          <option value="Syrups">Syrups</option>
          <option value="Equipment">Equipment</option>
        </select>
      </div>

      <div className="row">
        {filteredProducts.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card shadow-sm">
              <img src={p.image} className="card-img-top" style={{ height: '150px', objectFit: 'contain', padding: '10px' }} alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="badge bg-info text-dark">{p.category}</p>
                <p className="text-success fw-bold">Rs. {p.price}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/edit/${p.id}`)}>Edit</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => deleteProduct(p.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;