import { Task } from "../constants/type";
import NotFound from "./NotFound";
import TaskItem from "./TaskItem";

type TaskListProps = {
    tasks: Array<Task>;
    onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
    if (tasks.length === 0) {
        return <NotFound />
    }
    return (
        <section className="bg-white rounded-xl shadow-sm divide-y">
            {
                tasks.map((task) => <TaskItem key={task.id} {...task} onDelete={() => onDelete(task.id)} />)
            }
        </section>
    )
};
export default TaskList;