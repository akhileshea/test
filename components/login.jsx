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
import {Link,useNavigate} from 'react-router-dom';
// import firebase config app
import app  from '../config'
// import from Firebase
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import GoogleIcon from '@mui/icons-material/Google';


// App component
function Login() {
  // email value
  const [email, setEmail] = useState('')
  // password value
  const [password, setPassword] = useState('')
  // message for response
  const [msg, setmsg] = useState('Login Now')
  const navigate = useNavigate();
 
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    const authentication = getAuth(app)
    signInWithPopup(authentication, googleProvider)
    .then((response) => {
      navigate("/")
    })
  }

  // function to singIn user
  const SignIN = (event) => {
    const authentication = getAuth(app)
    event.preventDefault();
    // getAuth object
    
    // signIn
    authentication.setPersistence()
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        navigate("/")
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
            Sign in
          </Typography>
          <form className="form" onSubmit={SignIN}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <div>
            Login With : 
            <GoogleIcon onClick={signInWithGoogle}/>
          </div>
        </div>
      </Grid>
    </Grid>
    </div>
  )
}
// export app component
export default Login
