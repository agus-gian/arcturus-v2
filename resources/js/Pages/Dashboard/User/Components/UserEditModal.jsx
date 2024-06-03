import React, {useState} from 'react';
import {router, useForm, usePage} from "@inertiajs/react";

function UserEditModal({ user }) {
    const { getReqQuery } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const closeModal = () => {
        setIsLoading(true);

        router.visit('/dashboard/user', {
            method: 'get',
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true,
        });
    }

    const { data, setData, patch, processing, errors } = useForm({
        query_string: getReqQuery,
        name: user.name,
        email: user.email,
    })

    function submit(e) {
        e.preventDefault()
        patch(`/dashboard/user/${user.id}`,{
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
                            <h5 className="modal-title">Edit User</h5>
                        </div>
                        <div className="modal-body m-3">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <div>{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-mail</label>
                                <input type="email" className="form-control" value={data.email} onChange={e => setData('email', e.target.value)} />
                                {errors.email && <div>{errors.email}</div>}
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

export default UserEditModal;
