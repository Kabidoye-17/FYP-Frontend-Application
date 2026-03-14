import { useState } from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';
import Input from '../design_system/Input';
import Button from '../design_system/Button';
import Icon from '../design_system/Icon';
import Heading from '../design_system/Heading';
import Label from '../design_system/Label';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../services/api.service';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-top: 5rem;
    padding-bottom: 2rem;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 1.5rem;
`;

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

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function SignUpForm() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
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
      await signup({ name, email, password });
      showToast.success('Sign Up Successful');
      navigate('/home', { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          showToast.error('An account with this email already exists');
        } else {
          showToast.error(error.message || 'Sign up failed');
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
      <Heading>Sign Up</Heading>
      <FormContainer onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label color="var(--plum)" backgroundColor="transparent">
            Name
          </Label>
          <Input
            placeholder="Enter your name here"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </LabelInputContainer>
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
        <LabelInputContainer>
          <Label color="var(--plum)" backgroundColor="transparent">
            Confirm Password
          </Label>
          <Input
            placeholder="Confirm your password here"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
        </LabelInputContainer>
        <Button
          type="submit"
          backgroundColor="var(--tan)"
          color="var(--white)"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Submit'}
        </Button>
      </FormContainer>
      <Toaster />
    </MainContainer>
  );
}

export default SignUpForm;
