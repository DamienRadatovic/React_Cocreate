const generalSearch = async (value: string, activeSettings: string[]): Promise<{ id: string, text: string }[]> => {
    console.log(`GeneralSearch with value: ${value} and this settings: ${activeSettings}`);
    return [
        {
            id: 'super-id',
            text: 'Element de ma recherche '
        }
    ];
};

export {
    generalSearch,
};