import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/layout/layout";
import { Link } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import React from "react";

const DetailCompany = ({ company, prefecture }) => {
    return (
        <Layout>
            <section>
                <header>
                    <h2 className="text-2Xl font-medium text-gray-900">
                        Detail Company
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Detail a new company
                    </p>
                </header>

                <div className="mt-4 space-y-6">
                    <div className="mb-3">
                        <InputLabel htmlFor="name" value="Name" />
                        <InputText
                            id="name"
                            placeholder="Company Name"
                            className="w-full"
                            disabled
                            value={company.name}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email" />
                        <InputText
                            id="email"
                            placeholder="email@company.com"
                            className="w-full"
                            disabled
                            value={company.email}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="postcode" value="Postcode" />

                        <InputText
                            id="postcode"
                            name="postcode"
                            placeholder="0000000"
                            className="w-full"
                            disabled
                            value={company.postcode}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="prefecture_id"
                            value="Prefecture"
                        />
                        <InputText
                            id="postcode"
                            name="postcode"
                            placeholder="0000000"
                            className="w-full"
                            disabled
                            value={prefecture.display_name}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="city" value="City" />
                        <InputText
                            id="city"
                            placeholder="City"
                            className="w-full"
                            disabled
                            value={company.city}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="local" value="Local" />
                        <InputText
                            id="local"
                            placeholder="Local"
                            className="w-full"
                            disabled
                            value={company.local}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="street_address"
                            value="Street Address"
                        />
                        <InputText
                            id="street_address"
                            placeholder="Street Address"
                            className="w-full"
                            disabled
                            value={company.street_address}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="business_hour"
                            value="Business Hour"
                        />
                        <InputText
                            id="business_hour"
                            placeholder="Business Hour"
                            className="w-full"
                            disabled
                            value={company.business_hour}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="regular_holiday"
                            value="Regular Holiday"
                        />
                        <textarea
                            id="regular_holiday"
                            disabled
                            placeholder="Regular Holiday"
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            value={company.regular_holiday}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="phone" value="Phone" />
                        <InputText
                            id="phone"
                            placeholder="Phone Number"
                            className="w-full"
                            disabled
                            value={company.phone}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="fax" value="Fax" />
                        <InputText
                            id="fax"
                            placeholder="Fax Number"
                            className="w-full"
                            disabled
                            value={company.fax}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="url" value="URL" />
                        <InputText
                            id="url"
                            placeholder="Website URL"
                            className="w-full"
                            disabled
                            value={company.url}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="license_number"
                            value="License Number"
                        />
                        <InputText
                            id="license_number"
                            placeholder="License Number"
                            className="w-full"
                            disabled
                            value={company.license_number}
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="image" value="Image" />
                        <div className="w-64 h-64 rounded-full mt-4">
                            <img
                                src={`${company.image}`}
                                alt={company.name}
                                className="rounded-full bg-gray-50 object-cover"
                                height={96}
                                width={96}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href={route("company.index")}>
                            <PrimaryButton>Back</PrimaryButton>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DetailCompany;
