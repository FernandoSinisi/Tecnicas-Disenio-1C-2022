import NotLoggedRoutes from "./NotLoggedRoutes";
import {useEffect} from "react";
import LoggedRoutes from "./LoggedRoutes";
import {BrowserRouter} from "react-router-dom";
import {AppConsumer} from "../contexts/AppContext";
import NavBar from "../components/NavBar";

const AppRoutes = props => {
    useEffect(() => {

    }, []);

    if (props.token === undefined || props.token === null) {
        return (
            <div>
                <BrowserRouter>
                    <NotLoggedRoutes {...props}/>
                </BrowserRouter>
            </div>
        );
    }
    return (
        <div>
            <BrowserRouter>
                <NavBar {...props}/>
                <LoggedRoutes {...props}/>
            </BrowserRouter>
        </div>
    );

}

export default props => (
    <AppConsumer>{state => <AppRoutes {...props} {...state} />}</AppConsumer>
);
