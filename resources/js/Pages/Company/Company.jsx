import PrimaryTable from "@/Components/PrimaryTable";
import api from "@/config/api/api";
import Layout from "@/Layouts/layout/layout";
import { Link } from "@inertiajs/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
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
    }, [params, params.search]);

    useEffect(() => {
        handleSearch();
    }, [params.search]);

    const columns = useMemo(
        () => [
            {
                header: "Name",
                cell: (info) => (
                    <div className="py-4 sm:pl-6 pr-3 text-sm font-medium text-gray-900 w-full">
                        <div className="flex flex-row items-center w-full">
                            <div className="w-40 h-40 rounded-full mr-4">
                                <img
                                    src={`${info.row.original.image}`}
                                    alt={info.row.original.name}
                                    className="rounded-full bg-gray-50 object-cover"
                                    height={72}
                                    width={72}
                                />
                            </div>
                            <p className="font-bold align-self-center">
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
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-full">
                        <div className="flex flex-row justify-between space-x-4 w-full">
                            <Link
                                href={route("company.show", {
                                    id: info.row.original.id,
                                })}
                            >
                                <Button
                                    icon="pi pi-eye"
                                    rounded
                                    severity="info"
                                />
                            </Link>

                            <Link
                                href={route("company.edit", {
                                    id: info.row.original.id,
                                })}
                            >
                                <Button
                                    icon="pi pi-pencil"
                                    rounded
                                    severity="warning"
                                    className="mx-2"
                                />
                            </Link>

                            <Button
                                icon="pi pi-times"
                                rounded
                                severity="danger"
                            />
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
                    isLoading={loading}
                    title="Companies"
                    filters={
                        <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
                            <InputText
                                id="search"
                                placeholder="Search"
                                className="w-full"
                                value={params.search}
                                onChange={(e) => {
                                    setParamss({
                                        ...params,
                                        search: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    }
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
