import React, { useEffect, useState, useRef } from "react";

// import reject from "./../../assets/remove.png";
// import pending from "./../../assets/wall-clock.png";
// import approve from "./../../assets/check.png";
import { PropagateLoader } from "react-spinners";
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getApplications } from "@/api/apiApplication";

import { File, FileInput, FilePlus2, UserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Loader Component
const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="loader">Loading...</div>
  </div>
);




// Table columns configuration
const columns = [
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
    const firstName = row.original.first_name;
    
    const lastName = row.original.last_name;
    return(
    <div className="capitalize poppins-medium ">{firstName}{" "}{lastName}</div>)},
  },
  {
    accessorKey: "course_name",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const stages = row.original.status;
      return (
        <>
        <div className="w-full text-center">{stages}</div>
        
        </>
      );
    },
  },
  {
    accessorKey: "term",
    header: () => <div className="text-center">Applied For</div>,
    cell: ({ row }) => {
      
      
      

      return <div className="capitalize text-center">{row.getValue("term")}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => {
      
      

      return  <div className="capitalize text-center">
      {new Date(row.getValue("created_at")).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).replace(/\//g, "-")}
    </div>;
    },
  },
  {
    accessorKey: "applicant_id",
    header: () => <div className="text-center">Id</div>,
    cell: ({ row }) => {
      
      let a = 1000 + row.getValue("applicant_id");

      return  <div className="capitalize text-center">
    {a}
    </div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const applicationid = row.original.id ;
    return(
    
    <div className="flex justify-center gap-3">


<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <FileInput className="cursor-pointer" width={18} strokeWidth={2} 
      onClick={() => (window.location.href = `/admin-dashboard/view/${applicationid}`)}
       />
    </TooltipTrigger>
    <TooltipContent>
      <p>View Application</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


      
    </div>)},
  },
];
<UserRound />
// Main DataTable Component
export function ApplicantsData() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    getApplications()
      .then((data) => setApplications(data))
      .catch(() => setError("Failed to fetch applications."))
      .finally(() => setLoading(false));
  }, []);

  const table = useReactTable({
    data: applications,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) return(<div className="fixed w-full h-full z-10 left-0 top-0 bg-white flex justify-center items-center"><PropagateLoader /></div>) ;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Names..."
          value={table.getColumn("first_name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="sm:min-w-40 md:min-w-fit" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={table.nextPage} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
