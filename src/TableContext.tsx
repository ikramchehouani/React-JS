import React, { createContext, useState } from "react";

interface TableContextProps {
  activeTable: string;
  setActiveTable: React.Dispatch<React.SetStateAction<string>>;
}

export const TableContext = createContext<TableContextProps>({
  activeTable: "",
  setActiveTable: () => {},
});

export const TableProvider: React.FC = ({ children }) => {
  const [activeTable, setActiveTable] = useState("");

  return (
    <TableContext.Provider value={{ activeTable, setActiveTable }}>
      {children}
    </TableContext.Provider>
  );
};
