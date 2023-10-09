// imports from react
import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import{Link,useNavigate} from 'react-router-dom';
 // import firebase config app
import app  from '../config'
// import from Firebase
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth'


// App component
function Signup() {
  // email value
  const [email, setEmail] = useState('')
  // password value
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLasttName] = useState('')
  const navigate = useNavigate();
  // message for response
  const [msg, setmsg] = useState('Login Now')
  // function to singUP user
  const SignUP = (event) => {
    event.preventDefault();
    // getAuth object
    const authentication = getAuth(app)
    // signIn
    createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        setmsg('Login Successful')
        // set token in local storage for a successful login
        updateProfile(authentication.currentUser, {
         displayName: firstName+' '+lastName
        }).then(() =>
        navigate("/") )
      })
      .catch((error) => {
        // error handling based on error code
        console.log(error.code)
        if (error.code === 'auth/wrong-password') {
          setmsg('Please check the Password')
        }
        if (error.code === 'auth/user-not-found') {
          setmsg('Account not found. Please check your Email')
        }
      })
  }
  return (
    <div className="App">
       <Grid container component="main" className="test">
      <Grid item xs={12} sm={8} md={5} component={Box} p={5}>
        <div className="paper">
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" onSubmit={SignUP}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="name"
              autoFocus
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="Last name"
              autoFocus
              value={lastName}
              onChange={(event) => setLasttName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
           <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link to="/login">
                  {"Already have an account Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    </div>
  )
}
// export app component
export default Signup
