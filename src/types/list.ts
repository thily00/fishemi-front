import type { Employee } from "./employee";
export type List = {
  id: string;
  name: string;
  employee_count: number;
  employee_lists: Employee[];
};
