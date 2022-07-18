import React, {useMemo, useState} from "react";

const AppContext = React.createContext(undefined);
export const AppConsumer = AppContext.Consumer;

const AppProvider = props => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const context = useMemo(() => {

        const saveToken = (response) => {
            if (response.token !== undefined) {
                localStorage.setItem('token', response.token);
                setToken(response.token);
            }
        }

        const deleteToken = () => {
            localStorage.removeItem('token');
            console.log("delete token ahora vale: " + localStorage.getItem('token'))
            setToken(undefined);
        }

        return ({
            token,
            saveToken: saveToken,
            deleteToken: deleteToken
        });
    }, [token, setToken]);

    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
}


export {AppProvider};



