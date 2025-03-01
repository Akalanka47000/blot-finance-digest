import { FormTitle } from '../common';
import { RegisterForm } from './form';

export function RegisterFormContainer(): JSX.Element {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[37.375rem] p-6 sm:p-12 pt-0 sm:pt-0">
        <FormTitle>Sign Up</FormTitle>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterFormContainer;
