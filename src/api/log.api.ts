import { logList } from '../static.data.ts';
import LogInterface from '../interfaces/log.interface.ts';

const getLogList = async (projectId: string): Promise<LogInterface[]> => {
    return logList.filter((log) => log.projectId === projectId);
};

export {
    getLogList,
};