// components/TabSwitcher.tsx
import React, { useMemo, useState } from "react";

type Tab = {
    id: string;
    label: string;
    content: string;
}
const tabs: Array<Tab> = [
    { id: "tab1", label: "Tab 1", content: "Content for Tab 1" },
    { id: "tab2", label: "Tab 2", content: "Content for Tab 2" },
    { id: "tab3", label: "Tab 3", content: "Content for Tab 3" },
];

const GenericTabSwitcher = ({ tabs, activeTab, onTabClick }: { tabs: Array<Tab>, activeTab: string; onTabClick: (id: string) => void }) => {
    return (
        <>
            {tabs.map(({ id, label }) => {
                return <button
                    key={id}
                    onClick={() => onTabClick(id)}
                    className={`px-4 py-2 rounded ${activeTab === id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    role="tab"
                    aria-selected={activeTab === id}
                    data-testid={`tab-button-${id}`}
                >
                    {label}
                </button>
            })}
        </>
    )
}
const TabSwitcher: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
    const activeTabContent = useMemo(() => {
        return tabs.find(tab => tab.id === activeTab)?.content || "";
    }, [activeTab]);

    const handleTabClick = (id: string) => {
        setActiveTab(id);
    };

    return (
        <div className="p-4">
            <div className="flex gap-4 mb-4">
                <GenericTabSwitcher tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
            </div>
            <div className="p-4 border rounded">{activeTabContent}</div>
        </div>
    );
};
export default TabSwitcher;