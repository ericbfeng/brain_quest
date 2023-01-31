import React, {useState} from 'react';
import '../styles/RegistrationForm.css'

export default function RegistrationForm() {    
    const [userName, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "userName"){
            setUsername(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        if(confirmPassword !== password){
          alert("Passwords do not match!");
          return;
        }

        fetch(`/register`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            userName: userName,
            password: password
          })
        })
        .then((res) => {
          if(!res.ok) throw new Error(res.statusText);
          else return res.json();
        })
        .then(
          (result) => alert("Registration success!"),
          (error) => alert("Registration failed: " + error.message)
        )
    }

    const shouldDisableRegistration = () => {
      // All required fields should be provided by the user.
      // If not, then they shouldn't be able to click the register button.
      return !(userName && password && confirmPassword);
    }

    return(
        <div className="form">
            <div className="form-body">
              <input placeholder="Username" id="userName" className="form__input" value={userName} onChange = {(e) => handleInputChange(e)}/>
              <input placeholder="Password" id="password" className="form__input" type="password" value={password} onChange = {(e) => handleInputChange(e)}/>
              <input placeholder="Confirm Password"  id="confirmPassword" className="form__input" type="password" value={confirmPassword} onChange = {(e) => handleInputChange(e)}/>
            </div>  
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn" disabled={shouldDisableRegistration()}>Register</button>
            </div>
        </div>
       
    )       
}