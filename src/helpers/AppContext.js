import React, { createContext, useState } from 'react';

export const appContext = createContext({});

const AppContext = props => {
    const [favourites, setfavourites] = useState([]);

    const saveToFavourites = data => {
        setfavourites((prevState) => {
            prevState.push(data);
            return [...prevState]
        })
    };

    return (
        <appContext.Provider
            value={{
                favourites,
                saveToFavourites,
            }}
            {...props}
        />
    );
};

export default AppContext;