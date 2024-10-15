import { scriptsService } from "@/services";
import { DataTable } from "../_components/data-table";
import { columns } from "./columns";
import { cookies } from "next/headers";
import { IScriptResponse } from "@/interfaces";
import dayjs from "dayjs";

export default async function Scripts() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value ?? "";
  const data: IScriptResponse[] = await scriptsService
    .fetchAllScripts(accessToken)
    .then((data) => {
      return data[0].map((item) => ({
        id: item.id,
        email: item.email,
        title: item.title,
        genre: item.genre,
        author: item.author,
        votes: item.votes,
        status: item.status,
        createdAt: dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss"),
      }));
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
