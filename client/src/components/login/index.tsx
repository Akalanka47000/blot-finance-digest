import { FormTitle } from '../common';
import { LoginForm } from './form';

export function LoginFormContainer(): JSX.Element {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[37.375rem] p-6 sm:p-12">
        <FormTitle>Welcome Back!</FormTitle>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginFormContainer;
