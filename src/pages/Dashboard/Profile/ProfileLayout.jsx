import React from "react";

export default function ProfileLayout({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }}>
      <aside>
        <h3>Profil</h3>
        {/* Profile özel sidebar buraya */}
      </aside>
      <section>{children}</section>
    </div>
  );
}
