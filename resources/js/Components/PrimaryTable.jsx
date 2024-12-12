import React, { useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import PrimaryButton from "./PrimaryButton";

const PrimaryTable = ({
    actions,
    filters,
    onFilterReset,
    columns,
    data,
    setCurrentPage,
    setPageLimit,
    currentPage,
    totalPage,
    limitPage,
    isLoading,
    setIsLoading,
    className,
    from,
    last,
    listDataRequest,
    setListDataRequest,
}) => {
    const [active, setActive] = useState(1);
    const table = useReactTable({
        columns,
        data,

        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    // const next = () => {
    //   if (active === last) return;
    //   setActive(active + 1);

    //   setListDataRequest({ ...listDataRequest, page: active + 1 });
    // };

    // const prev = () => {
    //   if (active === 1) return;
    //   setActive(active - 1);

    //   setListDataRequest({ ...listDataRequest, page: active - 1 });
    // };

    return (
        <div
            className={className + " bg-white rounded-xl w-full"}
            style={{ boxShadow: "0 0px 5px rgba(209, 213, 219, 0.6)" }}
        >
            <div className="p-8 flex flex-row justify-between w-full items-center border-b border-gray-300 space-x-10">
                <div className="flex flex-row justify-end items-center space-x-4 w-full">
                    {actions}
                </div>
                {/* <PrimaryButton onClick={() => {}}>Add Company</PrimaryButton> */}
            </div>

            <div className="pb-8 relative">
                <div className="w-full relative">
                    <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8 w-full relative">
                        <div className="sm:flex-auto">
                            {onFilterReset ? (
                                <button
                                    onClick={() => {
                                        onFilterReset();
                                    }}
                                    className="flex flex-row items-center hover:text-gray-900"
                                >
                                    {/* <XMarkIcon
                                        width={16}
                                        height={16}
                                        color="gray"
                                    /> */}
                                    <p className="text-sm font-semibold leading-6 text-gray-600 underline hover:text-gray-900">
                                        Reset
                                    </p>
                                </button>
                            ) : null}
                        </div>
                        <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full justify-end">
                            {filters}
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
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
                                                                colSpan={
                                                                    header.colSpan
                                                                }
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
                                    {isLoading ? (
                                        <tbody>
                                            {Array.from({ length: 10 }).map(
                                                (item) => (
                                                    <tr
                                                        key={item}
                                                        className="border border-1 border-zinc-300 border-x-0"
                                                    >
                                                        <td className="px-5 py-2  text-[16px] font-medium leading-normal">
                                                            <Skeleton.List />
                                                        </td>
                                                        <td className="px-5 py-2  text-[16px] font-medium leading-normal">
                                                            <Skeleton.List />
                                                        </td>
                                                        <td className="px-5 py-2  text-[16px] font-medium leading-normal">
                                                            <Skeleton.List />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    ) : (
                                        <tbody className="bg-white">
                                            {table
                                                .getRowModel()
                                                .rows.map((row) => (
                                                    <tr
                                                        key={row.id}
                                                        className="even:bg-gray-50 hover:bg-gray-50"
                                                    >
                                                        {row
                                                            .getVisibleCells()
                                                            .map((cell) => (
                                                                <td
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                    className="whitespace-nowrap px-3 py-2 text-sm text-gray-500"
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </td>
                                                            ))}
                                                    </tr>
                                                ))}
                                        </tbody>
                                    )}
                                </table>

                                {isLoading === false && data.length === 0 && (
                                    <div className="w-full h-full place-items-center">
                                        <p className=" text-center py-6 ">
                                            Data not found!
                                        </p>
                                    </div>
                                )}
                                {/* <Pagination /> */}

                                <div className="flex items-center justify-between border-t border-gray-300 bg-white px-4 lg:pt-8 pt-4 sm:px-6">
                                    <div className="flex flex-1 justify-between sm:hidden">
                                        <button
                                            onClick={() => {
                                                if (
                                                    currentPage &&
                                                    currentPage !== 1
                                                ) {
                                                    if (setCurrentPage) {
                                                        setCurrentPage(
                                                            currentPage - 1
                                                        );
                                                        table.previousPage();
                                                    }
                                                }
                                            }}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (
                                                    currentPage &&
                                                    totalPage !== undefined &&
                                                    currentPage < totalPage
                                                ) {
                                                    if (setCurrentPage) {
                                                        setCurrentPage(
                                                            currentPage + 1
                                                        );
                                                        table.nextPage();
                                                    }
                                                }
                                            }}
                                            disabled={
                                                currentPage &&
                                                totalPage !== undefined &&
                                                currentPage >= totalPage
                                            }
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
                                        {/* <div>
                      <p className="text-sm text-gray-400">
                        Showing{" "}
                        <span className="font-medium">{currentPage}</span> to
                                              <span className="font-medium">{}</span> of
                        <span className="font-medium">97</span> results
                      </p>
                    </div> */}
                                        <div>
                                            <nav
                                                aria-label="Pagination"
                                                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                            >
                                                <button
                                                    onClick={() => {
                                                        if (
                                                            currentPage &&
                                                            currentPage !== 1
                                                        ) {
                                                            if (
                                                                setCurrentPage
                                                            ) {
                                                                setCurrentPage(
                                                                    currentPage -
                                                                        1
                                                                );
                                                                table.previousPage();
                                                            }
                                                        }
                                                    }}
                                                    disabled={currentPage === 1}
                                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                >
                                                    <span className="sr-only">
                                                        Previous
                                                    </span>
                                                    {/* <ChevronLeftIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5"
                                                    /> */}
                                                </button>
                                                {/*{Array.from({ length: totalPage as number }).map(
                          (item, index) => (
                            <button
                              key={`${index}+${new Date()}`}
                              onClick={() => {
                                if (
                                  currentPage &&
                                  totalPage !== undefined &&
                                  setCurrentPage
                                ) {
                                  if (index > currentPage) {
                                    setCurrentPage(currentPage + 1);
                                    table.nextPage();
                                  } else {
                                    setCurrentPage(currentPage - 1);
                                    table.previousPage();
                                  }
                                }
                              }}
                              aria-current="page"
                              className={
                                currentPage === index + 1
                                  ? "bg-primary1 focus-visible:outline-primary2 text-white relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              }
                            >
                              {`${index + 1}`}
                            </button>
                          )
                        )}*/}

                                                <button
                                                    onClick={() => {
                                                        if (
                                                            currentPage &&
                                                            totalPage !==
                                                                undefined &&
                                                            currentPage <
                                                                totalPage
                                                        ) {
                                                            if (
                                                                setCurrentPage
                                                            ) {
                                                                setCurrentPage(
                                                                    currentPage +
                                                                        1
                                                                );
                                                                table.nextPage();
                                                            }
                                                        }
                                                    }}
                                                    disabled={
                                                        currentPage &&
                                                        totalPage !==
                                                            undefined &&
                                                        currentPage >= totalPage
                                                    }
                                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                >
                                                    <span className="sr-only">
                                                        Next
                                                    </span>
                                                    {/* <ChevronRightIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5"
                                                    /> */}
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrimaryTable;
