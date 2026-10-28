import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser, logout } from "../utils/auth";
import "./VendorDashboard.css";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  stock: "0",
  image: "",
};

function VendorDashboard() {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token || user?.role?.toLowerCase() !== "vendor") {
      logout();
      navigate("/login", { replace: true });
    }
  }, [token, user, navigate]);

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data);
    } catch (err) {
      setError(err.message || "Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role?.toLowerCase() === "vendor") {
      loadProducts();
    }
  }, [token, user?.role]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        editingId
          ? `http://localhost:5000/api/products/${editingId}`
          : "http://localhost:5000/api/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save product");
      }

      setMessage(data.message);
      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.message || "Could not connect to the server");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      stock: String(product.stock),
      image: product.image || "",
    });
    setError("");
    setMessage("");
    document.getElementById("vendor-product-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      if (editingId === id) resetForm();

      setMessage(data.message);
      await loadProducts();
    } catch (err) {
      setError(err.message || "Could not connect to the server");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!token || user?.role?.toLowerCase() !== "vendor") return null;

  const lowStock = products.filter((product) => product.stock < 10).length;

  return (
    <div className="vendor-page">
      <aside className="vendor-sidebar">
        <h2>
          ▣ Stock<span>Flow</span>
        </h2>

        <p className="vendor-nav-label">WORKSPACE</p>

        <a className="vendor-nav active" href="#vendor-overview">
          ▦ Overview
        </a>
        <a className="vendor-nav" href="#vendor-products">
          □ My Products
        </a>
        <a className="vendor-nav" href="#vendor-product-form">
          + Add Product
        </a>

        <div className="vendor-user">
          V
          <div>
            <strong>{user?.name || "Vendor Account"}</strong>
            <small>Product management</small>
          </div>
        </div>

        <button
          type="button"
          className="vendor-logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>

      <main className="vendor-main" id="vendor-overview">
        <header className="vendor-topbar">
          <span>STOCK MANAGEMENT SYSTEM / VENDOR</span>
          <span>● System operational</span>
        </header>

        <section className="vendor-content">
          <p className="vendor-eyebrow">YOUR WORKSPACE</p>
          <h1>Vendor Dashboard</h1>
          <p className="vendor-subtitle">
            Manage your catalog and monitor inventory.
          </p>

          <div className="vendor-stats">
            {[
              ["My Products", products.length, "In your catalog"],
              ["Low Stock Items", lowStock, "Fewer than 10 units"],
            ].map(([label, value, note]) => (
              <article className="vendor-stat" key={label}>
                <p>{label}</p>
                <h2>{loading ? "…" : value}</h2>
                <small>{note}</small>
              </article>
            ))}
          </div>

          <section className="vendor-panel" id="vendor-product-form">
            <div className="vendor-panel-heading">
              <div>
                <h2>{editingId ? "Edit product" : "Add a product"}</h2>
                <p>
                  {editingId
                    ? "Update the selected product"
                    : "Enter the details for a new product"}
                </p>
              </div>
            </div>

            <form className="vendor-product-form" onSubmit={handleSubmit}>
              <label>
                Product name *
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="vendor-form-row">
                <label>
                  Price *
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Stock quantity
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label>
                Description *
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </label>

              <label>
                Image URL (optional)
                <input
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/product.jpg"
                />
              </label>

              <div className="vendor-form-actions">
                <button type="submit" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Add Product"}
                </button>

                {editingId && (
                  <button type="button" onClick={resetForm}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          {error && <p className="vendor-feedback error">{error}</p>}
          {message && <p className="vendor-feedback success">{message}</p>}

          <section className="vendor-panel" id="vendor-products">
            <div className="vendor-panel-heading">
              <div>
                <h2>My products</h2>
                <p>Inventory stored in MongoDB</p>
              </div>
              <button type="button" onClick={loadProducts}>
                Refresh
              </button>
            </div>

            <div className="vendor-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading && products.length === 0 && (
                    <tr>
                      <td colSpan="5">No products yet. Add your first one above.</td>
                    </tr>
                  )}

                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <strong>{product.name}</strong>
                        <br />
                        <small>{product.description}</small>
                      </td>
                      <td>₹{Number(product.price).toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <span
                          className={`vendor-status ${
                            product.stock < 10 ? "low" : ""
                          }`}
                        >
                          {product.stock < 10 ? "Low stock" : "In stock"}
                        </span>
                      </td>
                      <td>
                        <div className="vendor-product-actions">
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {loading && (
                    <tr>
                      <td colSpan="5">Loading products...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default VendorDashboard;