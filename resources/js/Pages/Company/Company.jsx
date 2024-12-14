import PrimaryTable from "@/Components/PrimaryTable";
import api from "@/config/api/api";
import Layout from "@/Layouts/layout/layout";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useMemo, useState, useCallback, useEffect } from "react";

const Company = () => {
    const [companies, setCompanies] = useState();
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(1);
    const [params, setParams] = useState({
        meta: {
            per_page: 10,
            page: 1,
        },
        search: "",
    });

    const { delete: deleteCompany } = useForm();

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

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this company?")) {
            deleteCompany(route("company.destroy", { id }), {
                onSuccess: () => {
                    // Refresh the list after deletion
                    handleSearch();
                },
                onError: (e) => {
                    console.error("ERROR DELETE COMPANY -> ", e);
                },
            });
        }
    };

    const getItemProps = (index) => ({
        className:
            active === index
                ? "relative z-10 flex items-center bg-gray-800 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 cursor-pointer"
                : "relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 cursor-pointer",
        onClick: () => {
            setActive(index);

            setParams({ ...params, meta: { page: index } });
        },
    });

    const next = () => {
        if (active === companies?.pagination.last_page) return;
        setActive(active + 1);

        setParams({ ...params, meta: { page: active + 1 } });
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);

        setParams({ ...params, meta: { page: active - 1 } });
    };

    // initialize the companies data
    useEffect(() => {
        handleSearch();
    }, [params.search, params.meta.page, active]);

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
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await handleDelete(info.row.original.id);
                                }}
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
                        <InputText
                            id="search"
                            placeholder="Search"
                            className="w-full"
                            value={params.search}
                            onChange={(e) => {
                                setParams({
                                    ...params,
                                    search: e.target.value,
                                });
                            }}
                        />
                    }
                    actions={
                        <Link
                            href={route("company.create")}
                            className="btn bg-gray-800 text-white px-4 py-2 rounded-md text-center"
                        >
                            Add Company
                        </Link>
                    }
                    columns={columns}
                    data={companies?.data ?? []}
                    totalPage={companies?.pagination?.last_page || 0}
                    limitPage={companies?.pagination?.per_page || 10}
                />
                {/* Pagination Controls */}
                <div className="w-full my-4">
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm w-full align-self-center"
                        aria-label="Pagination"
                    >
                        <a
                            onClick={prev}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                        </a>
                        {Array.from(
                            { length: companies?.pagination?.last_page ?? 0 },
                            (_, index) => (
                                <a
                                    key={index + 1}
                                    aria-current="page"
                                    {...getItemProps(index + 1)}
                                >
                                    {index + 1}
                                </a>
                            )
                        )}

                        <a
                            onClick={next}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                        </a>
                    </nav>
                </div>
            </div>
        </Layout>
    );
};

export default Company;
