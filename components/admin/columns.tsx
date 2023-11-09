"use client"

import {
  CircleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import SupabaseImage from "../SupabaseImage"
const statuses = [
  {
    value: "visible",
    label: "Visible",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "hidden",
    label: "Hidden",
    icon: CircleIcon,
  },
]

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableRowActions } from "@/components/table/data-table-row-actions"
import { Project } from "@/lib/types/project/schema"

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("id")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "organization",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("organization")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "population",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Population" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("population")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("title")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "objective",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Objective" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("objective")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("description")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Schedule" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("schedule")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("tags")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "abilities",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abilities" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center max-w-[500px]">
          <span>{row.getValue("abilities")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "max",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("max")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("model")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("location")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("duration")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "hours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hours" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("hours")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <SupabaseImage imageName={row.getValue("image")} className="h-8 w-8 object-cover" />
        </div>
      )
    },
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("group")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "groupKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("groupKey")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "extraComments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extra comments" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("extraComments")}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
