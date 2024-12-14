import PrimaryTable from "@/Components/PrimaryTable";
import api from "@/config/api/api";
import Layout from "@/Layouts/layout/layout";
import React, { useMemo, useState, useCallback, useEffect } from "react";

const Company = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [companies, setCompanies] = useState();
    const [loading, setLoading] = useState(false);
    const [params, setParamss] = useState({
        meta: {
            per_page: 10,
            page: 1,
        },
        search: "",
    });

    // Memoized search companies to prevent unnecessary recreations
    const handleSearch = useCallback(async () => {
        setLoading(true);

        try {
            // get the searched companies
            const response = await api.get(route("company.index"), {
                params: params,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // set data companies if existed
            if (response.data) {
                const result = response.data;
                setCompanies(result);
            }

            setLoading(false);
        } catch (error) {
            console.log("====================================");
            console.log("ERROR GET COMPANIES ==> ", error);
            console.log("====================================");
            setLoading(false);
        }
    }, [params]);

    console.log("====================================");
    console.log("COMPANIES ---> ", companies);
    console.log("====================================");

    useEffect(() => {
        handleSearch();
    }, []);

    const columns = useMemo(
        () => [
            {
                header: "Name",
                cell: (info) => (
                    <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
                        <div className="flex flex-row space-x-2 items-center">
                            <img
                                src={`${info.row.original.image}`}
                                alt={info.row.original.name}
                                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                            />
                            <p className="font-bold">
                                {info.row.original.name ?? "-"}
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                header: "Email",
                cell: (info) => (
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {info.row.original.email ?? "-"}
                    </div>
                ),
            },
            {
                header: "Phone",
                cell: (info) => (
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {info.row.original.phone ?? "-"}
                    </div>
                ),
            },

            {
                header: "Action",
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
                    data={companies?.data ?? []}
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
