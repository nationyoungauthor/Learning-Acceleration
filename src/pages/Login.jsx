import React from 'react';
import AuthForm from '../components/auth/AuthForm';

const Login = ({ initialIsSignUp = false }) => {
  return <AuthForm mode={initialIsSignUp ? 'signup' : 'signin'} />;
};

export default Login;
