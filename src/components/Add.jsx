import {
  Plus,
  BanknoteArrowUp,
  BanknoteArrowDown,
  Utensils,
  PiggyBank,
  Dumbbell,
  Glasses,
  Gem,
  Luggage,
  Popcorn,
  Sofa,
  Wifi,
  Van,
} from "lucide-react";
import { useState } from "react";

function Add({ onSave }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [SelectedLogo, setSelectedLogo] = useState(BanknoteArrowUp);
  const [selectedOption, setSelectedOption] = useState("Income");

  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [amountError, setAmountError] = useState("");

  function handleModalOpen() {
    setModalOpen((prev) => !prev);
    if (modalOpen) {
      setLogoModalOpen(false);
      setAmountError("");
    }
  }

  function handleLogoModalOpen() {
    setLogoModalOpen((prev) => !prev);
  }

  const logos = [
    BanknoteArrowUp,
    BanknoteArrowDown,
    Utensils,
    PiggyBank,
    Dumbbell,
    Glasses,
    Gem,
    Luggage,
    Popcorn,
    Sofa,
    Wifi,
    Van,
  ];

  function handleSelectedLogo(clickedIcon) {
    setSelectedLogo(() => clickedIcon);
    setLogoModalOpen(false);
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const evaluateAmount = (expression) => {
    if (!expression) return "";
    try {
      if (!/^[\d+\-*/. ()]+$/.test(expression)) {
        throw new Error("Invalid characters");
      }
      const calculated = new Function(`return ${expression}`)();

      if (isNaN(calculated) || !isFinite(calculated)) {
        throw new Error("Invalid math");
      }
      return calculated.toString();
    } catch (error) {
      return "ERROR";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const result = evaluateAmount(amount);

      if (result === "ERROR") {
        setAmountError("Invalid math expression");
      } else {
        setAmount(result);
        setAmountError("");
      }
    }
  };

  const handleSaveItem = () => {
    if (!itemName || !amount || !category) {
      alert("Please fill out all fields");
      return;
    }

    const finalAmount = evaluateAmount(amount);

    if (finalAmount === "ERROR" || finalAmount === "") {
      setAmountError("Please enter a valid number or math expression");
      return;
    }

    const formattedAmount =
      selectedOption === "Expense"
        ? `-${Math.abs(parseFloat(finalAmount))}`
        : `${Math.abs(parseFloat(finalAmount))}`;

    const newItem = {
      id: crypto.randomUUID(),
      icon: SelectedLogo,
      name: itemName,
      finance: selectedOption,
      type: category,
      amount: formattedAmount,
      date: Date.now(),
    };

    onSave(newItem);

    setItemName("");
    setAmount("");
    setCategory("");
    setAmountError("");
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <div
          id="modal"
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        >
          <div className="relative bg-gray-200 p-6 rounded-2xl shadow-xl max-w-xl w-full max-h-[70vh] flex flex-col gap-5">
            {logoModalOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-3 bg-gray-100 p-4 rounded-2xl shadow-2xl border border-gray-300 z-50 flex flex-col gap-3 max-h-[30vh] overflow-y-auto">
                <div className="sticky top-0 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Select Logo
                  </h2>
                  <button
                    onClick={handleLogoModalOpen}
                    className="text-gray-400 hover:text-gray-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
                <ul className="grid grid-cols-8 gap-2 max-h-20 no-scrollbar overflow-auto">
                  {logos.map((symbol, index) => {
                    const Icon = symbol;
                    return (
                      <li
                        key={index}
                        onClick={() => handleSelectedLogo(Icon)}
                        className="p-3 bg-white rounded-xl text-center cursor-pointer hover:bg-green-50 text-sm flex justify-center items-center"
                      >
                        <Icon size={30} className="hover:text-green-400" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* MAIN INPUT MODAL */}
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">Add New Item</h1>
              <button
                onClick={handleModalOpen}
                className="text-gray-500 hover:text-gray-700 text-xl font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-row justify-center gap-3">
              <div
                className="bg-gray-50 rounded-xl p-2 cursor-pointer flex items-center justify-center"
                onClick={handleLogoModalOpen}
              >
                <SelectedLogo size={30} />
              </div>
              <input
                type="text"
                placeholder="Item Name..."
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="bg-gray-50 rounded-2xl w-full text-xl py-2 px-3 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <input
                type="text"
                inputMode="decimal"
                placeholder="Amount (e.g. 8+5)"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setAmountError("");
                }}
                onKeyDown={handleKeyDown}
                className={`bg-gray-50 rounded-2xl w-full text-xl py-2 px-3 focus:outline-none border-2 transition-colors ${amountError ? "border-red-400" : "border-transparent focus:border-green-400"}`}
                required
              />
              {amountError && (
                <span className="text-red-500 text-sm font-semibold pl-2">
                  {amountError}
                </span>
              )}
            </div>

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 rounded-2xl w-full text-xl py-2 px-3 focus:outline-none"
              required
            />

            <div className="flex flex-row justify-center gap-4 w-full max-w-md mx-auto">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="Income"
                  name="finance"
                  checked={selectedOption === "Income"}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-center font-bold text-gray-500 peer-checked:border-green-400 peer-checked:bg-green-50 peer-checked:text-green-600 transition-all">
                  Income
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="Expense"
                  name="finance"
                  checked={selectedOption === "Expense"}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-center font-bold text-gray-500 peer-checked:border-red-400 peer-checked:bg-red-50 peer-checked:text-red-600 transition-all">
                  Expense
                </div>
              </label>
            </div>

            <button
              onClick={handleSaveItem}
              className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Save Item
            </button>
          </div>
        </div>
      )}

      <div
        onClick={handleModalOpen}
        className="fixed bottom-10 right-10 z-50 bg-green-400 rounded-full w-12 h-12 flex justify-center items-center shadow-lg cursor-pointer hover:bg-green-500 transition-colors"
      >
        <Plus className="text-white" />
      </div>
    </>
  );
}

export default Add;
