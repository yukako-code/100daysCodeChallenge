import { useState } from "react";
import type { AccordionItemType } from "../type";

const AccordionItem: React.FC<AccordionItemType> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={toggleAccordion}
                className="w-full text-left p-4 font-semibold hover:bg-gray-100"
            >
                {title}
            </button>
            {isOpen && (
                <div className="p-4 text-gray-700">
                    {content}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;