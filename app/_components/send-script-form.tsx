"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  script: z.string().min(1, { message: "Script is required" }),
});

export function SendScriptForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>Envie seu roteiro</CardTitle>
        <CardDescription>
          Envie seu roteiro para ser avaliado pela CooperFilme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email:</label>
            <Input type="email" id="email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="script">Roteiro:</label>
            <Textarea id="script" {...register("script")} />
            {errors.script && <span>{errors.script.message}</span>}
          </div>
          <Button type="submit">Enviar</Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">
          Clique aqui para consultar o status do seu roteiro
        </Button>
      </CardFooter>
    </Card>
  );
}
