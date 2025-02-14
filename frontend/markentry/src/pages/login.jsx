import React from 'react'
import { useState } from 'react'



  const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
  
      const handleSubmit = async (e) => {
          e.preventDefault();
  
          try {
              const response = await fetch('http://localhost:4000/api/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, password }),
              });
  
              const data = await response.json();
              if (response.ok) {
                  alert(data.message);
                  setEmail('');
                  setPassword('');
              } else {
                  alert(data.message);
              }
          } catch (error) {
              console.error('Error:', error);
              alert('Something went wrong!');
          }
      };
  
      return (
          <div className="login-container">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                  <div>
                      <label>Email:</label>
                      <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <label>Password:</label>
                      <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  
                  <button type="submit">Submit</button>
                  
              </form>
          </div>
      );
  };
  
  export default Login;