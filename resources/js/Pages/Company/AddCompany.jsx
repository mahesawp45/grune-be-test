import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/layout/layout";
import { useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const AddCompany = () => {
    const [loading, setLoading] = useState(false);
    const [postcode, setPostcode] = useState({ postcode: "" });
    const [postcodes, setPostcodes] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: "",
        email: "",
        postcode: "",
        prefecture_id: null,
        city: "",
        local: "",
        street_address: "",
        business_hour: "",
        regular_holiday: "",
        phone: "",
        fax: "",
        url: "",
        license_number: "",
        image: null,
    });

    const prefectureOptions = [
        { label: "Hokkaido", value: 1 },
        { label: "Aomori", value: 2 },
        { label: "Iwate", value: 3 },
        // Add more prefecture options here
    ];

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setLoading(true);

        get(
            route("search"), // This route name
            { postcode: postcode }, // Pass the postcode as query params
            {
                only: ["data"], // Only return the `data` key in the response
                onSuccess: (page) => {
                    setPostcodes(page.props.data); // Set the postcodes data
                    setLoading(false);
                },
                onError: (e) => {
                    console.log("====================================");
                    console.log("ERRRP ---> ", e);
                    console.log("====================================");
                    setPostcodes([]);
                    setLoading(false);
                },
            }
        );
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        // post(route("company.store"), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        // });
    };

    return (
        <Layout>
            <section>
                <header>
                    <h2 className="text-2Xl font-medium text-gray-900">
                        Add Company
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Add a new company
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    <div className="mb-3">
                        <InputLabel htmlFor="name" value="Name" />
                        <InputText
                            id="name"
                            placeholder="Company Name"
                            className="w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email" />
                        <InputText
                            id="email"
                            placeholder="email@company.com"
                            className="w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="postcode" value="Postcode" />

                        <div className="flex flex-row">
                            <InputText
                                id="postcode"
                                name="postcode"
                                placeholder="0000000"
                                className="w-full"
                                value={postcode.postcode}
                                onChange={(e) => {
                                    setData("postcode", e.target.value);
                                    setPostcode({ postcode: e.target.value });
                                }}
                            />
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSearch(e);
                                }}
                                type="button"
                                icon="pi pi-search"
                                loading={loading}
                                className="mx-4"
                            />
                        </div>
                        {/* <InputError message={errors.postcode} /> */}
                    </div>

                    {/* Display the search results */}
                    <div className="mb-4">
                        {postcodes.length > 0 ? (
                            <ul>
                                {postcodes.map((postcode) => (
                                    <li key={postcode.id}>
                                        {postcode.postcode} - {postcode.city}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="prefecture_id"
                            value="Prefecture"
                        />
                        <Dropdown
                            id="prefecture_id"
                            value={data.prefecture_id}
                            options={prefectureOptions}
                            onChange={(e) => setData("prefecture_id", e.value)}
                            placeholder="Select a prefecture"
                            className="w-full"
                        />
                        <InputError message={errors.prefecture_id} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="city" value="City" />
                        <InputText
                            id="city"
                            placeholder="City"
                            className="w-full"
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
                        />
                        <InputError message={errors.city} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="local" value="Local" />
                        <InputText
                            id="local"
                            placeholder="Local"
                            className="w-full"
                            value={data.local}
                            onChange={(e) => setData("local", e.target.value)}
                        />
                        <InputError message={errors.local} />
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
                            value={data.street_address}
                            onChange={(e) =>
                                setData("street_address", e.target.value)
                            }
                        />
                        <InputError message={errors.street_address} />
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
                            value={data.business_hour}
                            onChange={(e) =>
                                setData("business_hour", e.target.value)
                            }
                        />
                        <InputError message={errors.business_hour} />
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="regular_holiday"
                            value="Regular Holiday"
                        />
                        <textarea
                            id="regular_holiday"
                            placeholder="Regular Holiday"
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            value={data.regular_holiday}
                            onChange={(e) =>
                                setData("regular_holiday", e.target.value)
                            }
                        />
                        <InputError message={errors.regular_holiday} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="phone" value="Phone" />
                        <InputText
                            id="phone"
                            placeholder="Phone Number"
                            className="w-full"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="fax" value="Fax" />
                        <InputText
                            id="fax"
                            placeholder="Fax Number"
                            className="w-full"
                            value={data.fax}
                            onChange={(e) => setData("fax", e.target.value)}
                        />
                        <InputError message={errors.fax} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="url" value="URL" />
                        <InputText
                            id="url"
                            placeholder="Website URL"
                            className="w-full"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                        />
                        <InputError message={errors.url} />
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
                            value={data.license_number}
                            onChange={(e) =>
                                setData("license_number", e.target.value)
                            }
                        />
                        <InputError message={errors.license_number} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="image" value="Image" />
                        <input
                            id="image"
                            type="file"
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                        />
                        <InputError message={errors.image} />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </Layout>
    );
};

export default AddCompany;
