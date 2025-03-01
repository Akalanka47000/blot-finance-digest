'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  ExtendedButton,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageUploader,
  Input
} from '@/components';
import { ROUTE_HOME } from '@/constants';
import { postService } from '@/services';
import { filterAndNotifyError } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { default as FormSchema } from './schema';

export function CreatePostForm(): JSX.Element {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      external_article_url: '',
      featured_image_url: ''
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      return await postService.createPost({ data });
    },
    onSuccess: (result) => {
      toast.success(result.data.message);
      router.push(ROUTE_HOME);
    },
    onError: filterAndNotifyError
  });

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(createPostMutation.mutate as any)}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="external_article_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Article Link*</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImageUploader form={form} title="Featured Image" name="featured_image_url" />
          </div>
          <ExtendedButton className="mt-6" loading={createPostMutation.isPending} type="submit">
            Post
          </ExtendedButton>
        </form>
      </Form>
    </>
  );
}

export default CreatePostForm;
