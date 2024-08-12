import './LogList.css';
import LogElement from '../log-element/LogElement.tsx';
import { useEffect, useState } from 'react';
import { getLogList } from '@/api/log.api.ts';
import LogInterface from '@/interfaces/log.interface.ts';
import { useProject } from '@/contexts/project.context.tsx';
import HeaderProjectContent from '@/components/project/header-project-content/HeaderProjectContent.tsx';
import ProjectFilters from '@/components/project/project-filters/ProjectFilters.tsx';

const LogList = () => {
    const { project, detailTask } = useProject();
    const [logList, setLogList] = useState<LogInterface[]>([]);

    useEffect(() => {
        if (project?.projectId) {
            try {
                getLogList(project?.projectId).then((response: LogInterface[]) => {
                    setLogList(response);
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            throw Error('ProjectId not Found');
        }
    }, []);
    
    return <>
        <div className={`detail-projects-bottom-left-container ${detailTask ? 'detail-projects-bottom-left-open' : 'detail-projects-bottom-left-close'}`}>
            <HeaderProjectContent />
            <ProjectFilters />
            <div className="log-list-container">
                {
                    logList.map((log) => (
                        <LogElement key={log.logId} log={log}/>
                    ))
                }
            </div>
        </div>
    </>;
};

export default LogList;