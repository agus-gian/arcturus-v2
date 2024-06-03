import React, {useState} from 'react';
import {router, usePage} from "@inertiajs/react";
import LoadingSpinner from "@/Components/Elements/LoadingSpinner.jsx";

function UserList({ users }) {
    const { getReqQuery } = usePage().props;
    const metaCurrentPage = users.meta.current_page;
    const metaPerPage = users.meta.per_page;
    const [isLoading, setIsLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(null);
    const [modalAct, setModalAct] = useState(null);

    const ActionBtn = (id, action) => {
        setIsLoading(true);
        setLoadingId(id);
        setModalAct(action);

        let url_modal;

        if (action === 'view') {
            url_modal = `/dashboard/user/${id}`;
        }

        if (action === 'edit') {
            url_modal = `/dashboard/user/${id}/edit`;
        }

        if (url_modal !== '') {
            router.visit(url_modal,{
                method: 'get',
                data: getReqQuery,
                preserveState: true,
                preserveScroll: true
            });
        } else {
            setIsLoading(false);
        }
    }

    const DeleteItem = (item_id) => {
        router.delete(`/dashboard/user/${item_id}`, {
            onBefore: () => confirm('Are you sure you want to delete this user?'),
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true,
        })
    }

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th style={{ width:"5%" }}>No</th>
                    <th style={{ width:"25%" }}>Name</th>
                    <th style={{ width:"20%" }}>E-mail</th>
                    <th style={{ width:"10%" }}>Role</th>
                    <th style={{ width:"15%" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.data.map((user, index) => {
                    return (
                        <tr key={user.id}>
                            <td>{(metaCurrentPage - 1) * metaPerPage + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role_label}</td>
                            <td className="text-center bg-light">
                                <div className="btn-icon-list">
                                    <button type="button" className="btn btn-link p-0 text-reset me-0 me-md-1" title="View" onClick={() => ActionBtn(user.id,'view')}>
                                        {isLoading && loadingId === user.id && modalAct === 'view' ? (
                                            <LoadingSpinner size="small" />
                                        ) : (
                                            <i className="align-middle me-2 fas fa-fw fa-eye"></i>
                                        )}
                                    </button>

                                    <button type="button" className="btn btn-link p-0 text-reset me-0 me-md-1" title="Edit" onClick={() => ActionBtn(user.id,'edit')}>
                                        {isLoading && loadingId === user.id && modalAct === 'edit' ? (
                                            <LoadingSpinner size="small" />
                                        ) : (
                                            <i className="align-middle me-2 fas fa-fw fa-edit"></i>
                                        )}
                                    </button>

                                    <button type="button" className="btn btn-link p-0 text-danger me-0 me-md-1" onClick={() => DeleteItem(user.id)}>
                                        <i className="align-middle me-2 far fa-fw fa-trash-alt"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}

export default UserList;
