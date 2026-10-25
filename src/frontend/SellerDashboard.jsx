
import { useNavigate } from "react-router-dom";
import { getToken, getUser, logout } from "../utils/auth";
import "./SellerDashboard.css";

const stats = [
  ["Available Products", "420", "Ready to sell"],
  ["Orders Today", "24", "Across all products"],
  ["Units Sold", "196", "This month"],
  ["Low Stock Items", "6", "Check availability"],
];

const products = [
  ["Wireless Mouse", "Electronics", 12, "Low stock"],
  ["USB-C Cable", "Accessories", 86, "In stock"],
  ["Laptop Stand", "Office", 7, "Low stock"],
  ["Keyboard", "Electronics", 43, "In stock"],
];

function SellerDashboard() {
  const navigate = useNavigate();

  const token = getToken();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!token || user?.role?.toLowerCase() !== "seller") {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <div className="seller-page">
      <aside className="seller-sidebar">
        <h2>
          ▣ Stock<span>Flow</span>
        </h2>

        <p className="seller-nav-label">WORKSPACE</p>

        <a className="seller-nav active" href="#seller-overview">
          ▦ Overview
        </a>

        <a className="seller-nav" href="#seller-products">
          □ Products
        </a>

        <a className="seller-nav" href="#seller-sales">
          ↗ Sales
        </a>

        <div className="seller-user">
          S
          <div>
            <strong>Seller Account</strong>
            <small>Sales workspace</small>
          </div>
        </div>

        <button
          type="button"
          className="seller-logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>

      <main className="seller-main" id="seller-overview">
        <header className="seller-topbar">
          <span>STOCK MANAGEMENT SYSTEM / SELLER</span>
          <span>● System operational</span>
        </header>

        <section className="seller-content">
          <p className="seller-eyebrow">YOUR WORKSPACE</p>

          <h1>Seller Dashboard</h1>

          <p className="seller-subtitle">
            Check product availability and monitor your sales activity.
          </p>

          <div className="seller-stats">
            {stats.map(([label, value, note]) => (
              <article className="seller-stat" key={label}>
                <p>{label}</p>
                <h2>{value}</h2>
                <small>{note}</small>
              </article>
            ))}
          </div>

          <section className="seller-panel" id="seller-products">
            <div className="seller-panel-heading">
              <div>
                <h2>Available products</h2>
                <p>Products and current stock levels</p>
              </div>

              <span>{products.length} ITEMS</span>
            </div>

            <div className="seller-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map(([name, category, stock, status]) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>{stock}</td>
                      <td>
                        <span
                          className={`seller-status ${
                            status === "Low stock" ? "low" : ""
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="seller-note">
              Sample product data · Database not connected
            </p>
          </section>

          <section className="seller-panel" id="seller-sales">
            <h2>Recent sales activity</h2>

            <ul className="seller-activity">
              <li>
                New sale recorded
                <small>Wireless Mouse · Just now</small>
              </li>

              <li>
                Order status updated
                <small>Order #2051 · Today</small>
              </li>

              <li>
                Product availability refreshed
                <small>USB-C Cable · Today</small>
              </li>
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}

export default SellerDashboard;
