import UserInterface from '@/interfaces/user.interface.ts';

interface CommentInterface {
    id: string,
    message: string,
    owner: UserInterface,
    createdDate: Date,
    updatedDate: Date|null,
}

export default CommentInterface;