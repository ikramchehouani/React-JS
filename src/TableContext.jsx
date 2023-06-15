import React, { createContext, useState } from "react";

const TableContext = createContext({
  activeTable: "",
  setActiveTable: () => {},
});

const TableProvider = ({ children }) => {
  const [activeTable, setActiveTable] = useState("");

  return (
    <TableContext.Provider value={{ activeTable, setActiveTable }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
