import UserInterface from '@/interfaces/user.interface.ts';

interface LogInterface {
    projectId: string,
    logId: string,
    name: string,
    createdDate: Date,
    updatedDate: Date|null,
    deadline: Date,
    owner: UserInterface,
}

export default LogInterface;