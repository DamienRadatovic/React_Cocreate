import { createContext, ReactNode, useContext, useState } from 'react';
import TaskInterface from '@/interfaces/task.interface.ts';
import ProjectInterface from '@/interfaces/project.interface.ts';
import { getProjectById } from '@/api/project.api.ts';
import { getTaskListByLogId, postCommentAtTask } from '@/api/task.api.ts';
import CommentInterface from '@/interfaces/comment.interface.ts';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import FilterProjectEnum from '@/enums/filter-project.enum.ts';
import { users } from '@/static.data.ts';

interface TaskContextType {
    project: ProjectInterface|null,
    detailTask: TaskInterface|null,
    selectedTask: { [key: string]: TaskInterface[] },
    tasksListByLog: { [key: string]: TaskInterface[] },
    originalTaskListByLogId: { [key: string]: TaskInterface[] },
    setTask: (task: TaskInterface|null) => void,
    setProjectById: (projectId: string) => void,
    initSelectedTasks: (logId: string) => void,
    changeSelectedTasks: (logId: string, task: TaskInterface, state: boolean) => void,
    addComment: (value: string) => void,
    filterTaskByName: (value: string) => void,
    setTaskListByLogId: (logId: string) => void,
    addNewTask: (newTask: TaskInterface) => void,
    filterByType: (type: FilterProjectEnum, state: boolean) => void,
}

export const ProjectContext = createContext<TaskContextType | undefined>(undefined);

const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const navigate: NavigateFunction = useNavigate();
    const [project, setProject] = useState<TaskContextType['project']>(null);
    const [detailTask, setDetailTask] = useState<TaskContextType['detailTask']>(null);
    const [selectedTask, setSelectedTask] = useState<TaskContextType['selectedTask']>({});
    const [tasksListByLog, setTasksListByLog] = useState<TaskContextType['tasksListByLog']>({});
    const [originalTaskListByLogId, setOriginalTaskListByLogId] = useState<{ [key: string]: TaskInterface[] }>({});

    const setTask = (task: TaskInterface|null): void => {
        setDetailTask(task);
    };

    const setProjectById = async (projectId: string): Promise<void> => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            getProjectById(projectId).then((response: ProjectInterface) => {
                if (response) {
                    setProject(response);
                } else {
                    navigate('/');
                }
            });
        } catch (err) {
            console.error(err);
        }
    };

    const initSelectedTasks = (logId: string): void => {
        if (!selectedTask[logId]) {
            setSelectedTask((prev) => {
                return {
                    ...prev,
                    [logId]: []
                };
            });
        }
    };

    const changeSelectedTasks = async (logId: string, task: TaskInterface, state: boolean): Promise<void> => {
        setSelectedTask((prevSelectedTask) => {
            const currentTasks = prevSelectedTask[logId];

            if (state) {
                return {
                    ...prevSelectedTask,
                    [logId]: [...currentTasks, task]
                };
            } else {
                return {
                    ...prevSelectedTask,
                    [logId]: currentTasks.filter(t => t.taskId !== task.taskId)
                };
            }
        });
    };

    const addComment = (value: string): void => {
        if (detailTask?.taskId) {
            try {
                postCommentAtTask(value, detailTask.taskId).then((response: CommentInterface) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    setDetailTask((prev) => {
                        return {
                            ...prev,
                            comments: prev?.comments.concat(response)
                        };
                    });
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            throw Error('DetailTask have no taskId');
        }
    };

    const setTaskListByLogId = (logId: string): void => {
        try {
            getTaskListByLogId(logId).then((response: TaskInterface[]) => {
                initSelectedTasks(logId);
                setTasksListByLog((prev) => {
                    return {
                        ...prev,
                        [logId]: response
                    };
                });
                setOriginalTaskListByLogId((prev) => {
                    return {
                        ...prev,
                        [logId]: response
                    };
                });
            });
        } catch (err) {
            console.error(err);
        }
    };

    const filterTaskByName = (value: string): void => {
        setTasksListByLog(() => {
            const obj: { [key: string]: TaskInterface[] } = {};
            for (const [key, entriesValue] of Object.entries(originalTaskListByLogId)) {
                obj[key] = entriesValue.filter((task) => task.name.toLowerCase().includes(value.toLowerCase()));
            }

            return obj;
        });
    };

    const filterByType = (type: FilterProjectEnum, state: boolean): void => {
        switch (type) {
        case FilterProjectEnum.Personal:
            if (state) {
                setTasksListByLog(() => {
                    const obj: { [key: string]: TaskInterface[] } = {};
                    for (const [key, entriesValue] of Object.entries(originalTaskListByLogId)) {
                        obj[key] = entriesValue.filter((task) => task.team.group.some((user) => user.id === users[0].id));
                    }
                    return obj;
                });
            } else {
                setTasksListByLog({ ...originalTaskListByLogId });
            }

            break;
        case FilterProjectEnum.Recent:
            if (state) {
                setTasksListByLog(() => {
                    const obj: { [key: string]: TaskInterface[] } = {};
                    for (const [key, entriesValue] of Object.entries(originalTaskListByLogId)) {
                        obj[key] = [...entriesValue].sort((a, b) => {
                            const dateA = a.createdDate.getTime();
                            const dateB = b.createdDate.getTime();

                            return dateA - dateB;
                        });
                    }
                    return obj;
                });
            } else if (!state) {
                setTasksListByLog(() => {
                    const obj: { [key: string]: TaskInterface[] } = {};
                    for (const [key, entriesValue] of Object.entries(originalTaskListByLogId)) {
                        obj[key] = [...entriesValue].sort((a, b) => {
                            const dateA = a.createdDate.getTime();
                            const dateB = b.createdDate.getTime();

                            return dateB - dateA;
                        });
                    }
                    return obj;
                });
            }
            break;
        default:
            break;
        }
    };

    const addNewTask = (newTask: TaskInterface): void => {
        const editedNewTask = {
            ...newTask,
            taskId: crypto.randomUUID(),
            projectId: project?.projectId,
            key: 'NEW-SNC',
        };
        setTasksListByLog((prev) => ({
            ...prev,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            [newTask.logId]: [...prev[newTask.logId], editedNewTask],
        }));
    };

    return <>
        <ProjectContext.Provider value={{
            project,
            tasksListByLog,
            originalTaskListByLogId,
            detailTask,
            selectedTask,
            setTask,
            filterByType,
            setProjectById,
            initSelectedTasks,
            changeSelectedTasks,
            addComment,
            setTaskListByLogId,
            addNewTask,
            filterTaskByName,
        }}>
            { children }
        </ProjectContext.Provider>
    </>;
};

export default ProjectProvider;

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within an ProjectProvider');
    }
    return context;
};
