import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/layout/layout";
import { useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import React, { useState, useCallback } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import api from "@/config/api/api";

const AddCompany = () => {
    const [loading, setLoading] = useState(false);
    const [postcode, setPostcode] = useState({ postcode: "" });
    const [postcodes, setPostcodes] = useState([]);
    const [prefectureOptions, setPrefectureOptions] = useState([]);

    const [form, setForm] = useState({
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

    const {
        data,
        setData,
        errors,
        setDefaults,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm(form);

    // Memoized search postcodes to prevent unnecessary recreations
    const handleSearch = useCallback(
        async (e) => {
            e.preventDefault();
            setLoading(true);

            // Only proceed if postcode is not empty
            if (!postcode.postcode.trim()) {
                // Optionally show an error message
                alert("Please enter a postcode");
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(route("search"), {
                    params: postcode,
                });

                // automatically set prefecture_id, city and local when the response froms searching the postcode is single
                if (response.data.data.length == 1) {
                    const result = response.data.data[0];
                    await handleGetPrefectureByName(result.prefecture);
                    setForm({
                        ...form,
                        city: result.city,
                        local: result.local,
                    });
                }

                setPostcodes(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log("====================================");
                console.log("ERROR SEARCH POSTCODE ==> ", error);
                console.log("====================================");
                setLoading(false);
            }
        },
        [postcode.postcode]
    );

    // Memoized search prefectures to prevent unnecessary recreations
    const handleGetPrefectureByName = useCallback(async (prefectureName) => {
        setLoading(true);

        try {
            const response = await api.get(route("getOneByName"), {
                params: { prefecture: prefectureName },
            });

            // automatically set prefecture_id
            if (response.data.data) {
                const result = response.data.data;
                setPrefectureOptions(
                    [...prefectureOptions].concat({
                        label: result.display_name,
                        value: result.id,
                    })
                );
                // setData("prefecture_id", result.id);
                setForm({
                    ...form,
                    prefecture_id: result.id,
                });
            }

            setLoading(false);
        } catch (error) {
            console.log("====================================");
            console.log("ERROR GET PREFECTURE BY NAME ==> ", error);
            console.log("====================================");
            setLoading(false);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("====================================");
        console.log("FORM DATYA ---> ", form);
        console.log("====================================");
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
                            value={form.name}
                            onChange={(e) => {
                                // setData("name", e.target.value);
                                setForm({ ...form, name: e.target.value });
                            }}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email" />
                        <InputText
                            id="email"
                            placeholder="email@company.com"
                            className="w-full"
                            value={form.email}
                            onChange={(e) => {
                                // setData("email", e.target.value)
                                setForm({ ...form, email: e.target.value });
                            }}
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
                                    // setData("postcode", e.target.value);
                                    setPostcode({ postcode: e.target.value });
                                    setForm({
                                        ...form,
                                        postcode: e.target.value,
                                    });
                                }}
                            />
                            <Button
                                onClick={(e) => {
                                    handleSearch(e);
                                }}
                                type="button"
                                icon="pi pi-search"
                                loading={loading}
                                className="mx-4"
                            />
                        </div>
                        <InputError message={errors.postcode} />
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            htmlFor="prefecture_id"
                            value="Prefecture"
                        />
                        <Dropdown
                            id="prefecture_id"
                            value={form.prefecture_id}
                            options={prefectureOptions}
                            onChange={(e) => {
                                // setData("prefecture_id", e.value)
                                setForm({ ...form, prefecture_id: e.value });
                            }}
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
                            value={form.city}
                            onChange={(e) => {
                                // setData("city", e.target.value);
                                setForm({ ...form, city: e.target.value });
                            }}
                        />
                        <InputError message={errors.city} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="local" value="Local" />
                        <InputText
                            id="local"
                            placeholder="Local"
                            className="w-full"
                            value={form.local}
                            onChange={(e) => {
                                // setData("local", e.target.value)
                                setForm({ ...form, local: e.target.value });
                            }}
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
                            value={form.street_address}
                            onChange={(e) => {
                                // setData("street_address", e.target.value);

                                setForm({
                                    ...form,
                                    street_address: e.target.value,
                                });
                            }}
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
                            value={form.business_hour}
                            onChange={(e) => {
                                // setData("business_hour", e.target.value)
                                setForm({
                                    ...form,
                                    business_hour: e.target.value,
                                });
                            }}
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
                            value={form.regular_holiday}
                            onChange={(e) => {
                                // setData("regular_holiday", e.target.value)
                                setForm({
                                    ...form,
                                    regular_holiday: e.target.value,
                                });
                            }}
                        />
                        <InputError message={errors.regular_holiday} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="phone" value="Phone" />
                        <InputText
                            id="phone"
                            placeholder="Phone Number"
                            className="w-full"
                            value={form.phone}
                            onChange={(e) => {
                                // setData("phone", e.target.value);
                                setForm({ ...form, phone: e.target.value });
                            }}
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="fax" value="Fax" />
                        <InputText
                            id="fax"
                            placeholder="Fax Number"
                            className="w-full"
                            value={form.fax}
                            onChange={(e) => {
                                // setData("fax", e.target.value)
                                setForm({ ...form, fax: e.target.value });
                            }}
                        />
                        <InputError message={errors.fax} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="url" value="URL" />
                        <InputText
                            id="url"
                            placeholder="Website URL"
                            className="w-full"
                            value={form.url}
                            onChange={(e) => {
                                // setData("url", e.target.value)
                                setForm({ ...form, url: e.target.value });
                            }}
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
                            value={form.license_number}
                            onChange={(e) => {
                                // setData("license_number", e.target.value)
                                setForm({
                                    ...form,
                                    license_number: e.target.value,
                                });
                            }}
                        />
                        <InputError message={errors.license_number} />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="image" value="Image" />
                        <input
                            id="image"
                            type="file"
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => {
                                // setData("image", e.target.files[0])
                                setForm({ ...form, image: e.target.files[0] });
                            }}
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
