import React from 'react';
import {AppProvider} from "./contexts/AppContext";
import AppRoutes from "./routes/AppRoutes"

const App = () => {
    return (
        <AppProvider>
            <AppRoutes/>
        </AppProvider>
    )
}

export default App;
