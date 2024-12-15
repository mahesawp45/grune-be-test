import React from "react";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

const PrimaryTable = ({
    actions,
    columns,
    data,
    isLoading,
    className,
    filters,
    last,
    onNumberClick,
    onPrev,
    onNext,
    active,
}) => {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10, // Set default page size
            },
        },
    });

    const getItemProps = (index) => ({
        className:
            active === index
                ? "relative z-10 flex items-center bg-gray-800 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 cursor-pointer"
                : "relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 cursor-pointer",
        onClick: () => {
            onNumberClick(index);
        },
    });

    return (
        <div
            className={`${className} bg-white rounded-xl w-full`}
            style={{ boxShadow: "0 0px 5px rgba(209, 213, 219, 0.6)" }}
        >
            <div className="p-8 flex flex-row justify-between w-full items-center border-b border-gray-300 space-x-10">
                <div className="flex flex-row items-center space-x-4 w-full">
                    <div className="mr-4 w-full">{filters}</div>
                    {actions}
                </div>
            </div>
            <div className="pb-8 relative">
                <div className="flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300 bg-white">
                                <thead>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <tr key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => (
                                                        <th
                                                            className="px-8 py-3.5 text-sm font-semibold text-gray-900 w-1/6"
                                                            key={header.id}
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div className="text-left font-medium">
                                                                    {flexRender(
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .header,
                                                                        header.getContext()
                                                                    )}
                                                                </div>
                                                            )}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                </thead>
                                <tbody className="bg-white">
                                    {isLoading === false &&
                                        data.length !== 0 &&
                                        table.getRowModel().rows.map((row) => (
                                            <tr
                                                key={row.id}
                                                className="even:bg-gray-50 hover:bg-gray-50"
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <td
                                                            key={cell.id}
                                                            className="whitespace-nowrap px-3 py-2 text-sm text-gray-500"
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {isLoading && (
                                <div className="w-full h-full place-items-center">
                                    <p className="text-center py-6">
                                        Loading...
                                    </p>
                                </div>
                            )}
                            {isLoading === false && data.length === 0 && (
                                <div className="w-full h-full place-items-center">
                                    <p className="text-center py-6">
                                        Data not found!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="w-full p-4">
                <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm w-full"
                    aria-label="Pagination"
                >
                    <a
                        onClick={onPrev}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                    >
                        <span className="sr-only">Previous</span>
                    </a>
                    {Array.from({ length: last ?? 0 }, (_, index) => (
                        <a
                            key={index + 1}
                            aria-current="page"
                            {...getItemProps(index + 1)}
                        >
                            {index + 1}
                        </a>
                    ))}

                    <a
                        onClick={onNext}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                    >
                        <span className="sr-only">Next</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default PrimaryTable;
