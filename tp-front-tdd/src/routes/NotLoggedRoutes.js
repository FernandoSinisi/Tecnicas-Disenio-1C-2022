import {Route, Routes} from "react-router-dom";
import SingUpScreen from "../screens/SingUpScreen";
import LoginScreen from "../screens/LoginScreen";

const NotLoggedRoutes = props => {
    return (
        <div>
            <Routes>
                <Route exact path={"/"} element={<LoginScreen {...props}/>}> </Route>

                <Route exact path={"/products"} element={<LoginScreen {...props}/>}> </Route>

                <Route exact path={"/signin"} element={<LoginScreen {...props}/>}> </Route>

                <Route exact path={"/singup"} element={<SingUpScreen {...props}/>}> </Route>

            </Routes>
        </div>
    );
}

export default NotLoggedRoutes;
