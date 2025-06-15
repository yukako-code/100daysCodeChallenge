import AccordionItem from './components/AccordionItem';
import { accordionItems } from './constants/accordionItems';

function App() {
    return (
        <div className="max-w-md mx-auto mt-10">
            {accordionItems.map((item, index) => (
                <AccordionItem key={`${item}-${index}`} {...item} />
            ))}
        </div>
    );
}

export default App;