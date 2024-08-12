import { tasks, users } from '../static.data.ts';
import TaskInterface from '../interfaces/task.interface.ts';
import CommentInterface from '../interfaces/comment.interface.ts';

const getTaskListByLogId = async (logId: string): Promise<TaskInterface[]> => {
    return tasks.filter((task) => task.logId === logId);
};

const postCommentAtTask = async (value: string, taskId: string): Promise<CommentInterface> => {
    return {
        id: `new-comment-${crypto.randomUUID()}-${taskId}`,
        message: value,
        owner: users[0],
        createdDate: new Date(),
        updatedDate: null,
    };
};

export {
    getTaskListByLogId,
    postCommentAtTask,
};