import { useEffect, useState } from "react";
import { getProducts } from "../utils/localStorage";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const data = getProducts();
    setProducts(data);
    
    // Logic for Low Stock Alert (Threshold: less than 5 units)
    const alerts = data.filter(p => p.quantity < 5);
    setLowStockItems(alerts);
  }, []);

  // Stats Calculation
  const stats = {
    total: products.length,
    tablets: products.filter(p => p.category === "Tablet").length,
    syrups: products.filter(p => p.category === "Syrup").length,
    equipment: products.filter(p => p.category === "Medical Equipment").length,
    safety: products.filter(p => p.category === "Health and Safety").length
  };

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="mb-5">
        <h2 style={{ color: "#1e293b", fontWeight: "bold" }}>
          ZANITH PRIME <span style={{ color: "#4CAF50" }}>PHARMACARE</span>
        </h2>
        <p className="text-muted">Welcome to your Pharmacy Admin Overview.</p>
      </div>

      {/* Main Stats Row */}
      <div className="row g-4">
        {/* Total Products Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: "5px solid #87CEEB", padding: "15px" }}>
            <h6 className="text-muted text-uppercase small">Total Inventory</h6>
            <h2 className="fw-bold" style={{ color: "#1e293b" }}>{stats.total}</h2>
          </div>
        </div>

        {/* Tablets Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: "5px solid #4CAF50", padding: "15px" }}>
            <h6 className="text-muted text-uppercase small">Tablets</h6>
            <h2 className="fw-bold" style={{ color: "#4CAF50" }}>{stats.tablets}</h2>
          </div>
        </div>

        {/* Syrups Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: "5px solid #87CEEB", padding: "15px" }}>
            <h6 className="text-muted text-uppercase small">Syrups</h6>
            <h2 className="fw-bold" style={{ color: "#1e293b" }}>{stats.syrups}</h2>
          </div>
        </div>

        {/* Equipment Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderLeft: "5px solid #6c757d", padding: "15px" }}>
            <h6 className="text-muted text-uppercase small">Equipment</h6>
            <h2 className="fw-bold" style={{ color: "#333" }}>{stats.equipment}</h2>
          </div>
        </div>
      </div>

      {/* Low Stock Alert Section - THE UNIQUE FEATURE */}
      
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "15px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0" style={{ color: "#1e293b" }}>⚠️ Critical Stock Alerts</h4>
              <span className="badge rounded-pill bg-danger px-3 py-2">
                {lowStockItems.length} Items Low
              </span>
            </div>

            {lowStockItems.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Medicine Name</th>
                      <th>Category</th>
                      <th>Current Quantity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item) => (
                      <tr key={item.id}>
                        <td className="fw-bold">{item.name}</td>
                        <td>{item.category}</td>
                        <td className="text-danger fw-bold">{item.quantity} Units</td>
                        <td>
                          <span className="badge bg-warning text-dark">Reorder Soon</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-success mb-0">✅ All stock levels are currently sufficient.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;