import RoleEnum from '@/enums/role.enum.ts';

interface UserInterface {
    id: string,
    name: string,
    image: string,
    email: string,
    role: RoleEnum,
}

export default UserInterface;