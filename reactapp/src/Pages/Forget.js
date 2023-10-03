import React, { useState } from "react";
import "./Forget.css";
import { useNavigate } from "react-router-dom";

function Forget() {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 const navigate=useNavigate();
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setResetPassword(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password reset successfully!");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setResetPassword(false);
  };
 const handleForgetLogin=()=>
 {
    navigate('/');
 }
  return (
    <div className="Forget">
      <h1>Forgot Password</h1>
      {resetPassword ? (
        <form className='Forget1' onSubmit={handlePasswordSubmit}>
          <input 
          className="input2"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
          className="input2"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={handleForgetLogin}>Reset Password</button>
        </form>
      ) : (
        <form  className='Forget1' onSubmit={handleEmailSubmit}>
          <input
          className="input2"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Forget;
