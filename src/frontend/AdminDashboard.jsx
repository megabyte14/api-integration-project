
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser, logout } from "../utils/auth";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();

  const [products, setProducts] = useState([]);
  const [inventoryError, setInventoryError] = useState("");
  const [loading, setLoading] = useState(true);

  const stats = [
    ["Total Products", products.length, "Across all vendors"],
    [
      "Registered Vendors",
      "—",
      "Not connected yet",
    ],
    [
      "Total Sellers",
      "—",
      "Not connected yet",
    ],
    [
      "Low Stock Items",
      products.filter((product) => product.stock < 10).length,
      "Fewer than 10 units",
    ],
  ];

  useEffect(() => {
    if (!token || user?.role?.toLowerCase() !== "admin") {
      logout();
      navigate("/login", { replace: true });
    }
  }, [token, user, navigate]);

  useEffect(() => {
    if (!token || user?.role?.toLowerCase() !== "admin") {
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setInventoryError("");

      try {
        const response = await fetch(
          "http://localhost:5000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load inventory"
          );
        }

        setProducts(data);
      } catch (error) {
        setInventoryError(
          error.message || "Could not connect to the server"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, user?.role]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!token || user?.role?.toLowerCase() !== "admin") {
    return null;
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <h2>
          ▣ Stock<span>Flow</span>
        </h2>

        <p className="admin-nav-label">WORKSPACE</p>

        <a className="admin-nav active" href="#admin-overview">
          ▦ Overview
        </a>

        <a className="admin-nav" href="#admin-products">
          □ Products
        </a>

        <a className="admin-nav" href="#admin-activity">
          ↻ Activity
        </a>

        <div className="admin-user">
          A
          <div>
            <strong>Administrator</strong>
            <small>Admin account</small>
          </div>
        </div>

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>

      <main className="admin-main" id="admin-overview">
        <header className="admin-topbar">
          <span>STOCK MANAGEMENT SYSTEM / ADMIN</span>
          <span>● System operational</span>
        </header>

        <section className="admin-content">
          <p className="admin-eyebrow">OVERVIEW</p>

          <h1>Admin Dashboard</h1>

          <p className="admin-subtitle">
            Monitor users, inventory, and overall operations.
          </p>

          <div className="admin-stats">
            {stats.map(([label, value, note]) => (
              <article className="admin-stat" key={label}>
                <p>{label}</p>
                <h2>{value}</h2>
                <small>{note}</small>
              </article>
            ))}
          </div>

          <section className="admin-panel" id="admin-products">
            <div className="admin-panel-heading">
              <div>
                <h2>Inventory overview</h2>
                <p>Product stock across the system</p>
              </div>

              <span>{products.length} ITEMS</span>
            </div>

            {inventoryError && (
              <p role="alert">{inventoryError}</p>
            )}

            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Vendor</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5">Loading inventory...</td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        {inventoryError
                          ? "Could not load products."
                          : "No products found."}
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>
                          {product.vendor?.name || "Unknown"}
                        </td>
                        <td>
                          ₹{Number(product.price).toFixed(2)}
                        </td>
                        <td>{product.stock}</td>
                        <td>
                          <span
                            className={`admin-status ${
                              product.stock < 10 ? "low" : ""
                            }`}
                          >
                            {product.stock < 10
                              ? "Low stock"
                              : "In stock"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="admin-panel" id="admin-activity">
            <h2>Recent activity</h2>

            <ul className="admin-activity">
              <li>
                Recent activity tracking
                <small>Not connected yet</small>
              </li>
              <li>
                Product inventory
                <small>Loaded from MongoDB</small>
              </li>
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
