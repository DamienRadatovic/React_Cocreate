import UserInterface from '@/interfaces/user.interface.ts';

interface TeamInterface {
    id: string,
    name: string,
    group: UserInterface[],
}

export default TeamInterface;