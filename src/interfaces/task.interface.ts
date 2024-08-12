import UserInterface from '@/interfaces/user.interface.ts';
import StatusEnum from '@/enums/status.enum.ts';
import CategoryEnum from '@/enums/category.enum.ts';
import PriorityEnum from '@/enums/priority.enum.ts';
import CommentInterface from '@/interfaces/comment.interface.ts';
import TeamInterface from '@/interfaces/team.interface.ts';

interface TaskInterface {
    taskId?: string,
    key?: string,
    projectId?: string,
    logId?: string,
    name: string,
    assign: UserInterface,
    lead: UserInterface,
    status: StatusEnum,
    category: CategoryEnum,
    priority: PriorityEnum,
    createdDate: Date,
    updatedDate: Date|null,
    deadline: Date,
    description: string,
    comments: CommentInterface[],
    team: TeamInterface,
}

export default TaskInterface;