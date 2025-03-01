import { FormTitle } from '@/components/common';
import { CreatePostForm } from './form';

export function CreatePostFormContainer(): JSX.Element {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[37.375rem] p-6 sm:p-12 pt-0 sm:pt-0">
        <FormTitle>Create Post</FormTitle>
        <CreatePostForm />
      </div>
    </div>
  );
}

export default CreatePostFormContainer;
