import React from "react";

export default function MainLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header + Menü buraya */}
      <main>{children}</main>
    </div>
  );
}
