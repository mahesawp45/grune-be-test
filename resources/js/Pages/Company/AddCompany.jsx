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
    const [prefectureOptions, setPrefectureOptions] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
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
                // get the searched postcode
                const response = await api.get(route("searchPostCode"), {
                    params: postcode,
                });

                // automatically set prefecture_id, city and local when the response from searching the postcode is existed
                if (response.data.data) {
                    const result = response.data.data;

                    await handleGetPrefectureByName({
                        prefectureName: result.prefecture,
                        city: result.city,
                        local: result.local,
                        postcode: result.postcode,

                        // set the previous fields data to the form
                        name: data.name,
                        email: data.email,
                        business_hour: data.business_hour,
                        fax: data.fax,
                        image: data.image,
                        license_number: data.license_number,
                        phone: data.phone,
                        regular_holiday: data.regular_holiday,
                        street_address: data.street_address,
                        url: data.url,
                    });
                }

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
    const handleGetPrefectureByName = useCallback(
        async ({
            prefectureName,
            city,
            local,
            postcode,
            name,
            email,
            street_address,
            business_hour,
            regular_holiday,
            phone,
            fax,
            url,
            license_number,
            image,
        }) => {
            setLoading(true);

            try {
                const response = await api.get(
                    route("getOnePrefectureByName"),
                    {
                        params: { prefecture: prefectureName },
                    }
                );

                // automatically set prefecture_id, city and local when the response froms searching the postcode is single
                if (response.data.data) {
                    const result = response.data.data;
                    // set all prefectures to the options/dropdown
                    setPrefectureOptions(
                        [...prefectureOptions].concat({
                            label: result.display_name,
                            value: result.id,
                        })
                    );
                    setData({
                        // we have to set the prefecture_id, city and local at the same time or some of those will no updated
                        prefecture_id: result.id,
                        city: city,
                        local: local,
                        // set the previous fields data to the form or some data will lose in the form
                        name: name,
                        email: email,
                        postcode: postcode,
                        business_hour: business_hour,
                        fax: fax,
                        image: image,
                        license_number: license_number,
                        phone: phone,
                        regular_holiday: regular_holiday,
                        street_address: street_address,
                        url: url,
                    });
                }

                setLoading(false);
            } catch (error) {
                console.log("====================================");
                console.log("ERROR GET PREFECTURE BY NAME ==> ", error);
                console.log("====================================");
                setLoading(false);
            }
        },
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("company.store"), {
            preserveScroll: true,
            data,
            onSuccess: () => {
                reset();
            },
            onError: (e) => {
                console.log("====================================");
                console.log("ERROR ADD COMPANY --> ", e);
                console.log("====================================");
            },
        });
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
                            onChange={(e) => {
                                setData({ ...data, name: e.target.value });
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
                            value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
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
                                value={data.postcode}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        postcode: e.target.value,
                                    });
                                    // set the postcode payload to search the prefecture, city and local
                                    setPostcode({ postcode: e.target.value });
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
                            value={data.prefecture_id}
                            options={prefectureOptions}
                            onChange={(e) => {
                                setData({ ...data, prefecture_id: e.value });
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
                            value={data.city}
                            onChange={(e) => {
                                setData({ ...data, city: e.target.value });
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
                            value={data.local}
                            onChange={(e) => {
                                setData({ ...data, local: e.target.value });
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
                            value={data.street_address}
                            onChange={(e) => {
                                setData({
                                    ...data,
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
                            value={data.business_hour}
                            onChange={(e) => {
                                setData({
                                    ...data,
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
                            value={data.regular_holiday}
                            onChange={(e) => {
                                setData({
                                    ...data,
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
                            value={data.phone}
                            onChange={(e) => {
                                setData({ ...data, phone: e.target.value });
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
                            value={data.fax}
                            onChange={(e) => {
                                setData({ ...data, fax: e.target.value });
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
                            value={data.url}
                            onChange={(e) => {
                                setData({ ...data, url: e.target.value });
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
                            value={data.license_number}
                            onChange={(e) => {
                                setData({
                                    ...data,
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
                                setData({ ...data, image: e.target.files[0] });
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
