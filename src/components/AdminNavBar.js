import React from "react";

function AdminNavbar({ onChangePage }) {
  return (
    <nav>
      <button onClick={() => onChangePage("List")}>View Questions</button>
      <button onClick={() => onChangePage("Form")}>New Question</button>
    </nav>
  );
}

export default AdminNavbar;
