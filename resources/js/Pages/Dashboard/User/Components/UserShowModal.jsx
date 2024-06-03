import React, {useState} from 'react';
import {router, usePage} from "@inertiajs/react";

function UserShowModal({ user }) {
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

    return (
        <>
            <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Centered modal</h5>
                        </div>
                        <div className="modal-body m-3">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control bg-light" defaultValue={user.name} readOnly={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-mail</label>
                                <input type="text" className="form-control bg-light" defaultValue={user.email} readOnly={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <input type="text" className="form-control bg-light" defaultValue={user.role_label} readOnly={true}/>
                            </div>
                            <div className="mb-3">
                                <p className="mb-0">
                                    <img className="rounded-circle rounded" src={user.profile_picture} alt={user.name} width="140" height="140" />
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" disabled={isLoading} onClick={closeModal}>
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

export default UserShowModal;
