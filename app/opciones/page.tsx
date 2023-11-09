import { Metadata } from "next"

import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { taskSchema } from "@/components/table/data/schema"

import data from "@/components/table/data/tasks.json"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}



export default async function TaskPage() {
  const tasks = data.map((task) => taskSchema.parse(task))

  return (
    <>
      <div className="flex h-full flex-1 flex-col space-y-8 p-4 lg:p-8 px-3 lg:px-20">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}