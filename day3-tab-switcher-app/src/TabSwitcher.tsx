// components/TabSwitcher.tsx
import React, { useState } from "react";

const Content = ({ activeTab }: { activeTab: string }) => {
    return (
        <>
            <div>{activeTab}</div>
        </>
    )
}


const tabs = [
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
    { id: "tab3", label: "Tab 3" },
];
const TabSwitcher: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

    return (
        <div className="p-4">
            <div className="flex gap-4 mb-4">
                {
                    tabs.map(({ id, label }) => {
                        return <button
                            key={id}
                            onClick={() => setActiveTab(label)}
                            className={`px-4 py-2 rounded ${activeTab === label
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {label}
                        </button>
                    })
                }
            </div>
            <div className="p-4 border rounded"><Content activeTab={activeTab} /></div>
        </div>
    );
};
export default TabSwitcher;