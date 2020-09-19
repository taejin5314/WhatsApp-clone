import React, { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import './Login.css'
import SearchIcon from '@material-ui/icons/Search';
import { db, auth } from '../../firebase';
import { GoogleLogin } from 'react-google-login';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';

function Login() {
    const [{ user, signUpStatus }, dispatch] = useStateValue();

    const history = useHistory();

    const [LoginEmail, setLoginEmail] = useState('');
    const [LoginPassword, setLoginPassword] = useState('');

    const [RegisterName, setRegisterName] = useState('');
    const [RegisterEmail, setRegisterEmail] = useState('');
    const [RegisterPassword, setRegisterPassword] = useState('');
    const [RegisterConfirm, setRegisterConfirm] = useState('');
    const [Disabled, setDisabled] = useState(true)

    const responseGoogle = (response) => {
        console.log(response);
    }


    const signIn = () => {
        dispatch({
            type: "SIGN_IN",
        })
    }

    const signUp = () => {
        dispatch({
            type: "SIGN_UP",
        })
    }

    const login = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(LoginEmail, LoginPassword)
            .then((auth) => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = async (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(RegisterEmail, RegisterPassword)
            .then(function () {
                var user = auth.currentUser;
                user.updateProfile({
                    displayName: RegisterName,
                })
                alert('Your account is created!')
            })
            .then(await function () {
                axios.post('/users/new', {
                    name: RegisterName,
                })
            })
            .catch(error => alert(error.message))


    }

    return (
        <div className="login">

            <div className="login__left">
                <div className="login__leftHeader">
                    <img src="https://lh3.googleusercontent.com/proxy/KCTpLHU3_7jIljZRvS81ALANPWQ15ho4tNDBa-eril0LJG0bmpGq4pvQD40NDKNzPo8nicUEiT_QmggxatoOQf0AQd6yDnV6vCLFk4ZmW4Beq-71kPk" />
                    <h2>WhatsApp</h2>
                </div>

                <div className="login__leftContainer">
                    <div className="login__signToggle">
                        <div onClick={signIn} className={signUpStatus ? "login__sign" : "login__sign focus"}>
                            <h2>LOGIN</h2>
                        </div>

                        <div onClick={signUp} className={signUpStatus ? "login__sign focus" : "login__sign"} >
                            <h2>SIGN UP</h2>
                        </div>
                    </div>

                    {!signUpStatus &&
                        <form>
                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Email" onChange={e => setLoginEmail(e.target.value)} type="email" />
                            </div>

                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Password" onChange={e => setLoginPassword(e.target.value)} type="password" />
                            </div>

                            <button className="login__loginButton" onClick={login}>Sign In</button>

                            <div className="login__separator">
                                or
                            </div>
                            <div className="login__googleLogin">
                                <GoogleLogin
                                    clientId="5432597417-b6nifpnfq6lbpccluoaknjcdtv1j4ams.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </form>
                    }

                    {signUpStatus &&
                        <form>
                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Name" onChange={e => setRegisterName(e.target.value)} type="text" />
                            </div>

                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Email" onChange={e => setRegisterEmail(e.target.value)} type="email" />
                            </div>

                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Password" onChange={e => setRegisterPassword(e.target.value)} type="password" />
                            </div>

                            <button onClick={register} className="login__loginButton">Sign Up</button>
                        </form>
                    }
                </div>
            </div>

            <div className="login__right">
                <img className="login__rightImage" src="https://techloverhd.com/wp-content/uploads/2016/04/How-to-use-WhatsApp-Web-and-keep-your-phone-connected.jpg" />
            </div>
            {/* <button onClick={addFriend}>Button</button> */}
        </div>
    )
}

export default Login
