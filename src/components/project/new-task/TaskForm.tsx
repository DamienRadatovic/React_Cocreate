import './TaskForm.css';
import { logList, teams, users } from '@/static.data.ts';
import StatusEnum from '@/enums/status.enum.ts';
import CategoryEnum from '@/enums/category.enum.ts';
import PriorityEnum from '@/enums/priority.enum.ts';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import TaskInterface from '@/interfaces/task.interface.ts';
import priorityEnum from '@/enums/priority.enum.ts';
import categoryEnum from '@/enums/category.enum.ts';
import LogInterface from '@/interfaces/log.interface.ts';

interface Props {
    onSendForm: (date: TaskInterface) => void,
    projectId: string|undefined,
}

const TaskForm = ({ onSendForm, projectId }: Props) => {
    const [task, setTask] = useState<TaskInterface>({
        name: '',
        logId: '',
        assign: users[0],
        lead: users[0],
        status: StatusEnum.Todo,
        category: CategoryEnum.Task,
        priority: PriorityEnum.Low,
        createdDate: new Date(),
        updatedDate: null,
        deadline: new Date(),
        description: '',
        comments: [],
        team: teams[0],
    });

    const [allFormData, setAllFormData] = useState<{ [key: string]: [] }>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newData = {
            ...task,
            createdDate: new Date(),
            deadline: new Date(task.deadline),
        };
        onSendForm(newData);
    };

    useEffect(() => {
        // fetchAllFormData()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setAllFormData((prv) => {
            const newObj = {
                ...prv,
                ['priority']: Object.values(priorityEnum),
                ['category']: Object.values(categoryEnum),
                ['status']: Object.values(priorityEnum),
                ['logs']: logList.filter((log) => log.projectId === projectId),
            };

            setTask((prevTask) => ({
                ...prevTask,
                logId: newObj.logs[0].logId,
            }));
            return newObj;
        });
    }, []);

    return <>
        <form onSubmit={handleSubmit}>
            <h2>Create new task</h2>
            <div className="form-block">
                <label>Task Name:</label>
                <input type="text" name="name" value={task.name} onChange={handleChange} required/>
            </div>
            <div className="form-block">
                <label>Description:</label>
                <textarea name="description" value={task.description} onChange={handleChange} required/>
            </div>
            <div className="select-container">
                <div className="form-block">
                    <label>Assign To:</label>
                    <select name="assign" value={task.assign} onChange={handleChange}>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-block">
                    <label>Lead:</label>
                    <select name="lead" value={task.lead} onChange={handleChange}>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-block">
                    <label>Status:</label>
                    <select name="status" value={task.status} onChange={handleChange}>
                        {allFormData['status']?.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="form-block">
                    <label>Category:</label>
                    <select name="category" value={task.category} onChange={handleChange}>
                        {allFormData['category']?.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="form-block">
                    <label>Priority:</label>
                    <select name="priority" value={task.priority} onChange={handleChange}>
                        {allFormData['priority']?.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                        ))}
                    </select>
                </div>
                <div className="form-block">
                    <label>Team:</label>
                    <select name="team" value={task.team} onChange={handleChange}>
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-block">
                    <label>Log affiliation:</label>
                    <select name="logs" value={task.logId} onChange={handleChange}>
                        {allFormData['logs']?.map((log: LogInterface) => (
                            <option key={log.logId} value={log.logId}>{log.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-block">
                <label>Deadline:</label>
                <input type="date" name="deadline" value={task.deadline}
                    onChange={handleChange} required/>
            </div>
            <div className="form-block btn">
                <button type="submit">Create Task</button>
            </div>
        </form>
    </>;
};

export default TaskForm;