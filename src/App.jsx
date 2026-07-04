import { useState, useEffect } from "react";
import Add from "./components/Add.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Header from "./components/Header.jsx";
import Transactions from "./components/Transactions.jsx";

function App() {
  const [transactionItems, setTransactionItems] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");

      if (saved && saved !== "undefined") {
        return JSON.parse(saved);
      }

      return [];
    } catch (error) {
      console.error("Failed to load transactions:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactionItems));
  }, [transactionItems]);

  const handleAddItem = (newItem) => {
    setTransactionItems((prevItems) => [newItem, ...prevItems]);
  };

  useEffect(() => {
    if (transactionItems) {
      localStorage.setItem("transactions", JSON.stringify(transactionItems));
    }
  }, [transactionItems]);

  const handleAddItem = (newItem) => {
    setTransactionItems((prevItems) => [newItem, ...prevItems]);
  };

  return (
    <>
      <div className="flex flex-row">
        <Dashboard />
        <div className="flex flex-col w-full pl-8 pr-8 gap-5">
          <Header />
          <Transactions items={transactionItems} />
        </div>
      </div>

      <Add onSave={handleAddItem} />
    </>
  );
}

export default App;
