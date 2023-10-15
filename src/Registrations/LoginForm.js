import React, { useState } from 'react';
import './LoginForm.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import "../colors.css"


import aud from '../images/zal8outa.mp3'

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const auth = getAuth();

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const PlayAudio = () => {
        const audio = new Audio(aud);
        audio.play();

    };

    const handleLogin = (e) => {
        e.preventDefault();
       


        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSuccessMsg('Logged in successfully,you will be redirected to the home page')
                setEmail("");
                setPassword("");
                setErrorMsg("");
                setTimeout(() => {
                    setSuccessMsg("");
                    PlayAudio();
                    navigate("/");
                }, 2000);
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === 'Firebase: Error (auth/invalid-email).' || 'Firebase: Error (auth/missing-password).') {
                    setErrorMsg('Please fill all the required fields');
                }
                if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    setErrorMsg('Please Register first/Email does not exist');
                }
                if (error.message === 'Firebase: Error (auth/wrong-password).') {
                    setErrorMsg('Password is incorrect');
                }
            })
    };

    return (
        <>
            <div className="navbar nb" >
                <h1 className="name">
                    Love & Vows
                </h1>
                <div >
                    <Link to="/" className="links">
                        <KeyboardBackspaceSharpIcon sx={{ fontSize: 50 }} style={{ color: "white" }} />
                    </Link>
                    <PermIdentityIcon sx={{ fontSize: 50 }} style={{ color: "white" }} />
                </div>
            </div>

            <div className="login-container" >
                <form className="login-form" >
                    <div className='header'>
                        <h2>Login</h2>
                    </div>

                    {successMsg && <>
                        <div className='success-msg'>
                            {successMsg}
                        </div>
                    </>}

                    {errorMsg && <>
                        <div className='error-msg'>
                            {errorMsg}
                        </div>
                    </>}

                    <div className='login-form-control'>

                        <label For="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" placeholder="Enter your email"
                            id="email" name="email"
                        />
                    </div>
                    <div className='login-form-control'>
                        <label For="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
                            id="password" name="password"
                        />
                        <span onClick={togglePasswordVisibility}>
                            {showPassword ? (
                                <FaEyeSlash color='black' />
                            ) : (
                                <FaEye color='black' />
                            )}
                        </span>
                    </div>

                    <button type="submit" onClick={handleLogin}>Login</button>

                    <h6> Don't have an account?
                        <Link to="/Signup" className="login-link-btn" >Register here.</Link>
                    </h6>
                </form>
            </div >
        </>);
};

export default LoginForm;
