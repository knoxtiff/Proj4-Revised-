import React, {useState} from "react"; 
import Axios from "axios"; 
import { useNavigate } from "react-router-dom";
import RequiredCheckbox from "./reqckbx";

function Reg() {

    const [userName, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); 
    const [handleSubmit, setHandleSubmit] = useState("");
    const navigate = useNavigate(); 

    const register = (e) => {
        e.preventDefault(); 

        setErrorMessage(''); 

        if (!userName || !password || !confirmPassword) {
            setErrorMessage('Please make sure all fields are complete!'); 
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('The passwords provided do not match!'); 
            return; 
        }

        Axios.post("http://localhost:3001/register", {
            userName: userName, 
            password: password 
        }).then((response) => {
            if(response.data.message){
                setErrorMessage(response.data.message || 'An error occurred during registration. Please try again!');
            } else {
                navigate('/dashboard');
            }
        })

        const handleSubmit = (event) => {
              event.preventDefault();
              if (!termsAccepted) {
                alert('Please accept the terms and conditions.');
                return;
              }
            };
    };

    

return(
    <div className="container">
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <h4>Register Here</h4>
                <label htmlFor="username">UserName</label>
                <input className="textInput" 
                    type="username" 
                    name="username" 
                    onChange={(e) => {setUsername(e.target.value)}} 
                    placeholder="Create your Username" 
                    required />
                <label htmlFor="password">Password</label>
                <input className="textInput" 
                    type="password" 
                    name="password" 
                    onChange={(e) => {setPassword(e.target.value)}} 
                    placeholder="Create your Password" 
                    required />
                <label htmlFor="password">Confirm Password</label>
                <input className="textInput" 
                    type="password" 
                    name="password" 
                    onChange={(e) => {setConfirmPassword(e.target.value)}} 
                    placeholder="Confirm your Password" 
                    required />
                <RequiredCheckbox
                    label="I agree to the terms and conditions"
                    required="true"
                    onChange={setTermsAccepted}/>
                <h1 style={{color: 'red', 
                    fontSize: '15px', 
                    textAlign: 'center', 
                    marginTop: '20px'}}>
                        {errorMessage}
                </h1>
                <input className="button" 
                    type="submit" 
                    onClick={register}
                    value="Create an Account" />
            </form>
        </div>
    </div>
    )
}

export default Reg; 