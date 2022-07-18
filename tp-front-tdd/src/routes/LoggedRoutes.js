import {Route, Routes} from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";

const LoggedRoutes = props => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen {...props} />}> </Route>
                <Route exact path="/products" element={<HomeScreen {...props}/>}> </Route>
            </Routes>
        </div>
    );
}

export default LoggedRoutes;
