import FilterableTodos from "./components/FilterableTodos";

const todos = [
  { id: 1, text: 'Buy milk', completed: true },
  { id: 2, text: 'Read book', completed: false },
  { id: 3, text: 'Go running', completed: false },
];

const App: React.FC = () => {
  return (<FilterableTodos todos={todos} />)

}

export default App;