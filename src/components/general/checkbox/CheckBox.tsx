import './CheckBox.css';

interface Props {
    state: boolean,
    value: string,
    label?: string
    onChangSelected: (state: boolean, value: string) => void,
}

const CheckBox = ({ state, value, label, onChangSelected }: Props) => {
    return <>
        <div
            className={`checkbox-container ${state ? 'active-checkbox' : 'inactive-checkbox'}`}
            onClick={(event) => {
                event.stopPropagation();
                onChangSelected(!state, value);
            }}
        >
            <label className="checkBox">
                <input
                    id="ch1"
                    type="checkbox"
                    checked={state}
                    onChange={(event) => { event.stopPropagation(); }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                />
                <div className="transition"></div>
            </label>
            { label ? <h3>{ label }</h3> : null }
        </div>
    </>;
};

export default CheckBox;