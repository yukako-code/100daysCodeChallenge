import { useState } from 'react';
import AccordionItem from './components/AccordionItem';
import { accordionItems } from './constants/accordionItems';

function App() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
        <div className="max-w-md mx-auto mt-10">
            {accordionItems.map((item, index) => (
                <AccordionItem key={index}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(index === openIndex ? null : index)}
                    {...item}
                />

            ))}
        </div>
    );
}

export default App;