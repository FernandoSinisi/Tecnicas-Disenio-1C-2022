import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, IconButton, Toolbar} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = (props) => {
    const navigate = useNavigate();

    const redirectProductScreen = () => navigate("/products");

    const closeSession = () => {
        props.deleteToken();
        navigate("/")
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <div style={{display: "flex", flex:"auto", justifyContent:"space-between"}}>
                        <Button className="homepage" onClick={redirectProductScreen}
                                variant="themed" style={{color: 'black'}}
                        >Productos</Button>

                        <IconButton component="span"
                                    className="homepage"
                                    style={{color: 'white'}}
                                    onClick={closeSession}>
                            <LogoutIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
