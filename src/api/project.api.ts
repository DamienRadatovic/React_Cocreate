import ProjectInterface from '../interfaces/project.interface.ts';
import { projects, users } from '../static.data.ts';
import FilterProjectEnum from '../enums/filter-project.enum.ts';

const getProjectById = async (projectId: string): Promise<ProjectInterface|null> => {
    const list = projects.filter((project) => project.projectId === projectId)[0];
    if (!list) {
        return null;
    }
    return list;
};

const getAllProject = async (): Promise<ProjectInterface[]> => {
    return projects;
};

const getFilteredProjects = async (type: FilterProjectEnum, value:string, state?: boolean): Promise<ProjectInterface[]> => {
    let filteredProject: ProjectInterface[] = [];
    switch (type) {
    case FilterProjectEnum.Name:
        filteredProject = projects.filter((project) => project.name.toLowerCase().includes(value.toLowerCase()));
        break;
    case FilterProjectEnum.Personal:
        if (state) {
            // This is my number for test: users[0]
            filteredProject = [...projects].filter(project =>
                project.team.group.some(user => user.id === users[0].id));
        } else {
            filteredProject = [...projects];
        }

        break;
    case FilterProjectEnum.Recent:
        if (state) {
            filteredProject = [...projects].sort((a, b) => {
                const dateA = a.createdDate.getTime();
                const dateB = b.createdDate.getTime();

                return dateA - dateB;
            });
        } else {
            filteredProject = [...projects].sort((a, b) => {
                const dateA = a.createdDate.getTime();
                const dateB = b.createdDate.getTime();

                return dateB - dateA;
            });
        }
        break;
    default:
        break;
    }
    return filteredProject;
};

const getDeleteProject = async (listProjectId: string[], projectList: ProjectInterface[]): Promise<ProjectInterface[]> => {
    const newList = projectList.filter((project) => !listProjectId.includes(project.projectId));

    return newList;
};

const postNewProject = async (newProject: ProjectInterface): Promise<ProjectInterface> => {
    return newProject;
};

export {
    getAllProject,
    getProjectById,
    getFilteredProjects,
    getDeleteProject,
    postNewProject,
};