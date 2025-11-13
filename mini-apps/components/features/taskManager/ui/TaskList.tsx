import { Button } from "../../../shared/Button";
import { Task, TaskPriority } from "../constants/type";
import cn from "classnames";
import NotFound from "./NotFound";

type TaskListProps = {
    tasks: Array<Task>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    if (tasks.length === 0) {
        return <NotFound />
    }
    return (
        <section className="bg-white rounded-xl shadow-sm divide-y">
            {
                tasks.map(({ title, description, priority, tag, createdAt, completedAt }) => {
                    const isCompleted = !!completedAt;
                    const wrapperClassName = cn('flex items-start gap-3 p-3', { ['opacity-60']: isCompleted })
                    const checkBoxClassName = cn('w-4 h-4 border rounded-md', { ['bg-green-500']: isCompleted });
                    const titleClassName = cn('text-sm', { ['text-slate-400 line-through']: isCompleted, ['font-medium text-slate-800']: !isCompleted });
                    const priorityClassName = cn('inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full', {
                        ['bg-slate-100 text-slate-500 border border-slate-200']: priority !== TaskPriority.High,
                        ['bg-amber-50 text-amber-700 border border-amber-100']: priority === TaskPriority.High,
                    })

                    return (
                        <div className={wrapperClassName}>
                            <div className="mt-1">
                                <div className={checkBoxClassName} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p className={titleClassName}>
                                        {title}
                                    </p>
                                    <span className={priorityClassName}>
                                        {priority}
                                    </span>
                                </div>
                                {description && (<p className="text-xs text-slate-500 mt-1">
                                    {description}
                                </p>)}
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                                    {tag && (<span>Tag: {tag}</span>)}
                                    {isCompleted ? (<span>Completed: {completedAt}</span>) : (<span>Created: {createdAt}</span>)}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-[10px]">
                                {isCompleted ? (
                                    <Button title={'Undo'} />
                                ) : (
                                    <>
                                        <Button title={'Edit'} />
                                        <Button title={'Delete'} type="danger" />
                                    </>
                                )}

                            </div>
                        </div>
                    )

                })
            }
        </section>
    )
};
export default TaskList;