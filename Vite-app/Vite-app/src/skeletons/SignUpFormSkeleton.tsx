import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MainContainer, IconContainer, FormContainer } from '../forms/SignUpForm';

function SignUpFormSkeleton() {
  return (
    <MainContainer>
      <IconContainer>
        {/* Icon skeleton - circle */}
        <Skeleton circle width={56} height={56} />
      </IconContainer>

      {/* Heading skeleton */}
      <Skeleton width={150} height={48} borderRadius={8} />

      <FormContainer as="div">
        {/* Email Label */}
        <Skeleton width={80} height={24} borderRadius={4} />
        {/* Email Input */}
        <Skeleton width={300} height={40} borderRadius={4} />

        {/* Password Label */}
        <Skeleton width={100} height={24} borderRadius={4} />
        {/* Password Input */}
        <Skeleton width={300} height={40} borderRadius={4} />

        {/* Submit Button */}
        <Skeleton width={300} height={40} borderRadius={4} />
      </FormContainer>
    </MainContainer>
  );
}

export default SignUpFormSkeleton;
