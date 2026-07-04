import {
  ChartArea,
  House,
  ChartColumnBig,
  Bookmark,
  CircleUserRound,
} from "lucide-react";
import { useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = [
    { name: "Overview", Icon: House },
    //{ name: "Stats", Icon: ChartColumnBig },
    //{ name: "Accounts", Icon: Bookmark },
    //{ name: "Profile", Icon: CircleUserRound },
  ];

  return (
    <div className="bg-neutral-100 flex flex-col w-auto max-w-80 h-screen pl-10 pr-10 items-center">
      <ChartArea className="m-5 text-green-400 t" size={64} />
      <h1 className="font-semibold font-roboto text-center ml-5 mr-5 text-md">
        Pocket Tortoise
      </h1>

      <div className="flex justify-center w-full">
        <ul className="mt-5 flex flex-col justify-center gap-5 text-left text-md">
          {tabs.map((tab, index) => {
            const IconComponent = tab.Icon;
            const isActive = activeTab === tab.name;

            return (
              <li
                key={index}
                onClick={() => setActiveTab(tab.name)}
                className={`
                                    flex items-center gap-3 cursor-pointer py-3 pl-5 pr-4 transition-all rounded-lg
                                    ${
                                      isActive
                                        ? "bg-green-400/30 border-l-4 border-green-600/80 text-green-900 font-medium"
                                        : "border-l-4 border-transparent hover:text-green-500 text-neutral-600 hover:bg-neutral-200/50"
                                    }
                                `}
              >
                <IconComponent size={20} />
                <span>{tab.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
