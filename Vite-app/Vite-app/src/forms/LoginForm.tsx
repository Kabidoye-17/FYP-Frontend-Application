import Input from '../design_system/Input';
import Button from '../design_system/Button';
import Icon from '../design_system/Icon';
import Heading from '../design_system/Heading';
import Label from '../design_system/Label';
import { showToast } from '../utils/toast';
import { Toaster } from 'react-hot-toast';
import { MainContainer, IconContainer, FormContainer } from './SignUpForm';
import styled from 'styled-components';

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

function LoginForm() {

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // TODO: Replace with actual validation logic
        const isValid = true;
    
        if (isValid) {
          showToast.success('Login Successful');
        } else {
          showToast.error('Invalid credentials');
        }
    };

  return (
  <MainContainer>
    <IconContainer>
        <Icon name="HourglassHigh" size={56} color="var(--plum)" weight='regular'/>
    </IconContainer>
    <Heading>Login</Heading>
    <FormContainer onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label color='var(--plum)'  backgroundColor='transparent'>Username</Label>
          <Input placeholder="Enter your username here" type='text' />
        </LabelInputContainer>
        <LabelInputContainer>
            <Label color='var(--plum)' backgroundColor='transparent'>Email</Label>
            <Input placeholder="Enter your email here" type='email' />
        </LabelInputContainer>
        <LabelInputContainer>
            <Label color='var(--plum)' backgroundColor='transparent'>Password</Label>
            <Input placeholder="Enter your password here" type='password' />
        </LabelInputContainer>
        <Button type='submit' backgroundColor='var(--tan)' color='var(--white)'> Submit </Button>
    </FormContainer>
    <Toaster />
  </MainContainer>
  );
}   
export default LoginForm;