import React, {useState} from 'react';
import {router, useForm, usePage} from "@inertiajs/react";

function AffiliateCreateModal({ modal_data }) {
    const { getReqQuery } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const closeModal = () => {
        setIsLoading(true);

        router.visit('/dashboard/admin/affiliate', {
            method: 'get',
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true,
        });
    }

    const { data, setData, post, processing, errors } = useForm({
        query_string: getReqQuery,
        name: '',
        phone_code_number: '62',
        phone_number_only: '',
        email: '',
        password: '',
        active: true,
    })

    function submit(e) {
        e.preventDefault()
        post(`/dashboard/admin/affiliate`,{
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <>
            <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create User</h5>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <p className="text-danger error invalid-feedback mb-0">{errors.name}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <div className="input-group">
                                    <div className="col-2">
                                        <select className={`form-control ${errors.phone_code_number && 'is-invalid'}`} value={data.phone_code_number} onChange={e => setData('phone_code_number', e.target.value)}>
                                            {modal_data.countries.map((country) => (
                                                <option key={country.id} value={country.phonecode}>{country.emoji} ({country.phonecode})</option>
                                            ))}
                                        </select>
                                        {errors.phone_code_number && <p className="text-danger error invalid-feedback mb-0">{errors.phone_code_number}</p>}
                                    </div>
                                    <div className="col-10">
                                        <input type="text" className={`form-control ${errors.phone_number_only && 'is-invalid'}`} value={data.phone_number_only} onChange={e => setData('phone_number_only', e.target.value)} />
                                        {errors.phone_number_only && <p className="text-danger error invalid-feedback mb-0">{errors.phone_number_only}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input id="email" type="text" className={`form-control ${errors.email && 'is-invalid'}`} value={data.email} onChange={e => setData('email', e.target.value)} />
                                {errors.email && <p className="text-danger error invalid-feedback mb-0">{errors.email}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input id="password" type="password" className={`form-control ${errors.password && 'is-invalid'}`} value={data.password} onChange={e => setData('password', e.target.value)} />
                                {errors.password && <p className="text-danger error invalid-feedback mb-0">{errors.password}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="active" className="form-label">Status</label>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="active" checked={data.active} onChange={e => setData('active', e.target.checked)} />
                                    <label className="form-check-label" htmlFor="active">{data.active ? 'Active' : 'Non Active'}</label>
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

export default AffiliateCreateModal;
