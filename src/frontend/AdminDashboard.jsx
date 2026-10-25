
import { useNavigate } from "react-router-dom";
import { getToken, getUser, logout } from "../utils/auth";
import "./AdminDashboard.css";

const stats = [
  ["Total Products", "1,284", "+12 this month"],
  ["Registered Vendors", "48", "Across all categories"],
  ["Total Sellers", "126", "Active accounts"],
  ["Low Stock Items", "18", "Needs attention"],
];

const products = [
  ["Wireless Mouse", "Electronics", 12, "Low stock"],
  ["USB-C Cable", "Accessories", 86, "In stock"],
  ["Laptop Stand", "Office", 7, "Low stock"],
  ["Keyboard", "Electronics", 43, "In stock"],
];

function AdminDashboard() {
  const navigate = useNavigate();

  const token = getToken();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!token || user?.role?.toLowerCase() !== "admin") {
    navigate("/login", { replace: true });
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

            <div className="admin-table-wrap">
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
                          className={`admin-status ${
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
          </section>

          <section className="admin-panel" id="admin-activity">
            <h2>Recent activity</h2>

            <ul className="admin-activity">
              <li>
                New vendor account registered
                <small>Just now</small>
              </li>

              <li>
                Product inventory updated
                <small>10 minutes ago</small>
              </li>

              <li>
                Low stock alert generated
                <small>Today</small>
              </li>
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
