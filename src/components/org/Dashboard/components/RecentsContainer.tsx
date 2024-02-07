import { useState } from "react";
import CertificateTable from "../../Certification/components/CertificateTable";
import { CertificatesProp, certificateSample } from "@/utils/sample";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { dateFormatter } from "@/utils/dateFormatter";
import { Link } from "react-router-dom";

interface DataTableProps {
  children: React.ReactNode;
  data: CertificatesProp[];
}
export const columns: ColumnDef<CertificatesProp>[] = [
  {
    id: "select",
    header: "",
    cell: ({ row }) => <></>,
  },
  {
    accessorKey: "certificateID",
    header: "Certificate ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("certificateID")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Holder Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue("name")}</div>,
  },
  // {
  //   accessorKey: "userID",
  //   header: "User ID",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("userID")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "grade",
  //   header: "Grade",
  //   cell: ({ row }) => <div>{row.getValue("grade")}</div>,
  // },
  {
    accessorKey: "created",
    header: "Created At",
    cell: ({ row }) => <div>{dateFormatter(row.getValue("created"))}</div>,
  },
  // {
  //   accessorKey: "expiration",
  //   header: "Expiration",
  //   cell: ({ row }) => <div>{dateFormatter(row.getValue("created"))}</div>,
  // },
  {
    accessorKey: "eventID",
    header: "Event ID",
    cell: ({ row }) => <div>{row.getValue("eventID")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className="font-Nunito font-semibold px-2 py-[2px] w-fit rounded-3xl"
        css={{
          background:
            row.getValue("status") == "active"
              ? "rgb(249 115 22 / 0.2)"
              : row.getValue("status") == "revoked"
              ? "rgb(168 85 247 / 0.2)"
              : "rgb(239,68,68,0.5)",
        }}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Revoke</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 

  
const RecentsContainer = () => {
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
     []
   );
   const [columnVisibility, setColumnVisibility] =
     React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState<CertificatesProp[]>(certificateSample);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="bg-white col-span-2 rounded-2xl row-span h-fit p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-2xl font-Poppins text-gray-800">
          Recent Certificates
        </div>
        <Link to={"/org/certificates"} className=" text-sm font-Poppins text-gray-800 cursor-pointer">
          View all {">>"}
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
    </div>
  );
}

export default RecentsContainer
