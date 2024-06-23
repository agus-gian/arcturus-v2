import React, {useState} from 'react';
import {router, usePage} from "@inertiajs/react";
import {toast} from "react-toastify";
import Select from "react-select";

function TransportShowModal({ detail_item }) {
    const { getReqQuery } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const closeModal = () => {
        setIsLoading(true);

        router.visit('/dashboard/admin/transport', {
            method: 'get',
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <>
            <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Centered modal</h5>
                        </div>
                        <div className="modal-body m-3">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <h5 className="card-title">PIC</h5>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.user.name} readOnly={true} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.user.phone_number} readOnly={true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email_user" className="form-label">E-mail</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.user.email} readOnly={true} />
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="mb-3">
                                        <h5 className="card-title">Company Information</h5>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Company Name</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.name} readOnly={true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address_transport" className="form-label">Address</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.address} readOnly={true} />
                                    </div>

                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col-4">
                                                <input type="text" className="form-control bg-light" defaultValue={detail_item.country} readOnly={true} />
                                            </div>
                                            <div className="col-4">
                                                <input type="text" className="form-control bg-light" defaultValue={detail_item.state} readOnly={true} />
                                            </div>
                                            <div className="col-4">
                                                <input type="text" className="form-control bg-light" defaultValue={detail_item.city} readOnly={true} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.phone_number} readOnly={true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email_transport" className="form-label">E-mail</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.email} readOnly={true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="price_transport" className="form-label">Price</label>
                                        <input type="text" className="form-control bg-light" defaultValue={detail_item.price} readOnly={true} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        {detail_item.active ? (
                                            <p><span className="badge bg-success rounded-pill">Active</span></p>
                                        ) : (
                                            <p><span className="badge bg-danger rounded-pill">Active</span></p>
                                        )}
                                    </div>
                                </div>
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

export default TransportShowModal;
