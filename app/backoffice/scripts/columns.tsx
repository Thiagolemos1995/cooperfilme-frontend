"use client";

import { IScriptResponse } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IScriptResponse>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "genre", header: "Genre" },
  { accessorKey: "author", header: "Author" },
  { accessorKey: "votes", header: "Votes" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "createdAt", header: "Created At" },
];
