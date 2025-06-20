'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login } from '../../lib/auth';
import { FIELD_NAME, FIELD_TYPES } from '../../constants';
import { Input } from './input'; 
import { Button } from './button'; 
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from './form'; 

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginType = z.infer<typeof loginSchema>;

export default function AuthForm() {
  const router = useRouter();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginType) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success('Login successful');
      router.push(result.role === 'admin' ? '/admin' : '/school');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.keys(form.getValues()).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as keyof LoginType}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FIELD_NAME[field.name as keyof typeof FIELD_NAME]}</FormLabel>
                <FormControl>
                  <Input
                    type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Log in</Button>
      </form>
    </Form>
  );
}
