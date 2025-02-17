"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { startTransition } from "react";
import { loginAction } from "@/actions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof schema>) => {
    startTransition(() => {
      loginAction(data)
        .then((data) => {
          Cookies.set("access_token", data.access_token, {
            sameSite: "strict",
            expires: 1,
            secure: true,
          });

          router.replace("/backoffice/scripts");
        })
        .catch((error) => console.error(error.message));
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1a1a1a",
      }}
    >
      <Card style={{ width: "400px" }}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                {...register("email")}
                required
                style={{ marginBottom: "16px" }}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <Input
                type="password"
                {...register("password")}
                required
                style={{ marginBottom: "16px" }}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <Button
              type="submit"
              variant="default"
              color="primary"
              className="w-full"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
