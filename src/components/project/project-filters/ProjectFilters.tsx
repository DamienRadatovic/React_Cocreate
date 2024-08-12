import './ProjectFilters.css';
import InputText from '@/components/general/input-text/InputText.tsx';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import { SvgCheckUser, SvgRecent } from '@/components/general/svg/SvgComponent.tsx';
import { useState } from 'react';
import { useProject } from '@/contexts/project.context.tsx';
import FilterProjectEnum from '@/enums/filter-project.enum.ts';

const ProjectFilters = () => {
    const { filterTaskByName, filterByType } = useProject();
    const [isCheckMyProjects, setIsCheckMyProjects] = useState<boolean>(false);
    const [isCheckRecent, setIsCheckRecent] = useState<boolean>(false);

    const handleChangeSearchValue = (value: string) => {
        filterTaskByName(value);
        setIsCheckMyProjects(false);
        setIsCheckRecent(false);
    };

    const handleClickSelectMyProject = () => {
        setIsCheckMyProjects((prev) => !prev);
        //filterProjects(FilterProjectEnum.Personal, '', isCheckMyProjects);
        filterByType(FilterProjectEnum.Personal, isCheckMyProjects);
    };

    const handleClickFilterRecent = () => {
        setIsCheckRecent((prev) => !prev);
        ///filterProjects(FilterProjectEnum.Recent, '', isCheckRecent);
        filterByType(FilterProjectEnum.Recent, isCheckRecent);
    };

    return <>
        <div className="project-filters-container">
            <InputText
                placeholder="Search task"
                onChangeValue={handleChangeSearchValue}
            />
            <div className="project-filters-actions-buttons">
                <div className={isCheckMyProjects ? 'active-project-filter' : ''}>
                    <ActionButton onClickButton={handleClickSelectMyProject} type="simple">
                        <SvgCheckUser />
                        <p>My tasks</p>
                    </ActionButton>
                </div>
                <div className={isCheckRecent ? 'active-project-filter' : ''}>
                    <ActionButton onClickButton={handleClickFilterRecent} type="simple">
                        <SvgRecent />
                        <p>Recent</p>
                    </ActionButton>
                </div>
            </div>
        </div>
    </>;
};

export default ProjectFilters;
