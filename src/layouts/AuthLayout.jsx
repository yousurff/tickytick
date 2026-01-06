import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <main style={{ width: "100%", maxWidth: 420 }}>{children}</main>
    </div>
  );
}
