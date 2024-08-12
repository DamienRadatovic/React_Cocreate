import './AddComment.css';
import { useState } from 'react';
import { SvgArrowLong } from '@/components/general/svg/SvgComponent.tsx';

interface Props {
    onSendComment: (value: string) => void;
}

const AddComment = ({ onSendComment }: Props) => {
    const [inputValue, setInputValue] = useState('');

    const handleSendComment = () => {
        onSendComment(inputValue);
        setInputValue('');
    };
    
    return <>
        <div className="add-comment-container">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="add-comment-input"
                type="text"
                placeholder="Leave a comment"
            />
            <div className="send-comment" onClick={handleSendComment}>
                <SvgArrowLong />   
            </div>
        </div>
    </>;
};

export default AddComment;