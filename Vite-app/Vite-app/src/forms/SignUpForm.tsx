import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { showToast } from '../utils/toast';
import Input from '../design_system/Input';
import Button from '../design_system/Button';
import Icon from '../design_system/Icon';
import Heading from '../design_system/Heading';
import Label from '../design_system/Label';


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

function SignUpForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace with actual validation logic
    const isValid = true;

    if (isValid) {
      showToast.success('Sign Up Successful');
    } else {
      showToast.error('Invalid credentials');
    }
  };

  return (
  <MainContainer>
    <IconContainer>
        <Icon name="HourglassHigh" size={56} color="var(--plum)" weight='regular'/>
    </IconContainer>
    <Heading>Sign Up</Heading>
    <FormContainer onSubmit={handleSubmit}>
      <LabelInputContainer>
      <Label color='var(--plum)' backgroundColor='transparent'>Username</Label>
      <Input placeholder="Enter your username here" type='text' />
      </LabelInputContainer>
      <LabelInputContainer>
    <Label color='var(--plum)' backgroundColor='transparent'>Email</Label>
      <Input placeholder="Enter your email here" type='email' />
      </LabelInputContainer>
      <LabelInputContainer>
      <Label color='var(--plum)' backgroundColor='transparent'>Password</Label>
      <Input placeholder="Enter your password here" type='password' />
      <Input placeholder="Confirm your password here" type='password' />
      </LabelInputContainer>
      <Button type='submit' backgroundColor='var(--tan)' color='var(--white)'> Submit </Button>
    </FormContainer>
    <Toaster />
  </MainContainer>
  );
}   
export default SignUpForm;