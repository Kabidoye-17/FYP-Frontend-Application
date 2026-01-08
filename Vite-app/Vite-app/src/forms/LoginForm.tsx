import Input from '../design_system/Input';
import Button from '../design_system/Button';
import Icon from '../design_system/Icon';
import Heading from '../design_system/Heading';
import Label from '../design_system/Label';
import { showToast } from '../utils/toast';
import { Toaster } from 'react-hot-toast';
import { MainContainer, IconContainer, FormContainer } from './SignUpForm';

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
        <Label color='var(--white)' backgroundColor='var(--plum)'>Username</Label>
            <Input placeholder="Enter your username here" type='text' />
        <Label color='var(--white)' backgroundColor='var(--plum)'>Email</Label>
            <Input placeholder="Enter your email here" type='email' />
        <Label color='var(--white)' backgroundColor='var(--plum)'>Password</Label>
            <Input placeholder="Enter your password here" type='password' />
        <Button type='submit' backgroundColor='var(--tan)' color='var(--white)'> Submit </Button>
    </FormContainer>
    <Toaster />
  </MainContainer>
  );
}   
export default LoginForm;