import './TaskDetail.css';
import { useProject } from '@/contexts/project.context.tsx';
import { useEffect, useState } from 'react';
import { SvgCross } from '@/components/general/svg/SvgComponent.tsx';
import { DateTime } from 'luxon';
import AddComment from '@/components/project/add-comment/AddComment.tsx';

const TaskDetail = () => {
    const [showData, setShowData] = useState<boolean>(false);
    const { detailTask, setTask, addComment } = useProject();

    const handleClickCloseDetail = (): void => {
        setTask(null);
    };

    const formatDate = (date: Date|null|undefined): string => {
        if (date) {
            return DateTime.fromJSDate(date).toFormat('MMM dd, yyyy • t');
        } return '-';
    };

    const handleSendComment = (value: string) => {
        addComment(value);
    };

    useEffect(() => {
        setShowData(true);

        return () => {
            setShowData(false);
        };
    }, []);

    return <>
        <div className={`detail-projects-bottom-right-container ${detailTask ? 'detail-projects-bottom-right-open' : 'detail-projects-bottom-right-close'}`}>
            <div className={`task-detail-container ${showData ? 'show' : 'hidden'}`}>
                <div className="detail-header">
                    <h3>{detailTask?.name}</h3>
                    <div className="close-btn" onClick={handleClickCloseDetail}>
                        <SvgCross/>
                    </div>
                </div>
                <div className="detail-content">
                    <h3>Details</h3>
                    <div className="content">
                        <h3 className="title">Team:</h3>
                        <h3>{detailTask?.team.name}</h3>
                    </div>
                    <div className="content">
                        <h3 className="title">Status:</h3>
                        <h3 className={detailTask?.status}>{detailTask?.status}</h3>
                    </div>
                    <div className="content">
                        <h3 className="title">Lead:</h3>
                        <h3>
                            <p>
                                {
                                    detailTask?.lead?.image ?
                                        <img src={detailTask.lead.image} alt="user-image"/>
                                        :
                                        <img
                                            src='https://cdn.allmylinks.com/prod/User/photo/I/_/-/HSF9tPcmEmHBeXWgDg1gSn6eSHNQJXUS.jpg'
                                            alt="generic-user-image"/>
                                }
                            </p>
                            {detailTask?.lead.name}
                        </h3>
                    </div>
                    <div className="content">
                        <h3 className="title">Assignee:</h3>
                        <h3>
                            <p>
                                {
                                    detailTask?.assign?.image ?
                                        <img src={detailTask.assign.image} alt="user-image"/>
                                        :
                                        <img
                                            src="https://cdn.allmylinks.com/prod/User/photo/I/_/-/HSF9tPcmEmHBeXWgDg1gSn6eSHNQJXUS.jpg"
                                            alt="generic-user-image"/>
                                }
                            </p>
                            {detailTask?.assign.name}
                        </h3>
                    </div>
                </div>
                <div className="detail-content">
                    <h3>Dates</h3>
                    <div className="content">
                        <h3 className="title">Created:</h3>
                        <h3>{formatDate(detailTask?.createdDate)}</h3>
                    </div>
                    <div className="content">
                        <h3 className="title">Updated:</h3>
                        <h3>{formatDate(detailTask?.updatedDate)}</h3>
                    </div>
                    <div className="content">
                        <h3 className="title">Deadline:</h3>
                        <h3>{formatDate(detailTask?.deadline)}</h3>
                    </div>
                </div>
                <div className="detail-content">
                    <h3>Description</h3>
                    <div className="content description">
                        <h3>{detailTask?.description}</h3>
                    </div>
                </div>
                <div className="detail-content details-comments">
                    <h3>Comments</h3>
                    <div className="content comments">
                        {
                            detailTask?.comments && detailTask.comments.length > 0 ?
                                <>
                                    {
                                        detailTask?.comments.map((comment) => (
                                            <div className="comment" key={comment.id}>
                                                <div className="comment-information">
                                                    <h4>By <p>{comment.owner.name}</p> at <p>{DateTime.fromJSDate(comment.createdDate).toLocaleString(DateTime.DATETIME_SHORT)}</p>
                                                    </h4>
                                                </div>
                                                <div className="comment-content">
                                                    <h4>{comment.message}</h4>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    <h3 className="no-comments">There are no comments yet</h3>
                                </>
                        }
                        <AddComment onSendComment={handleSendComment} />
                    </div>
                </div>
            </div>
        </div>

    </>;
};

export default TaskDetail;
