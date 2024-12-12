import PrimaryTable from "@/Components/PrimaryTable";
import Layout from "@/Layouts/layout/layout";
import React, { useMemo, useState } from "react";

const Company = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const columns = useMemo(
        () => [
            {
                header: "Nama Anggota",
                cell: (info) => (
                    <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
                        <div className="flex flex-row space-x-4 items-center">
                            {/* <Image
                                alt={info.row.original.user.fullName}
                                src={
                                    info.row.original.user.avatarUrl ??
                                    Images.dummyProfile
                                }
                                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                                height={40}
                                width={40}
                                objectFit="cover"
                            />
                            <p className="font-bold">
                                {info.row.original.user.fullName ?? "-"}
                            </p> */}
                        </div>
                    </div>
                ),
            },
            {
                header: "Email",
                cell: (info) => (
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* {info.row.original.user.email ?? "-"} */}
                    </div>
                ),
            },
            {
                header: "No.Hp",
                cell: (info) => (
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* {info.row.original.user.phoneNumber ?? "-"} */}
                    </div>
                ),
            },

            {
                header: "Aksi",
                cell: (info) => (
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-row space-x-2">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <Layout>
            <div className="">
                <h1 className="font-bold text-xl">Company</h1>
                <PrimaryTable
                    title="Companies"
                    // onFilterReset={() => {}}
                    // filters={
                    //   <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
                    //     <DropdownFilter
                    //       label="Status"
                    //       selectedItem={selectedStatusItem}
                    //       setSelectedItem={setSelectedStatusItem}
                    //       icon={CheckCircleIcon}
                    //       items={status}
                    //     />

                    //     <PrimaryInput
                    //       onChange={(e) => {}}
                    //       value={""}
                    //       placeholder="Cari Pengguna"
                    //       className="w-full"
                    //       trailing={
                    //         <IconButton
                    //           icon={MagnifyingGlassIcon}
                    //           onClick={() => {}}
                    //           className="absolute top-1 right-1"
                    //         />
                    //       }
                    //     />
                    //   </div>
                    // }
                    actions={
                        <div className="flex flex-row w-full justify-end">
                            <a
                                href={route("company.create")}
                                className="bg-gray-800 border inline-flex border-transparent rounded-md font-medium  text-white capitalize tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 p-3 "
                            >
                                Add Company
                            </a>
                        </div>
                    }
                    columns={columns}
                    data={[]}
                    isLoading={false}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={5}
                    limitPage={10}
                    isCommon={true}
                />
            </div>
        </Layout>
    );
};

export default Company;
