import { FormTitle } from '../../common';
import { LoginAlert } from './alert';
import { LoginForm } from './form';

export function LoginFormContainer(): JSX.Element {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[37.375rem] p-6 sm:p-12">
          <FormTitle>Welcome Back!</FormTitle>
          <LoginForm />
        </div>
      </div>
      <LoginAlert />
    </>
  );
}

export default LoginFormContainer;
