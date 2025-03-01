'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ExtendedButton, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components';
import { ROUTE_HOME, ROUTE_REGISTER } from '@/constants';
import { authService } from '@/services';
import { filterAndNotifyError } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { default as FormSchema } from './schema';

export function LoginForm(): JSX.Element {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      return await authService.login({ data });
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
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(loginMutation.mutate as any)}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <span className="text-sm text-gray-500 ml-auto">
            Don&apos;t have an account?{' '}
            <Link href={ROUTE_REGISTER} className="text-blue-500 underline">
              Register
            </Link>
          </span>
          <ExtendedButton loading={loginMutation.isPending} type="submit">
            Submit
          </ExtendedButton>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
