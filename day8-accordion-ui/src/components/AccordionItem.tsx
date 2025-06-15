import type { AccordionItemType } from "../types";
interface AccordionItemProps extends AccordionItemType {
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                aria-expanded={isOpen}
                onClick={onClick}
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