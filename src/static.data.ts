import RoleEnum from '@/enums/role.enum.ts';
import ProjectInterface from '@/interfaces/project.interface.ts';
import UserInterface from '@/interfaces/user.interface.ts';
import TaskInterface from '@/interfaces/task.interface.ts';
import TeamInterface from '@/interfaces/team.interface.ts';
import StatusEnum from '@/enums/status.enum.ts';
import CategoryEnum from '@/enums/category.enum.ts';
import PriorityEnum from '@/enums/priority.enum.ts';
import LogInterface from '@/interfaces/log.interface.ts';

const users: UserInterface[] = [
    { id: 'user-1', name: 'Jean', image: 'https://randomuser.me/api/portraits/men/51.jpg', email: 'jean@jean.com', role: RoleEnum.Normal },
    { id: 'user-2', name: 'Marie', image: 'https://randomuser.me/api/portraits/women/76.jpg', email: 'marie@marie.com', role: RoleEnum.Supp },
    { id: 'user-3', name: 'Paul', image: 'https://randomuser.me/api/portraits/men/41.jpg', email: 'paul@paul.com', role: RoleEnum.Normal },
    { id: 'user-4', name: 'Lucie', image: 'https://randomuser.me/api/portraits/women/44.jpg', email: 'lucie@lucie.com', role: RoleEnum.Normal },
    { id: 'user-5', name: 'Pierre', image: 'https://randomuser.me/api/portraits/men/81.jpg', email: 'pierre@pierre.com', role: RoleEnum.Normal },
];

const teams: TeamInterface[] = [
    { id: 'team-1', name: 'Team Front', group: users.slice(0, 2) },
    { id: 'team-2', name: 'Team Back', group: users.slice(2, 4) },
    { id: 'team-3', name: 'Team Fullstack', group: users.slice(1, 3) },
];

function generateRandomProjectName(): string {
    const words = [
        'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Sigma', 'Orion', 'Nebula', 'Phoenix',
        'Titan', 'Quantum', 'Velocity', 'Horizon', 'Nimbus', 'Pioneer', 'Apex', 'Vanguard', 'Odyssey',
        'Nova', 'Zenith', 'Legacy', 'Voyager', 'Echo', 'Fusion', 'Solstice', 'Cosmos', 'Equinox', 'Atlas',
        'Lunar', 'Nebula', 'Spectrum', 'Stellar', 'Ascend', 'Blaze', 'Eclipse', 'Radiance', 'Genesis', 'Infinity'
    ];

    const numberOfWords = Math.floor(Math.random() * 4) + 2; // Entre 2 et 5 mots

    const projectName = Array.from({ length: numberOfWords }, () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }).join(' ');

    return projectName;
}

const projects: ProjectInterface[] = Array.from({ length: 20 }, (_, i) => ({
    projectId: `project-${i + 1}`,
    name: generateRandomProjectName(),
    createdDate: new Date(`2022-08-0${(i % 9) + 1}T18:46:16Z`),
    updatedDate: null,
    owner: users[i % users.length],
    team: teams[i % teams.length],
}));


const logList: LogInterface[] = projects.flatMap((project, projectIndex) =>
    Array.from({ length: 5 }, (_, logIndex) => ({
        projectId: project.projectId,
        logId: `${project.projectId}-log-${logIndex + 1}`,
        name: `Log ${logIndex + 1} du ${project.name}`,
        createdDate: new Date(`2022-08-0${(projectIndex % 9) + 1}T18:46:16Z`),
        updatedDate: null,
        deadline: new Date(`2022-08-0${(projectIndex % 9) + 1}T18:46:16Z`),
        owner: users[projectIndex % users.length],
    }))
);

function randomEnum<T>(anEnum: T): T[keyof T] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const enumValues = Object.keys(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return randomEnumValue;
}

function generateRandomTaskName(): string {
    const words = [
        'Implement', 'Fix', 'Update', 'Refactor', 'Optimize', 'Test', 'Deploy', 'Design',
        'Create', 'Configure', 'Document', 'Migrate', 'Integrate', 'Review', 'Analyze',
        'Monitor', 'Automate', 'Validate', 'Improve', 'Debug', 'Support', 'Enhance', 'Develop',
        'Build', 'Patch', 'Upgrade', 'Plan', 'Scale', 'Configure', 'Research', 'Resolve'
    ];

    const numberOfWords = Math.floor(Math.random() * 8) + 3; // Entre 3 et 10 mots

    const taskName = Array.from({ length: numberOfWords }, () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }).join(' ');

    return taskName;
}

const tasks: TaskInterface[] = logList.flatMap(log =>
    Array.from({ length: Math.floor(Math.random() * 7) + 4 }, (_, taskIndex) => ({
        taskId: `${log.logId}-task-${taskIndex + 1}`,
        projectId: log.projectId,
        logId: log.logId,
        name: generateRandomTaskName(),
        assign: users[taskIndex % users.length],
        lead: users[(taskIndex + 1) % users.length],
        status: randomEnum(StatusEnum),
        category: randomEnum(CategoryEnum),
        priority: randomEnum(PriorityEnum),
        createdDate: new Date(`2022-08-0${(taskIndex % 9) + 1}T18:46:16Z`),
        updatedDate: null,
        deadline: new Date(`2024-08-0${(taskIndex % 9) + 1}T18:46:16Z`),
        description: `La description de la tâche ${taskIndex + 1} du ${log.name}`,
        comments: [{
            id: 'dgdf',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            owner: users[0],
            createdDate: new Date(`2022-08-0${(taskIndex % 9) + 1}T18:46:16Z`),
            updatedDate: new Date(`2022-08-0${(taskIndex % 9) + 1}T18:48:16Z`),
        }],
        team: teams[taskIndex % teams.length],
        key: `SNC-${500 + taskIndex}`,
    }))
);

export {
    users,
    teams,
    projects,
    tasks,
    logList,
};