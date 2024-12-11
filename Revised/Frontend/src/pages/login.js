import React, {useState} from "react"; 
import Axios from "axios"; 
import { useNavigate } from "react-router-dom";

function Login() {

    const [userName, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate(); 


    const login = (e) => {
        e.preventDefault(); 

        setErrorMessage(''); 

        if (!userName || !password) {
            setErrorMessage('Please make sure all fields are complete!'); 
            return;
        }
        Axios.post("http://localhost:3001/login", {
            userName: userName, 
            password: password 
        }).then((response) => {
            if(response.data.message){
                setErrorMessage(response.data.message || 'An error occurred during registration. Please try again!');
            } else {
                navigate('/dashboard');
            }
        })
    }

    return(
    <div className="container">
        <div className="loginForm">
            <form>
                <h4>Login Here</h4>
                <label htmlFor="username">UserName</label>
                <input className="textInput" 
                    type="text" 
                    name="username" 
                    onChange={(e) => {setUsername(e.target.value)}}  
                    placeholder="Enter your Username" 
                    required />
                <label htmlFor="password">Password</label>
                <input className="textInput" 
                    type="password" 
                    name="password" 
                    onChange={(e) => {setPassword(e.target.value)}} 
                    placeholder="Enter your Password" 
                    required />
                <input className="button" 
                    type="submit" 
                    onClick={login} 
                    value="Login" />
                <h1 style={{color: 'red', 
                    fontSize: '15px', 
                    textAlign: 'center', 
                    marginTop: '20px'}}>
                        {errorMessage}
                </h1>
            </form>
        </div>
    </div>
    )
}

export default Login; 