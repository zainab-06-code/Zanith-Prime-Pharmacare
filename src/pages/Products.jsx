import { useState, useEffect } from "react";
import { getProducts, saveProducts } from "../utils/localStorage";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // DELETE PRODUCT
  const deleteProduct = (index) => {

    const updated = [...products];
    updated.splice(index, 1);

    setProducts(updated);
    saveProducts(updated);

  };

  // EDIT PRODUCT
  const editProduct = (index) => {

    const newName = prompt("Enter new product name");

    if (newName) {

      const updated = [...products];
      updated[index].name = newName;

      setProducts(updated);
      saveProducts(updated);

    }

  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">Products</h2>

      {/* SEARCH BAR */}
      <input
        className="form-control mb-3"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORY FILTER */}
      <select
        className="form-select mb-4"
        onChange={(e) => setCategory(e.target.value)}
      >

        <option value="">All Categories</option>
        <option>Tablet</option>
        <option>Syrup</option>
        <option>Medical Equipment</option>
        <option>Health and Safety</option>

      </select>

      <div className="row">

        {products
          .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
          .filter((p) =>
            category === "" || p.category === category
          )
          .map((p, i) => (

            <div className="col-md-3 mb-4" key={i}>

              <div className="card p-3 shadow-sm h-100 text-center">

                <img
                  src={p.image}
                  alt={p.name}
                  height="120"
                  style={{ objectFit: "contain" }}
                />

                <h5 className="mt-3">{p.name}</h5>

                <p className="text-muted">{p.category}</p>

                <p className="fw-bold">Rs {p.price}</p>

                <div className="d-flex justify-content-center gap-2">

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editProduct(i)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(i)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

      </div>

    </div>

  );
}

export default Products;