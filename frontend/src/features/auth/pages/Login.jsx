import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/Login.scss';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');

    try {
      // Replace with your actual API call
      // const response = await login(data.email, data.password);
      
      console.log('Login Data:', data);
      alert(`✅ Welcome back, book lover! Logging in...`);
      reset();
      
      // Redirect after login
      // window.location.href = '/dashboard';
      
    } catch (error) {
      setApiError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Blurred background with books */}
      <div className="background-books">
        <div className="book book-1"></div>
        <div className="book book-2"></div>
        <div className="book book-3"></div>
        <div className="book book-4"></div>
        <div className="book book-5"></div>
      </div>

      {/* Glassmorphism container */}
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Share books, Find stories</p>
          </div>

          {apiError && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                {/* <span className="input-icon">✉️</span> */}
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className={errors.email ? 'input-error' : ''}
                />
              </div>
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className={errors.password ? 'input-error' : ''}
                />
              </div>
              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                'Login to BookSwap'
              )}
            </button>
          </form>

          <div className="divider">or</div>

          <div className="social-login">
            <button className="social-btn google">Google</button>
            <button className="social-btn github">GitHub</button>
          </div>

          <div className="auth-footer">
            <p>
              New to BookSwap?{' '}
              <a href="/register" className="auth-link">Create an account</a>
            </p>
            <a href="/forgot-password" className="forgot-link">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;