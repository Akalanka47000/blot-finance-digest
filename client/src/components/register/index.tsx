import { RegisterForm } from './form';

export default function RegisterFormContainer(): JSX.Element {
  return (
    <div className="container max-w-screen-xl py-6 sm:py-12">
      <div className="max-w-lg m-auto border border-border/60 rounded-lg p-6 sm:p-12">
        <div className="flex flex-col gap-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
