import React, {useState} from 'react';
import {Link, router, usePage} from "@inertiajs/react";
import LoadingSpinner from "@/Components/Elements/LoadingSpinner.jsx";
import Pagination from "@/Components/DataListSupportTools/Pagination.jsx";
import NumberShown from "@/Components/DataListSupportTools/NumberShown.jsx";
import Search from "@/Components/DataListSupportTools/Search.jsx";

function AffiliateCardDataList({ page_title, items }) {
    const { getReqQuery } = usePage().props;
    const metaCurrentPage = items.meta.current_page;
    const metaPerPage = items.meta.per_page;
    const [isLoading, setIsLoading] = useState({
        createBtn: false,
        actionBtn: false
    });
    const [loadingId, setLoadingId] = useState(null);
    const [modalAct, setModalAct] = useState(null);

    const handleActive = (item_id, value) => {
        router.visit(`/dashboard/admin/affiliate/active/${item_id}`,{
            method: 'patch',
            data: {
                query_string: getReqQuery,
                active: value
            },
            preserveState: true,
            preserveScroll: true
        });
    }

    const handleCreate = () => {
        setIsLoading({
            createBtn: true,
            actionBtn: false
        });

        router.visit(`/dashboard/admin/affiliate/create`, {
            method: 'get',
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true
        })
    }

    const ActionBtn = (id, action) => {
        if (action !== 'delete') {
            setIsLoading({
                createBtn: false,
                actionBtn: true
            });

            setLoadingId(id);
            setModalAct(action);
        }

        let url_modal;

        if (action === 'view') {
            url_modal = `/dashboard/admin/affiliate/${id}`;
        }

        if (action === 'edit') {
            url_modal = `/dashboard/admin/affiliate/${id}/edit`;
        }

        if (action === 'delete') {
            url_modal = `/dashboard/admin/affiliate/${id}`;
        }

        if (url_modal !== '') {
            if (action === 'delete') {
                router.delete(url_modal, {
                    onBefore: () => confirm('Are you sure you want to delete this user?'),
                    data: {
                        query_string: getReqQuery
                    },
                    preserveState: true,
                    preserveScroll: true
                });
            } else {
                router.visit(url_modal,{
                    method: 'get',
                    data: getReqQuery,
                    preserveState: true,
                    preserveScroll: true
                });
            }
        } else {
            setIsLoading({
                createBtn: false,
                actionBtn: false
            });
        }
    }

    const FoundListData = ({items}) => {
        return (
            <>
                {items.data.map((item, index) => (
                    <tr key={item.id}>
                        <td>{(metaCurrentPage - 1) * metaPerPage + index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.code}</td>
                        <td>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="active" defaultChecked={item.active} onChange={e => handleActive(item.id, e.target.checked)} />
                            </div>
                        </td>
                        <td className="text-center bg-light">
                            <div className="btn-icon-list">
                                <Link className="btn btn-link p-0 text-reset me-0 me-md-1" title="Backdoor" href={`/dashboard/backdoor/redirect/user/${item.user_id}`}>
                                    <i className="align-middle me-2 fas fa-fw fa-door-open"></i>
                                </Link>

                                <button type="button" className="btn btn-link p-0 text-reset me-0 me-md-1" title="View" onClick={() => ActionBtn(item.id, 'view')}>
                                    {isLoading.actionBtn && loadingId === item.id && modalAct === 'view' ? (
                                        <LoadingSpinner size="small" className="me-2" />
                                    ) : (
                                        <i className="align-middle me-2 fas fa-fw fa-eye"></i>
                                    )}
                                </button>

                                <button type="button" className="btn btn-link p-0 text-reset me-0 me-md-1" title="Edit" onClick={() => ActionBtn(item.id, 'edit')}>
                                    {isLoading.actionBtn && loadingId === item.id && modalAct === 'edit' ? (
                                        <LoadingSpinner size="small" className="me-2" />
                                    ) : (
                                        <i className="align-middle me-2 fas fa-fw fa-edit"></i>
                                    )}
                                </button>

                                <button type="button" className="btn btn-link p-0 text-reset me-0 me-md-1" title="Delete" onClick={() => ActionBtn(item.id, 'delete')}>
                                    {isLoading.actionBtn && loadingId === item.id && modalAct === 'delete' ? (
                                        <LoadingSpinner size="small" className="me-2" />
                                    ) : (
                                        <i className="align-middle far fa-fw fa-trash-alt text-danger"></i>
                                    )}
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </>
        );
    }

    const NotFoundListData = ({colSpanLength}) => {
        return (
            <tr>
                <td className="text-center bg-light" colSpan={colSpanLength}>Sorry, data not found.</td>
            </tr>
        )
    }

    return (
        <>
            <div className="container-fluid p-0">
                <button type="button" className="btn btn-primary float-end mt-n1" disabled={isLoading.createBtn} onClick={handleCreate}>
                    {isLoading.createBtn && (<LoadingSpinner size="small" />)} Add {page_title}
                </button>

                <div className="mb-3">
                    <h1 className="h3 d-inline align-middle">{page_title}</h1>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row justify-content-between">
                                    <div className="col-6 col-sm-2">
                                        <NumberShown items={items} />
                                    </div>

                                    <div className="col-6 col-sm-3">
                                        <Search items={items} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th style={{ width:"5%" }}>No</th>
                                        <th style={{ width:"20%" }}>Name</th>
                                        <th style={{ width:"20%" }}>E-mail</th>
                                        <th style={{ width:"10%" }}>Code</th>
                                        <th style={{ width:"10%" }}>Status</th>
                                        <th style={{ width:"10%" }}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {items.meta.total > 0 ? (
                                            <FoundListData items={items} />
                                        ) : (
                                            <NotFoundListData colSpanLength={6} />
                                        )}
                                    </tbody>
                                </table>

                                <Pagination total_data={items.meta.total} links={items.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AffiliateCardDataList;
