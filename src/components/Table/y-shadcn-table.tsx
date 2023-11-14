// import fs from "vite-plugin-fs/browser";
// import process from "process";
// import path from "path";
// import { z } from "zod";

// import { columns } from "@/components/Table/column";
// import { DataTable } from "@/components/Table/data-table";
import { UserNav } from "@/components/Table/user-nav";
// import { taskSchema } from "@/data/schema";

// ERROR : Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
// > padahal sudah JSON sudah berupa Array - Object

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "../../../src/data/tasks.json")
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

function TableContainer() {
  // const tasks = await getTasks();

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </>
  );
}

export default TableContainer;
