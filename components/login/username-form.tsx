import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useMultipleStep } from "@/hooks/useMultipleStep";
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
import { useUserStore } from "@/hooks/useUserStore";

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(20, {
      message: "Username must be at most 20 characters",
    })
    .trim(),
});

const UsernameForm = ({
  setSecureWord,
}: {
  setSecureWord: (secureWord: string) => void;
}) => {
  const setUsername = useUserStore((state) => state.setUsername);

  const form = useForm<z.infer<typeof usernameSchema>>({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(usernameSchema),
  });

  const { next } = useMultipleStep();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/getSecureWord", {
        method: "POST",
        body: JSON.stringify({
          username: form.getValues("username"),
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.status !== 200) {
        alert(data.message);
        return;
      }
      next();
      setUsername(form.getValues("username"));
      setSecureWord(data.data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-6" disabled={form.formState.isSubmitting}>
          Next
        </Button>
      </form>
    </Form>
  );
};

export default UsernameForm;
