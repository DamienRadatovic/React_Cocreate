import './InputText.css';
import { SvgSearch } from '@/components/general/svg/SvgComponent.tsx';
import { ChangeEvent, useState } from 'react';

interface InputTextProps {
    placeholder: string;
    onChangeValue: (value: string) => void;
    onFocus?: (state: boolean) => void;
}

const InputText = (props: InputTextProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        props.onChangeValue(e.currentTarget.value);
    };

    const onFocusElement = (state: boolean): void => {
        setIsFocused(state);
        props.onFocus?.(state);
    };
    
    return <>
        <div className="input-text">
            <div className={`search-svg ${isFocused ? 'focus-svg' : 'unFocus-svg'}`}>
                <SvgSearch/>
            </div>
            <input
                type="text"
                placeholder={props.placeholder}
                value={inputValue}
                onChange={handleChangeInputValue}
                onFocus={() => onFocusElement(true)}
                onBlur={() => onFocusElement(false)}
            />
        </div>
    </>;
};

export default InputText;