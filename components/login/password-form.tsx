import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import { useUserStore } from "@/hooks/useUserStore";

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .trim(),
});

const PasswordForm = () => {
  const router = useRouter();
  const username = useUserStore((state) => state.user.username);

  const form = useForm<z.infer<typeof passwordSchema>>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          password: password,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.status !== 200) {
        alert(data.message);
        return;
      }
      alert(data.message);
      Cookies.set("username", username);
      Cookies.set("login", "true");
      router.push("/dashboard");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    mutate({ password: hash });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex items-center gap-x-2">
          <Button disabled={form.formState.isSubmitting}>Back</Button>
          <Button disabled={form.formState.isSubmitting}>Login</Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordForm;
