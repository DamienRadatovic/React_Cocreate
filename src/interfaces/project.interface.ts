import UserInterface from '@/interfaces/user.interface.ts';
import TeamInterface from '@/interfaces/team.interface.ts';

interface ProjectInterface {
    projectId: string,
    name: string,
    createdDate: Date,
    updatedDate: Date|null,
    owner: UserInterface,
    team: TeamInterface,
}

export default ProjectInterface;