
import { useState } from "react";
import "./Login.css";

function Login() {
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `${role.charAt(0).toUpperCase() + role.slice(1)} login UI is ready!`
    );
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <div className="brand-icon">S</div>
          <span>
            Stock<span className="brand-highlight">Flow</span>
          </span>
        </div>

        <div className="login-heading">
          <p className="eyebrow">STOCK MANAGEMENT SYSTEM</p>
          <h1>Welcome back</h1>
          <p className="subtitle">
            Sign in to access your workspace.
          </p>
        </div>

        <div className="role-selector">
          {["admin", "vendor", "seller"].map((item) => (
            <button
              key={item}
              type="button"
              className={`role-button ${
                role === item ? "active" : ""
              }`}
              onClick={() => setRole(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="login-button" type="submit">
            Sign in as{" "}
            {role.charAt(0).toUpperCase() + role.slice(1)}
            <span aria-hidden="true"> →</span>
          </button>
        </form>

        <p className="login-footer">
          Secure access to your stock management workspace.
        </p>
      </section>

      <aside className="visual-panel">
        <div className="panel-content">
          <p className="panel-label">INVENTORY. SIMPLIFIED.</p>

          <h2>
            Your stock.
            <br />
            Under control.
          </h2>

          <p className="panel-description">
            Manage products, monitor inventory, and keep your
            operations moving from one place.
          </p>

          <div className="stats-card">
            <div>
              <span className="stats-label">
                INVENTORY OVERVIEW
              </span>
              <h3>Track every item.</h3>
            </div>

            <div className="chart-bars" aria-hidden="true">
              {[35, 55, 42, 72, 52, 88, 66, 100, 76, 92].map(
                (height, index) => (
                  <span
                    key={index}
                    style={{ height: `${height}%` }}
                  />
                )
              )}
            </div>

            <p className="stats-note">
              <span className="status-dot" />
              One workspace. Three roles.
            </p>
          </div>
        </div>

        <span className="panel-watermark">STOCKFLOW / 01</span>
      </aside>
    </main>
  );
}

export default Login;
