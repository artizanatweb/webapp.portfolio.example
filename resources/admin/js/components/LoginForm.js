import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, InputLabel, Input, InputAdornment, IconButton, FormControlLabel, Switch, Button, H1 } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import SyncIcon from '@material-ui/icons/Sync';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import clsx from "clsx";
import * as storeActions from "./../stores/actions";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
    },
    noHover: {
        "&:hover": {
            backgroundColor: "transparent",
            outline: 'none',
        },
        "&:active": {
            backgroundColor: "transparent",
            outline: 'none',
        },
        "&:focus": {
            backgroundColor: "transparent",
            outline: 'none',
        }
    },
    input: {
        color: 'white',
    }
}));

const LoginForm = (props) => {
    const classes = useStyles();
    const authentication = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const emailElementRef = useRef(null);
    const passwordElementRef = useRef(null);

    useEffect(() => {
        const handleReturn = (event) => {
            if (event.keyCode === 13) {
                loginHandler();
            }
        };

        window.addEventListener('keydown', handleReturn);

        return () => {
            window.removeEventListener('keydown', handleReturn);
        };
    }, []);

    useEffect(() => {
        if (authentication.validating) {
            return;
        }

        if (authentication.invalidEmail) {
            emailElementRef.current.focus();
            return;
        }

        if (authentication.invalidPassword) {
            passwordElementRef.current.focus();
            return;
        }
    });

    useEffect(() => {
        setTimeout(() => {
            emailElementRef.current.focus();
        }, 500);
    }, []);

    const formVariants = {
        show: {
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        initial: {
            opacity: 0,
        },
        exit: {
            // opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: "easeIn" }
        }
    };

    const emailHandler = (evt) => {
        let email = evt.target.value;
        dispatch(storeActions.authEmailChanged(email));
    };
    const handleMouseDownEmail = (event) => {
        event.preventDefault();
        emailElementRef.current.focus();
    };
    const userIconHandler = (event) => {
        event.preventDefault();
        passwordElementRef.current.focus();
    };
    const passwordHandler = (evt) => {
        let password = evt.target.value;
        dispatch(storeActions.authPasswordChanged(password));
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        passwordElementRef.current.focus();
    };
    const showPasswordHandler = () => {
        dispatch(storeActions.authShowPassword(!authentication.showPassword));
        passwordElementRef.current.focus();
    };
    const loginHandler = () => {
        if (authentication.validating) {
            return;
        }

        if (!(authentication.user === null)) {
            return;
        }

        dispatch(storeActions.requestUserAuthentication());
    };
    const getLoginButton = () => {
        let buttonText = "Login";
        let buttonIcon = null;
        if (authentication.validating) {
            buttonText = "Validating...";
            buttonIcon = <SyncIcon className={"spinIcon"} />;
        }

        if (!(authentication.user === null)) {
            buttonText = "logged in";
            buttonIcon = <DoneAllIcon />;
        }

        return (
            <Button
                variant={"contained"}
                color={"primary"}
                className={"loginButton"}
                size={"large"}
                onClick={loginHandler}
                startIcon={buttonIcon}>
                {buttonText}
            </Button>
        );
    };

    let showPasswordIcon = <VisibilityOffIcon color={"primary"} />;
    let passwordFieldType = "password";
    if (authentication.showPassword) {
        showPasswordIcon = <VisibilityIcon color={"primary"} />;
        passwordFieldType = "text";
    }


    return (
        <motion.div
            layout
            variants={formVariants}
            animate={"show"}
            initial={"initial"}
            exit={"exit"}
        >
            <div className={"loginFormCard"}>
                <form className={"loginForm"}>
                    <div className={"form-row"}>
                        <FormControl className={classes.textField} color={"primary"} error={(authentication.invalidEmail) ? true : false}>
                            <InputLabel htmlFor={"email-field"}>Email:</InputLabel>
                            <Input
                                id={"email-field"}
                                type={"text"}
                                value={ authentication.credentials.email }
                                onChange={emailHandler}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            onMouseDown={ handleMouseDownEmail } onFocus={userIconHandler}
                                            className={classes.noHover}
                                            disableRipple={true}
                                            disableFocusRipple={true}>
                                            <PersonIcon color={"primary"} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputRef={emailElementRef}
                            />
                        </FormControl>
                    </div>
                    <div className={"form-row"}>
                        <FormControl className={classes.textField} color={"primary"} error={(authentication.invalidPassword) ? true : false}>
                            <InputLabel htmlFor={"password-field"}>Password:</InputLabel>
                            <Input
                                id={"password-field"}
                                type={passwordFieldType}
                                value={ authentication.credentials.password }
                                onChange={passwordHandler}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            onClick={ showPasswordHandler }
                                            aria-label="toggle password visibility"
                                            onMouseDown={ handleMouseDownPassword }>
                                            { showPasswordIcon }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputRef={passwordElementRef}
                            />
                        </FormControl>
                    </div>
                    <div className={clsx("form-row", "form-button")}>
                        {getLoginButton()}
                    </div>
                </form>
            </div>
        </motion.div>
    )
};

export default LoginForm;
