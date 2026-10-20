
import "./VendorDashboard.css";

const stats = [
  ["My Products", "156", "Across your catalog"],
  ["Pending Orders", "12", "Awaiting processing"],
  ["Units Sold", "384", "This month"],
  ["Low Stock Items", "8", "Restock recommended"],
];

const products = [
  ["Wireless Mouse", "Electronics", 12, "Low stock"],
  ["USB-C Cable", "Accessories", 86, "In stock"],
  ["Laptop Stand", "Office", 7, "Low stock"],
  ["Keyboard", "Electronics", 43, "In stock"],
];

function VendorDashboard() {
  return (
    <div className="vendor-page">
      <aside className="vendor-sidebar">
        <h2>▣ Stock<span>Flow</span></h2>
        <p className="vendor-nav-label">WORKSPACE</p>
        <a className="vendor-nav active" href="#vendor-overview">▦ Overview</a>
        <a className="vendor-nav" href="#vendor-products">□ My Products</a>
        <a className="vendor-nav" href="#vendor-orders">↻ Orders</a>
        <div className="vendor-user">V <div><strong>Vendor Account</strong><small>Product management</small></div></div>
      </aside>

      <main className="vendor-main" id="vendor-overview">
        <header className="vendor-topbar">
          <span>STOCK MANAGEMENT SYSTEM / VENDOR</span>
          <span>● System operational</span>
        </header>

        <section className="vendor-content">
          <p className="vendor-eyebrow">YOUR WORKSPACE</p>
          <h1>Vendor Dashboard</h1>
          <p className="vendor-subtitle">Manage your catalog, monitor stock, and track orders.</p>

          <div className="vendor-stats">
            {stats.map(([label, value, note]) => (
              <article className="vendor-stat" key={label}>
                <p>{label}</p>
                <h2>{value}</h2>
                <small>{note}</small>
              </article>
            ))}
          </div>

          <section className="vendor-panel" id="vendor-products">
            <div className="vendor-panel-heading">
              <div><h2>My products</h2><p>Current stock across your catalog</p></div>
              <span>4 ITEMS</span>
            </div>
            <div className="vendor-table-wrap">
              <table>
                <thead><tr><th>Product</th><th>Category</th><th>Stock</th><th>Status</th></tr></thead>
                <tbody>
                  {products.map(([name, category, stock, status]) => (
                    <tr key={name}>
                      <td>{name}</td><td>{category}</td><td>{stock}</td>
                      <td><span className={`vendor-status ${status === "Low stock" ? "low" : ""}`}>{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="vendor-note">Sample product data · Database not connected</p>
          </section>

          <section className="vendor-panel" id="vendor-orders">
            <h2>Recent order activity</h2>
            <ul className="vendor-activity">
              <li>New order received <small>Order #1042 · Just now</small></li>
              <li>Order marked as processed <small>Order #1038 · Today</small></li>
              <li>Product quantity updated <small>Wireless Mouse · Today</small></li>
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}

export default VendorDashboard;
