import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Essential for professional editing
import { getProducts, saveProducts } from "../utils/localStorage";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // Load products from LocalStorage on mount
  useEffect(() => {
    const data = getProducts();
    setProducts(data);
  }, []);

  // DELETE PRODUCT (Using ID is safer than Index)
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this medicine?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  // FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-4">
      {/* Header with Sky Blue Accent */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#1e293b", borderLeft: "5px solid #87CEEB", paddingLeft: "15px" }}>
          Inventory Management
        </h2>
        <button 
          className="btn" 
          style={{ backgroundColor: "#4CAF50", color: "white" }}
          onClick={() => navigate("/add-product")}
        >
          + Add New Medicine
        </button>
      </div>

      <div className="row g-3">
        {/* SEARCH & FILTER AREA */}
        <div className="col-md-8">
          <input
            className="form-control shadow-sm"
            placeholder="🔍 Search medicine by name..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select shadow-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Tablet</option>
            <option>Syrup</option>
            <option>Medical Equipment</option>
            <option>Health and Safety</option>
          </select>
        </div>
      </div>

      <hr className="my-4" />

      {/* PRODUCT GRID */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div className="col-md-3 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm border-0" style={{ transition: "0.3s" }}>
                <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px 8px 0 0" }}>
                  <img
                    src={p.image || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "140px", objectFit: "contain" }}
                  />
                </div>

                <div className="card-body text-center">
                  <h6 className="text-uppercase text-muted small fw-bold">{p.category}</h6>
                  <h5 className="card-title" style={{ color: "#2D6A4F" }}>{p.name}</h5>
                  <p className="fw-bold fs-5 mb-1" style={{ color: "#1e293b" }}>Rs {p.price}</p>
                  
                  {/* Stock Indicator */}
                  <p className={`small mb-3 ${p.quantity < 5 ? "text-danger fw-bold" : "text-success"}`}>
                    Stock: {p.quantity} {p.quantity < 5 && "(Low!)"}
                  </p>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm px-3"
                      onClick={() => navigate(`/edit-product/${p.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm px-3"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4 className="text-muted">No medicines found matching your criteria.</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;