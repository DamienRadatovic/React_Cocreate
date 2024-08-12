import './TaskItem.css';
import TaskInterface from '@/interfaces/task.interface.ts';
import CheckBox from '@/components/general/checkbox/CheckBox.tsx';

interface Props {
    task: TaskInterface;
    isSelected: boolean;
    onCheckItem: (state: boolean) => void,
}

const TaskItem = ({ task, isSelected, onCheckItem }: Props) => {
    return <>
        <td className="select">
            <div className="select-container">
                <CheckBox state={isSelected} onChangSelected={onCheckItem} value={''}/>
                <div className={`icon ${task.status}`} />
            </div>
        </td>
        <td className="name">{task.name}</td>
        <td className="team">{task.team.name}</td>
        <td className="key">{task.key}</td>
        <td className="category">{task.category}</td>
        <td className="priority">{task.priority}</td>
    </>;
};

export default TaskItem;
