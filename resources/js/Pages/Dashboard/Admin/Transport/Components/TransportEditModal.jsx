import React, {useState} from 'react';
import {router, useForm, usePage} from "@inertiajs/react";
import Select from "react-select";

function TransportEditModal({ modal_data }) {
    const { getReqQuery } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountryId, setSelectedCountryId] = useState({
        value: modal_data.detail_item.country_id,
        label: modal_data.detail_item.country
    });
    const [selectedStateId, setSelectedStateId] = useState({
        value: modal_data.detail_item.state_id,
        label: modal_data.detail_item.state
    });
    const [selectedCityId, setSelectedCityId] = useState({
        value: modal_data.detail_item.city_id,
        label: modal_data.detail_item.city
    });
    const [optionsStateId, setOptionsStateId] = useState(modal_data.address_states);
    const [optionsCityId, setOptionsCityId] = useState(modal_data.address_cities);
    const closeModal = () => {
        setIsLoading(true);

        router.visit('/dashboard/admin/transport', {
            method: 'get',
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true,
        });
    }

    const handleCountryId = selectedCountryId => {
        setOptionsStateId([]);
        setOptionsCityId([]);
        setSelectedStateId({
            value: '',
            label: 'Loading...'
        });
        setSelectedCityId(null);

        setData('country_id_transport', selectedCountryId.value);
        setSelectedCountryId(selectedCountryId);

        fetch(`/api/state/phone-code?country_id=${selectedCountryId.value}`)
            .then(response => response.json())
            .then(data => {
                setOptionsStateId(data);
                setSelectedStateId(null);
            });
    }

    const handleStateId = selectedStateId => {
        setOptionsCityId([]);
        setSelectedCityId({
            value: '',
            label: 'Loading...'
        });

        setData('state_id_transport', selectedStateId.value);
        setSelectedStateId(selectedStateId);

        fetch(`/api/city/phone-code?state_id=${selectedStateId.value}`)
            .then(response => response.json())
            .then(data => {
                setOptionsCityId(data);
                setSelectedCityId(null);
            });
    }

    const handleCityId = selectedCityId => {
        setData('city_id_transport', selectedCityId.value);
        setSelectedCityId(selectedCityId);
    }

    const { data, setData, patch, processing, errors } = useForm({
        query_string: getReqQuery,
        name_user: modal_data.detail_item.user.name,
        phone_code_number_user: modal_data.detail_item.user.phone_code_number,
        phone_number_only_user: modal_data.detail_item.user.phone_number_only,
        email_user: modal_data.detail_item.user.email,
        password_user: '',
        name_transport: modal_data.detail_item.name,
        address_transport: modal_data.detail_item.address,
        country_id_transport: modal_data.detail_item.country_id,
        state_id_transport: modal_data.detail_item.state_id,
        city_id_transport: modal_data.detail_item.city_id,
        email_transport: modal_data.detail_item.email,
        phone_code_number_transport: modal_data.detail_item.phone_code_number,
        phone_number_only_transport: modal_data.detail_item.phone_number_only,
        price_transport: modal_data.detail_item.price,
        active: modal_data.detail_item.active,
    })

    function submit(e) {
        e.preventDefault()
        patch(`/dashboard/admin/transport/${modal_data.detail_item.id}`,{
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <>
            <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit</h5>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <h5 className="card-title">PIC</h5>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className={`form-control ${errors.name_user && 'is-invalid'}`} value={data.name_user} onChange={e => setData('name_user', e.target.value)} />
                                        {errors.name_user && <p className="text-danger error invalid-feedback mb-0">{errors.name_user}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <div className="input-group">
                                            <div className="col-2">
                                                <select className={`form-control ${errors.phone_code_number_user && 'is-invalid'}`} value={data.phone_code_number_user} onChange={e => setData('phone_code_number_user', e.target.value)}>
                                                    {modal_data.phone_countries.map((country) => (
                                                        <option key={country.id} value={country.phonecode}>{country.emoji} ({country.phonecode})</option>
                                                    ))}
                                                </select>
                                                {errors.phone_code_number_user && <p className="text-danger error invalid-feedback mb-0">{errors.phone_code_number_user}</p>}
                                            </div>
                                            <div className="col-10">
                                                <input type="text" className={`form-control ${errors.phone_number_only_user && 'is-invalid'}`} value={data.phone_number_only_user} onChange={e => setData('phone_number_only_user', e.target.value)} />
                                                {errors.phone_number_only_user && <p className="text-danger error invalid-feedback mb-0">{errors.phone_number_only_user}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email_user" className="form-label">E-mail</label>
                                        <input id="email_user" type="email" className={`form-control ${errors.email_user && 'is-invalid'}`} value={data.email_user} onChange={e => setData('email_user', e.target.value)} />
                                        {errors.email_user && <p className="text-danger error invalid-feedback mb-0">{errors.email_user}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input id="password" type="password" className={`form-control ${errors.password_user && 'is-invalid'}`} value={data.password_user} onChange={e => setData('password_user', e.target.value)} />
                                        {errors.password_user && <p className="text-danger error invalid-feedback mb-0">{errors.password_user}</p>}
                                        <small className="text-muted">*) Please fill in if you want to change the password</small>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="mb-3">
                                        <h5 className="card-title">Company Information</h5>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Company Name</label>
                                        <input type="text" className={`form-control ${errors.name_transport && 'is-invalid'}`} value={data.name_transport} onChange={e => setData('name_transport', e.target.value)} />
                                        {errors.name_transport && <p className="text-danger error invalid-feedback mb-0">{errors.name_transport}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address_transport" className="form-label">Address</label>
                                        <textarea id="address_transport" className={`form-control ${errors.address_transport && 'is-invalid'}`} value={data.address_transport} onChange={e => setData('address_transport', e.target.value)}></textarea>
                                        {errors.address_transport && <p className="text-danger error invalid-feedback mb-0">{errors.address_transport}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col-4">
                                                <Select
                                                    className={`${errors.country_id_transport && 'is-invalid'}`}
                                                    value={selectedCountryId}
                                                    onChange={handleCountryId}
                                                    options={modal_data.address_countries}
                                                    placeholder="Country"
                                                />

                                                {errors.country_id_transport && <p className="text-danger error invalid-feedback mb-0">{errors.country_id_transport}</p>}
                                            </div>
                                            <div className="col-4">
                                                <Select
                                                    className={`${errors.state_id_transport && 'is-invalid'}`}
                                                    value={selectedStateId}
                                                    onChange={handleStateId}
                                                    options={optionsStateId}
                                                    placeholder="State"
                                                />

                                                {errors.state_id_transport && <p className="text-danger error invalid-feedback mb-0">{errors.state_id_transport}</p>}
                                            </div>

                                            <div className="col-4">
                                                <Select
                                                    className={`${errors.city_id_transport && 'is-invalid'}`}
                                                    value={selectedCityId}
                                                    onChange={handleCityId}
                                                    options={optionsCityId}
                                                    placeholder="City"
                                                />

                                                {errors.city_id_transport && <p className="text-danger error invalid-feedback mb-0">{errors.city_id_transport}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <div className="input-group">
                                            <div className="col-2">
                                                <select className={`form-control ${errors.phone_code_number_transport && 'is-invalid'}`} value={data.phone_code_number_transport} onChange={e => setData('phone_code_number_transport', e.target.value)}>
                                                    {modal_data.phone_countries.map((country) => (
                                                        <option key={country.id} value={country.phonecode}>{country.emoji} ({country.phonecode})</option>
                                                    ))}
                                                </select>
                                                {errors.phone_code_number_transport && <p className="text-danger error invalid-feedback mb-0">{errors.phone_code_number_transport}</p>}
                                            </div>
                                            <div className="col-10">
                                                <input type="text" className={`form-control ${errors.phone_number_only_transport && 'is-invalid'}`} value={data.phone_number_only_transport} onChange={e => setData('phone_number_only_transport', e.target.value)} />
                                                {errors.phone_number_only_transport && <p className="text-danger error invalid-feedback mb-0">{errors.phone_number_only_transport}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email_transport" className="form-label">E-mail</label>
                                        <input id="email_transport" type="email" className={`form-control ${errors.email_transport && 'is-invalid'}`} value={data.email_transport} onChange={e => setData('email_transport', e.target.value)} />
                                        {errors.email_transport && <p className="text-danger error invalid-feedback mb-0">{errors.email_transport}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="price_transport" className="form-label">Price</label>
                                        <input id="price_transport" type="text" className={`form-control ${errors.price_transport && 'is-invalid'}`} value={data.price_transport} onChange={e => setData('price_transport', e.target.value)} />
                                        {errors.price_transport && <p className="text-danger error invalid-feedback mb-0">{errors.price_transport}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="active" className="form-label">Status</label>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="active" checked={data.active} onChange={e => setData('active', e.target.checked)} />
                                            <label className="form-check-label" htmlFor="active">{data.active ? 'Active' : 'Non Active'}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" disabled={processing || isLoading} onClick={submit}>
                                {(processing) && (
                                    <span className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </span>
                                )} Submit
                            </button>

                            <button type="button" className="btn btn-outline-danger" disabled={processing || isLoading} onClick={closeModal}>
                                {isLoading && (
                                    <span className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </span>
                                )} Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default TransportEditModal;
