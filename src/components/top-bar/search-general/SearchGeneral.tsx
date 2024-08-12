import './SearchGeneral.css';
import { useEffect, useState } from 'react';
import { SvgSettings } from '@/components/general/svg/SvgComponent.tsx';
import DropComponent from '@/components/general/drop-component/DropComponent.tsx';
import { generalSearch } from '@/api/search.api.ts';
import SearchSettingsInterface from '@/interfaces/search-settings.interface.ts';
import CheckBox from '@/components/general/checkbox/CheckBox.tsx';
import InputText from '@/components/general/input-text/InputText.tsx';

const SearchGeneral = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    const [isOpenSearchList, setIsOpenSearchList] = useState(false);
    const [settingList, setSettingList] = useState<SearchSettingsInterface[]>([
        { text: 'Tasks', value: 'tasks', selected: true },
        { text: 'People', value: 'users', selected: true },
        { text: 'Projects', value: 'projects', selected: true },
    ]);
    const [searchList, setSearchList] = useState<{ id: string, text: string }[]>([]);
    
    const handleChangeInputValue = (value: string) => {
        setInputValue(value);
    };
    
    const onFocusElement = (state: boolean): void => {
        if (searchList.length > 0 && state && !isOpenSearchList) {
            setIsOpenSearchList(true);
        }
        setIsFocused(state);
    };

    const handleClickOpenSettings = (): void => {
        setIsOpenSettings(true);
    };

    const handleClickCloseSearchList = (state: boolean): void => {
        setIsOpenSearchList(state);
    };

    const handleClickCloseSettings = (state: boolean): void => {
        setIsOpenSettings(state);
    };
    
    const handleChangeSettingsSelected = (state: boolean, value: string): void => {
        setSettingList((originalSetting) => {
            return originalSetting.map((elt) => {
                if (elt.value === value) {
                    elt.selected = state;
                }
                return elt;
            });
        });
    };

    const setGeneralSearch = (): void => {
        try {
            const activeSettings = settingList
                .filter((setting) => setting.selected)
                .map((setting) => setting.value);
            generalSearch(inputValue, activeSettings).then((response) => {
                setSearchList(response);
                setIsOpenSearchList(true);
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (inputValue.length > 0) {
            setGeneralSearch();
        }
    },[settingList]);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            if (inputValue.length > 0) {
                setGeneralSearch();
            }
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [inputValue, 500]);

    return <>
        <div className={`search-general-container ${isFocused ? 'general-focus' : 'general-unFocus'}`}>
            <div className="input-container">
                <InputText
                    placeholder="Search people, projects or tasks"
                    onChangeValue={handleChangeInputValue}
                    onFocus={onFocusElement}
                />
                {
                    isOpenSearchList &&
                    <DropComponent onCloseDrop={handleClickCloseSearchList}>
                        <ul>
                            {searchList.map((item) => (
                                <li key={item.id}>{item.text}</li>
                            ))}
                        </ul>
                    </DropComponent>
                }
            </div>
            <div
                className="search-settings-container"
            >
                <div className="setting-svg-container" onClick={handleClickOpenSettings}>
                    <SvgSettings />
                </div>
                {
                    isOpenSettings &&
                        <DropComponent onCloseDrop={handleClickCloseSettings}>
                            {
                                settingList.map((setting) => (
                                    <li key={setting.value}>
                                        <CheckBox
                                            state={setting.selected}
                                            value={setting.value}
                                            label={setting.text}
                                            onChangSelected={handleChangeSettingsSelected}
                                        />
                                    </li>
                                ))
                            }
                        </DropComponent>
                }
            </div>
        </div>
    </>;
};

export default SearchGeneral;