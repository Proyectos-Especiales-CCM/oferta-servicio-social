"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Project } from "@/lib/types/project/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import Link from "next/link"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const project = row.original as Project

  const deleteProject = async () => {
    const response = await fetch('/api/projects', {
      method: 'DELETE',
      body: JSON.stringify([project.id]),
    });
    if (response.ok) {
      alert('Proyecto eliminado correctamente, por favor refresca la tabla para ver los cambios');
    } else {
      alert('Error deleting project');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/admin/project/${project.id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <button onClick={deleteProject}>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
