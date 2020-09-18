import React from 'react';
import { useStateValue } from '../../StateProvider';
import './Login.css'
import SearchIcon from '@material-ui/icons/Search';
import { db, auth } from '../../firebase';
import { GoogleLogin } from 'react-google-login'

function Login() {

    const responseGoogle = (response) => {
        console.log(response);
    }

    const [{ user, signUpStatus }, dispatch] = useStateValue();

    const addFriend = () => {
        dispatch({
            type: "SET_USER",
            friend: {
                name: "Taejin"
            }
        })
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
                                <input placeholder="User Name" type="text" />
                            </div>

                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Password" type="text" />
                            </div>

                            <button className="login__loginButton">Sign In</button>

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
                                <input placeholder="User Name" type="text" />
                            </div>

                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Password" type="text" />
                            </div>
                            <div className="login__inputContainer">
                                <SearchIcon />
                                <input placeholder="Confirm Password" type="text" />
                            </div>

                            <button className="login__loginButton">Sign Up</button>
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
