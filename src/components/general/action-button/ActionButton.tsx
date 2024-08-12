import './ActionButton.css';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    onClickButton: () => void,
    type: 'fill' | 'stroke' | 'simple' | 'empty',
}

const ActionButton = ({ children, onClickButton, type }: Props) => {
    return <>
        <div
            className={`action-button-container ${type}`}
            onClick={onClickButton}
        >
            { children }
        </div>
    </>;
};

export default ActionButton;