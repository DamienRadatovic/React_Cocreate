import './LogElement.css';
import LogInterface from '@/interfaces/log.interface.ts';
import { SvgArrow, SvgArrowLong, SvgDot } from '@/components/general/svg/SvgComponent.tsx';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import TaskInterface from '@/interfaces/task.interface.ts';
import TaskItem from '@/components/project/task/task-item/TaskItem.tsx';
import CheckBox from '@/components/general/checkbox/CheckBox.tsx';
import { useProject } from '@/contexts/project.context.tsx';
import UserInterface from '@/interfaces/user.interface.ts';
import DropComponent from '@/components/general/drop-component/DropComponent.tsx';

interface Props {
    log: LogInterface,
}

const LogElement = ({ log }: Props) => {
    const [isLogOpen, setIsLogOpen] = useState<boolean>(true);
    const [isOpenDotAction, setIsOpenDotAction] = useState<boolean>(false);
    const { setTask, originalTaskListByLogId, tasksListByLog, selectedTask, setTaskListByLogId, changeSelectedTasks } = useProject();

    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

    const handleClickOpenLog = (): void => {
        setIsLogOpen((prev) => !prev);
    };

    const formatDate = (date: Date): string => {
        return DateTime.fromJSDate(date).toFormat('MMM dd, yyyy');
    };

    const handleDetailTask = (task: TaskInterface): void => {
        setTask(task);
    };

    const handleCheckAllProjects = (state: boolean): void => {
        setIsAllChecked((prev) => !prev);
        tasksListByLog?.[log.logId]?.forEach((task: TaskInterface): void => {
            if (state) {
                if (!selectedTask[log.logId].some((elt) => elt.taskId === task.taskId)) {
                    changeSelectedTasks(log.logId, task, state);
                }
            } else {
                changeSelectedTasks(log.logId, task, state);
            }
        });
    };

    const itemIsSelected = (taskId: string | undefined): boolean => {
        return selectedTask[log.logId]?.some((item) => item.taskId === taskId);
    };

    const handleCheckItem = async (state: boolean, itemCheck: TaskInterface): Promise<void> => {
        changeSelectedTasks(log.logId, itemCheck, state);
        if (!state) {
            setIsAllChecked(false);
        }
    };

    const allUsersInTaskList = (): UserInterface[] => {
        const userList = originalTaskListByLogId?.[log.logId]
            ?.map((task: TaskInterface) => task.team.group)
            .flat()
            .filter((obj1, i, arr) =>
                arr.findIndex(obj2 => (obj2.id === obj1.id)) === i
            );

        return userList;
    };

    const handleClickActionLog = (): void => {
        setIsOpenDotAction(true);
    };

    useEffect(() => {
        if (tasksListByLog[log.logId]?.length === selectedTask[log.logId]?.length && tasksListByLog[log.logId]?.length > 0) {
            setIsAllChecked(true);
        }
    }, [log.logId, selectedTask, tasksListByLog]);

    useEffect(() => {
        try {
            setTaskListByLogId(log.logId);
        } catch (err) {
            console.error(err);
        }
    }, []);

    return <>
        <div className="log-element-container">
            <div className="log-header">
                <div className={`arrow ${isLogOpen ? 'rotate180' : 'rotate'}`} onClick={handleClickOpenLog}>
                    <SvgArrow/>
                </div>
                <div className="title">
                    <h3>{log.name}</h3>
                    <h4>({tasksListByLog?.[log.logId]?.length} tasks)</h4>
                </div>
                <div className="date">
                    <h4>{formatDate(log.createdDate)}</h4>
                    <SvgArrowLong/>
                    <h4>{formatDate(log.deadline)}</h4>
                </div>
                <div className="user">
                    {
                        allUsersInTaskList()?.map((user, index) => {
                            if (index === 5) {
                                return <div key={user.id + index} className="user-card number">
                                    <p>+{allUsersInTaskList().length - 5}</p>
                                </div>;
                            }
                            if (index < 5) {
                                return <div key={user.id + index} className="user-card">
                                    {
                                        user?.image ?
                                            <img src={user.image} alt="user-image"/>
                                            :
                                            <img
                                                src='https://cdn.allmylinks.com/prod/User/photo/I/_/-/HSF9tPcmEmHBeXWgDg1gSn6eSHNQJXUS.jpg'
                                                alt="generic-user-image"/>
                                    }
                                </div>;
                            }
                            return null;
                        })
                    }
                </div>
                <div
                    className="action"
                >
                    <div onClick={handleClickActionLog} className="dot">
                        <SvgDot />
                    </div>
                    {
                        isOpenDotAction &&
                        <DropComponent onCloseDrop={() => setIsOpenDotAction(false)}>
                            <ul>
                                <li>Delete task(s)</li>
                            </ul>
                        </DropComponent>
                    }
                </div>
            </div>
            <div className={`task-list-container ${isLogOpen ? 'open-log' : 'close-log'}`}>
                <table className="table-list-container">
                    <thead>
                        <tr>
                            <th className="select" scope="col">
                                <div className="select-container">
                                    <CheckBox state={isAllChecked} onChangSelected={handleCheckAllProjects} value={''}/>
                                </div>
                            </th>
                            <th className="name" scope="col">Task</th>
                            <th className="team" scope="col">Team</th>
                            <th className="key" scope="col">Key</th>
                            <th className="category" scope="col">Category</th>
                            <th className="priority" scope="col">Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasksListByLog?.[log.logId]?.length > 0 ? tasksListByLog?.[log.logId]?.map((task: TaskInterface) => (
                                <tr
                                    key={task.taskId}
                                    className="project-container"
                                    onClick={() => handleDetailTask(task)}
                                >
                                    <TaskItem
                                        isSelected={itemIsSelected(task.taskId)}
                                        onCheckItem={(state) => handleCheckItem(state, task)}
                                        task={task}
                                    />
                                </tr>
                            )) : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>;
};

export default LogElement;
