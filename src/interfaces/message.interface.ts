import UserInterface from '@/interfaces/user.interface.ts';

interface MessageInterface {
    id: string,
    owner: UserInterface,
    messages: string,
    createdAt: Date,
    updatedAt: Date,
}

export default MessageInterface;