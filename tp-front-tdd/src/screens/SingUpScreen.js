import {Box, Button, Container, createTheme, CssBaseline, TextField} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {useEffect, useState} from "react";
import {areAnyUndefined} from "../utils/Utils";
import {useNavigate} from "react-router-dom";

const SingUpScreen = props => {
    const navigate = useNavigate();
    const [theme] = useState(createTheme());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    useEffect(() => {
        document.body.style.backgroundColor = "#ffffff";
    }, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    async function handleSignUp() {
        if (areAnyUndefined([email, password, repeatPassword, firstName, lastName])) {
            alert("Por favor complete todos los campos.");
            return;
        }

        if (password !== repeatPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        let requestBody = {
            firstName,
            lastName,
            email,
            password
        };

        const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        }).catch((err) => {
            console.log(err);
            alert("No se pudo crear al usuario. Intente más tarde")
        })

        if (response === undefined) return;
        const resStatus = response.status;

        if (resStatus >= 200 && resStatus < 300) {
            alert("Usuario creado.")
            navigate("/signin")
        } else if (resStatus >= 400 && resStatus < 500) {
            const errorMsg = await response.text();
            alert(errorMsg)
        } else {
            alert("No se pudo crear al usuario. Intente más tarde")
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={loginStyles.boxStyle}>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            onChange={handleFirstNameChange}
                            value={firstName}
                            margin="normal"
                            required
                            fullWidth
                            label="Nombre"
                            name="firstName"
                            autoFocus
                            style={{backgroundColor: '#ffffff'}}
                        />
                        <TextField
                            onChange={handleLastNameChange}
                            value={lastName}
                            margin="normal"
                            required
                            fullWidth
                            label="Apellido"
                            name="LastName"
                            autoFocus
                            style={{backgroundColor: '#ffffff'}}
                        />
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

                        <TextField
                            onChange={handleRepeatPasswordChange}
                            value={repeatPassword}
                            margin="normal"
                            required
                            fullWidth
                            name="repeat-password-field"
                            label="Repetir Contraseña"
                            type="password"
                            style={{backgroundColor: '#ffffff'}}
                        />

                        <Button
                            onClick={handleSignUp}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Registrarse
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

const loginStyles = {
    boxStyle: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}

export default SingUpScreen;
