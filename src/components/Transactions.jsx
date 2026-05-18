import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

function Transactions({ items = [] }) {
  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const timestamp =
      typeof dateInput === "string" ? Number(dateInput) : dateInput;
    const normalizedTimestamp =
      timestamp < 10000000000 ? timestamp * 1000 : timestamp;
    const date = new Date(normalizedTimestamp);
    if (isNaN(date.getTime())) return dateInput;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-neutral-100 w-full h-full mb-5 flex flex-col rounded-2xl pl-8 pr-8 pt-5 pb-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-md font-bold">Recent Transactions</h1>
        <h1 className="text-green-500 cursor-pointer">View All</h1>
      </div>

      <ul className="flex flex-col gap-4 mt-5">
        {items.map((item) => {
          const isIncome = item.finance?.toLowerCase() === "income";

          
          const IconComponent = item.icon;

          return (
            <li
              key={item.id}
              className="w-full flex flex-row justify-between items-center"
            >
              <div className="flex flex-row items-center">
                <div
                  className={`w-auto h-auto flex justify-center items-center rounded-full p-3 mr-5 ${
                    isIncome
                      ? "bg-green-300/50 text-green-700"
                      : "bg-red-300/50 text-red-700"
                  }`}
                >
                  
                  {IconComponent ? (
                    <IconComponent size={24} />
                  ) : isIncome ? (
                    <BanknoteArrowUp size={24} />
                  ) : (
                    <BanknoteArrowDown size={24} />
                  )}
                </div>

                <div>
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="text-black/50 text-sm">{item.finance}</p>
                </div>
              </div>

              
              <h1
                className={`w-auto h-auto ${
                  isIncome
                    ? "bg-green-300/50 text-green-700"
                    : "bg-red-300/50 text-red-700"
                } rounded-lg p-2 text-sm font-medium`}
              >
                {item.type}
              </h1>

              <div className="flex justify-center items-center text-center ml-2 mr-2">
                <h1
                  className={`w-auto h-auto ${
                    isIncome ? "text-green-700" : "text-red-700"
                  } font-semibold`}
                >
                  ₱{Number(item.amount).toLocaleString()}
                </h1>
              </div>

              <h1 className="text-black/50 text-sm">{formatDate(item.date)}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Transactions;
