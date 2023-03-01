import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin, googleLogout} from "@react-oauth/google"
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import jwt_decode from "jwt-decode";


const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();


  const googleSuccess = async (res) => {
    const decoded =  jwt_decode(res.credential);

    const result = {
      email: decoded?.email,
      familyName: decoded?.family_name,
      givenName: decoded?.given_name,
      id: decoded?.sub,
      picture: decoded?.picture,
      name: decoded?.name,
    };

    const token = decoded?.jti;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      const response = await fetch("http://localhost:3000/api/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: result
        })
      })

      navigate('/');
      window.location.reload();
    } catch (error) {
      return alert("There was an error while processing your request. Please try to refresh the page, if the error persists clear the chat and/or the cache.")
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');


  return (
    <Container component="main"  className='h-screen'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
          <GoogleLogin
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onError={googleError}
          />
      </Paper>
    </Container>
  );
};

export default SignUp;