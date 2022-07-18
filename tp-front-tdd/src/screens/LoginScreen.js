import {Box, Button, Container, createTheme, CssBaseline, Grid, Link, TextField} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {useEffect, useState} from "react";
import {areAnyUndefined} from "../utils/Utils";
import {useNavigate} from "react-router-dom";

const LoginScreen = props => {
    const navigate = useNavigate();
    const [theme] = useState(createTheme());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.body.style.backgroundColor = "#ffffff";
    }, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    async function handleSignIn() {
        if (areAnyUndefined([email, password])) {
            alert("Por favor complete todos los campos.");
            return;
        }

        let requestBody = {
            email,
            password
        };

        const response = await fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        }).catch((err) => {
            console.log(err);
            alert("No se pudo loguear. Intente más tarde")
        })

        if (response === undefined) return;
        const resStatus = response.status;

        if (resStatus >= 200 && resStatus < 300) {
            const data = await response.json();
            props.saveToken(data);
            navigate("/products")
        } else if (resStatus >= 400 && resStatus < 500) {
            const errorMsg = await response.text();
            alert(errorMsg)
        } else {
            alert("No se pudo loguear. Intente más tarde 1")
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" style={{alignItems: "center", justifyContent: "center"}}>
                <CssBaseline/>
                <Box sx={loginStyles.boxStyle}>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            onChange={handleEmailChange}
                            value={email}
                            margin="normal"
                            required
                            fullWidth
                            label="Correo"
                            name="email"
                            autoFocus
                            style={{backgroundColor: '#ffffff'}}
                        />

                        <TextField
                            onChange={handlePasswordChange}
                            value={password}
                            margin="normal"
                            required
                            fullWidth
                            name="password-field"
                            label="Contraseña"
                            type="password"
                            style={{backgroundColor: '#ffffff'}}
                        />

                        <Button
                            onClick={handleSignIn}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Ingresar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href={"singup"} variant="body2">
                                    Registrarse
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const loginStyles = {
    boxStyle: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}

export default LoginScreen;
