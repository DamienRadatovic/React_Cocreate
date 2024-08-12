import './ProjectsFilters.css';
import InputText from '@/components/general/input-text/InputText.tsx';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import { SvgCheckUser, SvgRecent, SvgTrash } from '@/components/general/svg/SvgComponent.tsx';
import { useProjects } from '@/contexts/projects.context.tsx';
import FilterProjectEnum from '@/enums/filter-project.enum.ts';
import { useState } from 'react';

const ProjectsFilters = () => {
    const { selectedItemList, deleteProject, filterProjects } = useProjects();
    const [isCheckMyProjects, setIsCheckMyProjects] = useState<boolean>(false);
    const [isCheckRecent, setIsCheckRecent] = useState<boolean>(false);

    const handleChangeSearchValue = (value: string) => {
        filterProjects(FilterProjectEnum.Name, value);
    };

    const handleClickSelectMyProject = () => {
        setIsCheckMyProjects((prev) => !prev);
        filterProjects(FilterProjectEnum.Personal, '', isCheckMyProjects);
    };

    const handleClickFilterRecent = () => {
        setIsCheckRecent((prev) => !prev);
        filterProjects(FilterProjectEnum.Recent, '', isCheckRecent);
    };

    const handleClickDeleteProject = async (): Promise<void> => {
        deleteProject(selectedItemList);
    };

    return <>
        <div className="projects-filters-container">
            <InputText
                placeholder="Search projects"
                onChangeValue={handleChangeSearchValue}
            />
            <div className="projects-filters-actions-buttons">
                {
                    selectedItemList.length > 0 ?
                        <ActionButton onClickButton={handleClickDeleteProject} type="simple">
                            <SvgTrash />
                            <p>Delete selection</p>
                        </ActionButton> : null
                }
                <div className={isCheckMyProjects ? 'active-projects-filter' : ''}>
                    <ActionButton onClickButton={handleClickSelectMyProject} type="simple">
                        <SvgCheckUser />
                        <p>My projects</p>
                    </ActionButton>
                </div>
                <div className={isCheckRecent ? 'active-projects-filter' : ''}>
                    <ActionButton onClickButton={handleClickFilterRecent} type="simple">
                        <SvgRecent />
                        <p>Recent</p>
                    </ActionButton>
                </div>
            </div>
        </div>
    </>;
};

export default ProjectsFilters;