import { useState } from 'react';
import Input from '../design_system/Input';
import Button from '../design_system/Button';
import Icon from '../design_system/Icon';
import Heading from '../design_system/Heading';
import Label from '../design_system/Label';
import { showToast } from '../utils/toast';
import { Toaster } from 'react-hot-toast';
import { MainContainer, IconContainer, FormContainer } from './SignUpForm';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../services/api.service';

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const ErrorText = styled.span`
  color: var(--error);
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
`;

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Get the page they were trying to visit (if any)
  const from = location.state?.from?.pathname || '/home';

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({ email, password });
      showToast.success('Login Successful');
      // Redirect to the page they were trying to visit, or home
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          showToast.error('Invalid email or password');
        } else {
          showToast.error(error.message || 'Login failed');
        }
      } else {
        showToast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <MainContainer>
      <IconContainer>
        <Icon name="HourglassHigh" size={56} color="var(--plum)" weight="regular" />
      </IconContainer>
      <Heading>Login</Heading>
      <FormContainer onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label color="var(--plum)" backgroundColor="transparent">
            Email
          </Label>
          <Input
            placeholder="Enter your email here"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label color="var(--plum)" backgroundColor="transparent">
            Password
          </Label>
          <Input
            placeholder="Enter your password here"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </LabelInputContainer>
        <Button
          type="submit"
          backgroundColor="var(--tan)"
          color="var(--white)"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Submit'}
        </Button>
      </FormContainer>
      <Toaster />
    </MainContainer>
  );
}

export default LoginForm;
