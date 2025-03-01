'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ExtendedButton, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components';
import { ROUTE_HOME } from '@/constants';
import { authService } from '@/services';
import { filterAndNotifyError } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { default as FormSchema } from './schema';

export function RegisterForm(): JSX.Element {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  });

  const registerMutation = useMutation({
    mutationFn: async ({ confirm_password: _, ...data }: z.infer<typeof FormSchema>) => {
      return await authService.register({ data });
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
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(registerMutation.mutate as any)}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name*</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name*</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password*</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ExtendedButton className="mt-6" loading={registerMutation.isPending} type="submit">
            Submit
          </ExtendedButton>
        </form>
      </Form>
    </>
  );
}

export default RegisterForm;
