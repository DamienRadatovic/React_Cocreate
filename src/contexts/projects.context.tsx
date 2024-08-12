import { createContext, ReactNode, useContext, useState } from 'react';
import ProjectInterface from '@/interfaces/project.interface.ts';
import FilterProjectEnum from '@/enums/filter-project.enum.ts';
import { getDeleteProject, getFilteredProjects, postNewProject } from '@/api/project.api.ts';
import { teams, users } from '@/static.data.ts';

interface ProjectsContextType {
    projects: ProjectInterface[],
    selectedItemList: ProjectInterface[],
    isAllChecked: boolean,
    setAllProjects: (allProjects: ProjectInterface[]) => void,
    selectListItem: (item: ProjectInterface[]) => void,
    filterProjects: (type: FilterProjectEnum, value: string, state?: boolean) => void,
    deleteProject: (listItem: ProjectInterface[]) => void,
    setAllChecked: (state: boolean) => void,
    createNewProject: () => void,
}

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const ProjectsProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    const [selectedItemList, setSelectedItemList] = useState<ProjectInterface[]>([]);
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

    const setAllProjects = (allProjects: ProjectInterface[]): void => {
        setProjects(allProjects);  
    };

    const selectListItem = (listItem: ProjectInterface[]): void => {
        setSelectedItemList(listItem);
    };

    const setAllChecked = (state: boolean): void => {
        setIsAllChecked(state);
    };

    const filterProjects = async (type: FilterProjectEnum, value: string, state?: boolean): Promise<void> => {
        getFilteredProjects(type, value, state).then((response: ProjectInterface[]) => {
            setProjects(response);
        });
    };

    const deleteProject = (listItem: ProjectInterface[]): void => {
        const listProjectId = listItem.map((elt) => elt.projectId);
        getDeleteProject(listProjectId, projects).then((response: ProjectInterface[]) => {
            setProjects(response);

            if (response.length === 0) {
                setSelectedItemList([]);
                setIsAllChecked(false);
            }
        });
    };

    const createNewProject = (): void => {
        const id: string = crypto.randomUUID();
        const newProject: ProjectInterface = {
            projectId: id,
            name: `Nouveau Project ${id}`,
            createdDate: new Date(2024, 0, Math.random() * (30 - 1) + 1),
            updatedDate: null,
            owner: users[0],
            team: teams[1],
        };
        
        postNewProject(newProject).then((response: ProjectInterface) => {
            setProjects((prev) => prev.concat(response));
        });
    };

    return <>
        <ProjectsContext.Provider value={{
            projects,
            selectedItemList,
            isAllChecked,
            setAllProjects,
            selectListItem,
            filterProjects,
            deleteProject,
            setAllChecked,
            createNewProject,
        }}>
            { children }
        </ProjectsContext.Provider>
    </>;
};

export default ProjectsProvider;

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error('useProjects must be used within an ProjectsProvider');
    }
    return context;
};