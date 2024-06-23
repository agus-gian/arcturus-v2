import React, {useState} from 'react';
import {router, usePage} from "@inertiajs/react";
import {toast} from "react-toastify";

function AffiliateShowModal({ detail_item }) {
    const { getReqQuery } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessCopyToClipboard, setIsSuccessCopyToClipboard] = useState(false);
    const closeModal = () => {
        setIsLoading(true);

        router.visit('/dashboard/admin/affiliate', {
            method: 'get',
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true,
        });
    }

    const copyToClipboard = async (text) => {
        await navigator.clipboard.writeText(text);

        setIsSuccessCopyToClipboard(true);

        toast.success('Copy to clipboard');
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
                                <input type="text" className="form-control bg-light" defaultValue={detail_item.name} readOnly={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="text" className="form-control bg-light" defaultValue={`(${detail_item.phone_code_number}) ${detail_item.phone_number_only}`} readOnly={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-mail</label>
                                <input type="text" className="form-control bg-light" defaultValue={detail_item.email} readOnly={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Affiliate Link</label>
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light" defaultValue={detail_item.affiliate_url} readOnly={true} />
                                    <button type="button" className="input-group-text" onClick={() => copyToClipboard(detail_item.affiliate_url)}>
                                        {isSuccessCopyToClipboard ? (
                                            <i className="align-middle fas fa-fw fa-check-circle text-success"></i>
                                        ) : (
                                            <i className="align-middle fas fa-fw fa-copy"></i>
                                        )}
                                    </button>
                                </div>
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

export default AffiliateShowModal;
