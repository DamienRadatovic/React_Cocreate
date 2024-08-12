import './TableProjects.css';
import { useEffect } from 'react';
import ProjectInterface from '@/interfaces/project.interface.ts';
import ProjectItem from '@/components/project/project-item/ProjectItem.tsx';
import { useProjects } from '@/contexts/projects.context.tsx';
import { getAllProject } from '@/api/project.api.ts';
import CheckBox from '@/components/general/checkbox/CheckBox.tsx';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const TableProjects = () => {
    const navigate: NavigateFunction = useNavigate();
    
    const {
        projects,
        selectedItemList,
        isAllChecked,
        setAllProjects,
        selectListItem,
        setAllChecked,
    } = useProjects();

    const handleCheckAllProjects = (state: boolean): void => {
        setAllChecked(state);

        if (state) {
            selectListItem([...projects]);
        } else {
            selectListItem([]);
        }
    };

    const handleCheckItem = (state: boolean, itemCheck: ProjectInterface): void => {
        if (state) {
            const newList: ProjectInterface[] = [
                ...selectedItemList,
                itemCheck,
            ];

            if (newList.length === projects.length) {
                setAllChecked(true);
            } else {
                setAllChecked(false);
            }

            selectListItem(newList);
        } else {
            if (isAllChecked) {
                setAllChecked(false);
            }

            selectListItem(selectedItemList.filter((item: ProjectInterface) => item.projectId !== itemCheck.projectId));
        }
    };
    
    const itemIsSelected = (projectId: string): boolean => {
        return selectedItemList.some((item) => item.projectId === projectId);
    };

    const handleClickDirectItem = (projectId: string): void => {
        navigate(`/projects/${projectId}`);
    };

    useEffect(() => {
        try {
            getAllProject().then((response: ProjectInterface[]) => {
                setAllProjects(response);
            });
        } catch (e) {
            console.error(e);
        }
    }, []);

    return <>
        <div className="table-container">
            <table className="table-list-container">
                <thead>
                    <tr>
                        <th className="select" scope="col">
                            <div className="select-container">
                                <CheckBox state={isAllChecked} onChangSelected={(state: boolean) => {
                                    if (projects.length > 0) {
                                        handleCheckAllProjects(state);
                                    }
                                }}  value={''}/>
                            </div>
                        </th>
                        <th className="name" scope="col">Project</th>
                        <th className="createdDate" scope="col">Created date</th>
                        <th className="updatedDate" scope="col">Updated date</th>
                        <th className="owner" scope="col">Owner</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((project: ProjectInterface) => (
                            <tr
                                key={project.projectId}
                                className="project-container"
                                onClick={() => handleClickDirectItem(project.projectId)}
                            >
                                <ProjectItem
                                    isSelected={itemIsSelected(project.projectId)}
                                    onCheckItem={(state) => handleCheckItem(state, project)}
                                    project={project}
                                />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>;
};

export default TableProjects;