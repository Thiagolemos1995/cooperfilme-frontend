"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { scriptsService } from "../services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ISendScript } from "../interfaces/";

const sendScriptSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  content: z.string().min(1, { message: "Script is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
  author: z.string().min(1, { message: "Author name is required" }),
});

export function SendScriptForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<z.infer<typeof sendScriptSchema>>({
    resolver: zodResolver(sendScriptSchema),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [scriptData, setScriptData] = useState<ISendScript | null>(null);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: z.infer<typeof sendScriptSchema>) => {
    try {
      const response = await scriptsService.sendScript(data);
      setScriptData(response);
      setDialogMessage(
        "Script enviado com sucesso! Armazene o id do roteiro para consultar o status"
      );
      setIsError(false);
      reset();
    } catch (error) {
      console.error(error);
      setDialogMessage("Erro ao enviar o script. Tente novamente.");
      setIsError(true);
    } finally {
      setDialogOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-full p-10">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Envie seu roteiro</CardTitle>
          <CardDescription>
            Envie seu roteiro para ser avaliado pela CooperFilme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="email">Email:</label>
              <Input type="email" id="email" {...register("email")} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="title">Título:</label>
                <Input type="text" id="title" {...register("title")} />
                {errors.title && <span>{errors.title.message}</span>}
              </div>
              <div>
                <label htmlFor="author">Nome do Autor:</label>
                <Input type="text" id="author" {...register("author")} />
                {errors.author && <span>{errors.author.message}</span>}
              </div>
            </div>
            <div>
              <label htmlFor="genre">Gênero:</label>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => setValue("genre", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="action">Ação</SelectItem>
                      <SelectItem value="comedy">Comédia</SelectItem>
                      <SelectItem value="drama">Drama</SelectItem>
                      <SelectItem value="horror">Terror</SelectItem>
                      <SelectItem value="sci-fi">Ficção Científica</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.genre && <span>{errors.genre.message}</span>}
            </div>
            <div>
              <label htmlFor="content">Roteiro:</label>
              <Textarea id="content" {...register("content")} />
              {errors.content && <span>{errors.content.message}</span>}
            </div>
            <Button type="submit">Enviar</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full">
            Clique aqui para consultar o status do seu roteiro
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <h1
                className={`text-2xl font-bold ${
                  isError ? "text-red-500" : "text-green-500"
                }`}
              >
                {isError ? "Erro" : "Sucesso"}
              </h1>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-lg text-white">{dialogMessage}</p>
              {!isError && scriptData && (
                <div className="flex flex-col gap-2 py-[20px]">
                  <p className="text-md text-white">id: {scriptData.id}</p>
                  <p className="text-md text-white">
                    email: {scriptData.email}
                  </p>
                  <p className="text-md text-white">
                    title: {scriptData.title}
                  </p>
                  <p className="text-md text-white">
                    author: {scriptData.author}
                  </p>
                  <p className="text-md text-white">
                    genre: {scriptData.genre}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialogOpen(false)}>
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
