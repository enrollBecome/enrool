import React, { useEffect, useState, useRef } from "react";

// import reject from "./../../assets/remove.png";
// import pending from "./../../assets/wall-clock.png";
// import approve from "./../../assets/check.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { PropagateLoader } from "react-spinners";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
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

import {
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "@/api/apiApplication";

import {
  File,
  FileInput,
  FilePlus2,
  Mail,
  Pencil,
  Printer,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StatusOptions from "@/data/statusOptions";
import { z } from "zod";
import useFetch from "@/hooks/use-fetch";
import PaymentStatus from "@/data/paymentStatus";
import AdminRefStatus from "@/data/adminRefStatus";

// Loader Component
const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="loader">Loading...</div>
  </div>
);
const schema = z.object({
  status: z.enum(StatusOptions, {
    errorMap: () => ({ message: "Status must not be empty" }),
  }),
  payment_stage: z.enum(PaymentStatus, {
    errorMap: () => ({ message: "Payment Status must not be empty" }),
  }),
  enrollment_date: z.string().date(),
  ar_ref:z.enum(AdminRefStatus, {
    errorMap: () => ({ message: "Reference Status must not be empty" }),
  }),
  prr_ref:z.enum(AdminRefStatus, {
    errorMap: () => ({ message: "Reference Status must not be empty" }),
  }),
  per_ref:z.enum(AdminRefStatus, {
    errorMap: () => ({ message: "Reference Status must not be empty" }),
  }),
});
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
      return (
        <div className="capitalize poppins-medium ">
          {firstName} {lastName}
        </div>
      );
    },
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
      return (
        <div className="capitalize text-center">{row.getValue("term")}</div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize text-center">
          {new Date(row.getValue("created_at"))
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "-")}
        </div>
      );
    },
  },
  {
    accessorKey: "applicant_id",
    header: () => <div className="text-center">Id</div>,
    cell: ({ row }) => {
      let a = 1000 + row.getValue("applicant_id");

      return <div className="capitalize text-center">{a}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const application = row.original;

      const applicationid = row.original.id;
      const id = application.applicant_id + 1000;
      const date = new Date(application.created_at);
      const [loading, setLoading] = useState(true);

      const [applications, setApplications] = useState([]);

      const navigate = useNavigate();
      useEffect(() => {
        getApplicationById(applicationid)
          .then((data) => setApplications(data))
          .catch(() => setError("Failed to fetch applications."))
          .finally(() => setLoading(false));
      }, [applicationid]);
      const {
        register,
        handleSubmit,
        control,
        setValue, // For setting fetched data
        reset, // To reset form fields
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
        defaultValues: application,
      });

      const onError = (errors) => {
        console.log("Form errors:", errors);
      };

      const {
        loading: loadingUpdateApplication,
        error: errorUpdateApplication,
        data: dataUpdateApplication,
        fn: fnUpdateApplication,
      } = useFetch(updateApplication);

      const onSubmit = (data) => {
        fnUpdateApplication({
          applicationData: data,
          application_id: applicationid,
        });
      };
      console.log("1");
      useEffect(() => {
        if (dataUpdateApplication?.length > 0)
          navigate(`/term-selection-form/${applicationid}`);
      }, [loadingUpdateApplication]);
      useEffect(() => {
        if (application) {
          reset(application); // Populate form with fetched job data
        }
      }, [application]);

      return (
        <>
          {" "}
          <div className=" flex gap-4 w-full justify-center">
            <div className="flex justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        {" "}
                        <Pencil
                          className="cursor-pointer"
                          width={18}
                          strokeWidth={2}
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Edit Application
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              <div className="w-full flex flex-col gap-3 mb-4 h-[500px] overflow-y-auto">
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">ID :</span>{" "}
                                  <span className=" w-full  rounded-lg text-lg">
                                    BECOMING_2025_{application.term}_{id}
                                  </span>
                                </div>
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">Name :</span>{" "}
                                  <span className=" w-full  rounded-lg text-lg">
                                    {application.first_name}{" "}
                                    {application.last_name}
                                  </span>
                                </div>
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">
                                    Course :
                                  </span>{" "}
                                  <span className=" w-full  rounded-lg text-lg">
                                    {application.course_name}
                                  </span>
                                </div>
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">
                                    Enrollment Date :
                                  </span>{" "}
                                  <span className=" w-full  rounded-lg text-lg">
                                    <input
                                      className="text-base bg-transparent w-full"
                                      type="date"
                                      placeholder="Add Last Name"
                                      required
                                      {...register("enrollment_date")}
                                    />
                                    {errors.enrollment_date && (
                                      <p className="text-red-400 text-sm px-4 py-2">
                                        {errors.enrollment_date.message}
                                      </p>
                                    )}
                                  </span>
                                </div>

                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">
                                    Enrollment Status :
                                  </span>
                                  <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                      <div className="relative">
                                        <select
                                          {...field}
                                          value={field.value || ""}
                                          onChange={(e) =>
                                            field.onChange(e.target.value)
                                          }
                                          className={` text-[1rem] focus:outline-none  text-neutral-400 focus:text-zinc-950  h-14 bg-transparent w-full ${
                                            errors.status
                                              ? "border-red-400 border-2"
                                              : ""
                                          }`}
                                        >
                                          <option
                                            value=""
                                            disabled
                                            className="text-neutral-400"
                                          >
                                            Select status
                                          </option>
                                          {StatusOptions.map(
                                            (status, index) => (
                                              <option
                                                key={index}
                                                value={status}
                                                className="text-zinc-950"
                                              >
                                                {status}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {errors.status && (
                                          <p className="text-red-400 text-sm px-4 py-2">
                                            {errors.status.message}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">
                                    Payment Status :
                                  </span>
                                  <Controller
                                    name="payment_stage"
                                    control={control}
                                    render={({ field }) => (
                                      <div className="relative">
                                        <select
                                          {...field}
                                          value={field.value || ""}
                                          onChange={(e) =>
                                            field.onChange(e.target.value)
                                          }
                                          className={` text-[1rem] focus:outline-none  text-neutral-400 focus:text-zinc-950  h-14 bg-transparent w-full ${
                                            errors.status
                                              ? "border-red-400 border-2"
                                              : ""
                                          }`}
                                        >
                                          <option
                                            value=""
                                            disabled
                                            className="text-neutral-400"
                                          >
                                            Select status
                                          </option>
                                          {PaymentStatus.map(
                                            (status, index) => (
                                              <option
                                                key={index}
                                                value={status}
                                                className="text-zinc-950"
                                              >
                                                {status}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {errors.payment_stage && (
                                          <p className="text-red-400 text-sm px-4 py-2">
                                            {errors.payment_stage.message}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">
                                    Academic Reference Status :
                                  </span>
                                  <Controller
                                    name="ar_ref"
                                    control={control}
                                    render={({ field }) => (
                                      <div className="relative">
                                        <select
                                          {...field}
                                          value={field.value || ""}
                                          onChange={(e) =>
                                            field.onChange(e.target.value)
                                          }
                                          className={` text-[1rem] focus:outline-none  text-neutral-400 focus:text-zinc-950  h-14 bg-transparent w-full ${
                                            errors.status
                                              ? "border-red-400 border-2"
                                              : ""
                                          }`}
                                        >
                                          <option
                                            value=""
                                            disabled
                                            className="text-neutral-400"
                                          >
                                            Select status
                                          </option>
                                          {AdminRefStatus.map(
                                            (status, index) => (
                                              <option
                                                key={index}
                                                value={status}
                                                className="text-zinc-950"
                                              >
                                                {status}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {errors.ar_ref && (
                                          <p className="text-red-400 text-sm px-4 py-2">
                                            {errors.ar_ref.message}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">
                                    Professional Reference Status :
                                  </span>
                                  <Controller
                                    name="prr_ref"
                                    control={control}
                                    render={({ field }) => (
                                      <div className="relative">
                                        <select
                                          {...field}
                                          value={field.value || ""}
                                          onChange={(e) =>
                                            field.onChange(e.target.value)
                                          }
                                          className={` text-[1rem] focus:outline-none  text-neutral-400 focus:text-zinc-950  h-14 bg-transparent w-full ${
                                            errors.status
                                              ? "border-red-400 border-2"
                                              : ""
                                          }`}
                                        >
                                          <option
                                            value=""
                                            disabled
                                            className="text-neutral-400"
                                          >
                                            Select status
                                          </option>
                                          {AdminRefStatus.map(
                                            (status, index) => (
                                              <option
                                                key={index}
                                                value={status}
                                                className="text-zinc-950"
                                              >
                                                {status}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {errors.prr_ref && (
                                          <p className="text-red-400 text-sm px-4 py-2">
                                            {errors.prr_ref.message}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>
                                <div className="w-full p-3  bg-gray-100 text-gray-500  flex flex-col border-b ">
                                  <span className="text-sm  pb-1 ">
                                    Personal Reference Status :
                                  </span>
                                  <Controller
                                    name="per_ref"
                                    control={control}
                                    render={({ field }) => (
                                      <div className="relative">
                                        <select
                                          {...field}
                                          value={field.value || ""}
                                          onChange={(e) =>
                                            field.onChange(e.target.value)
                                          }
                                          className={` text-[1rem] focus:outline-none  text-neutral-400 focus:text-zinc-950  h-14 bg-transparent w-full ${
                                            errors.status
                                              ? "border-red-400 border-2"
                                              : ""
                                          }`}
                                        >
                                          <option
                                            value=""
                                            disabled
                                            className="text-neutral-400"
                                          >
                                            Select status
                                          </option>
                                          {AdminRefStatus.map(
                                            (status, index) => (
                                              <option
                                                key={index}
                                                value={status}
                                                className="text-zinc-950"
                                              >
                                                {status}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {errors.per_ref && (
                                          <p className="text-red-400 text-sm px-4 py-2">
                                            {errors.per_ref.message}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>

                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction type="submit">
                              Save
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </form>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Application</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>{" "}
            <div className="flex justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FileInput
                      className="cursor-pointer"
                      width={18}
                      strokeWidth={2}
                      onClick={() =>
                        (window.location.href = `/admin-dashboard/view/${applicationid}`)
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Application</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        {" "}
                        <Trash2
                          className="cursor-pointer"
                          width={18}
                          strokeWidth={2}
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the application and remove the data from
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteApplication(applicationid)
                                .then(() => {
                                  window.location.reload();
                                })
                                .catch((error) => {
                                  console.error(
                                    "Error deleting application:",
                                    error
                                  );
                                });
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Application</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Mail
                      onClick={() => {
                        window.location.href = `/admin-mail/${applicationid}`;
                      }}
                      className="cursor-pointer"
                      width={18}
                      strokeWidth={2}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send Mail</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Printer
                      onClick={() => {
                        window.location.href = `/admin-dashboard/print/${applicationid}`;
                      }}
                      className="cursor-pointer"
                      width={18}
                      strokeWidth={2}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Take A Print</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </>
      );
    },
  },
];
<UserRound />;
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

  if (loading)
    return (
      <div className="fixed w-full h-full z-10 left-0 top-0 bg-white flex justify-center items-center">
        <PropagateLoader />
      </div>
    );
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="sm:min-w-40 md:min-w-fit"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={table.previousPage}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
