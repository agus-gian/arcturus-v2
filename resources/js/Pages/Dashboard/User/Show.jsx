import React from 'react';
import {Head, router} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import NumberShown from "@/Components/DataListSupportTools/NumberShown.jsx";
import Search from "@/Components/DataListSupportTools/Search.jsx";
import UserList from "@/Pages/Dashboard/User/Components/UserList.jsx";
import Pagination from "@/Components/DataListSupportTools/Pagination.jsx";
import UserShowModal from "@/Pages/Dashboard/User/Components/UserShowModal.jsx";

function Show({ list_users, detail_user }) {
    let page_title = 'User';

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <div className="container-fluid p-0">
                    <button type="button" className="btn btn-primary float-end mt-n1">
                        Add {page_title}
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
                                            <NumberShown items={list_users} />
                                        </div>

                                        <div className="col-6 col-sm-3">
                                            <Search items={list_users} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <UserList users={list_users} />

                                    <Pagination total_data={list_users.meta.total} links={list_users.meta.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <UserShowModal user={detail_user} />
            </Dashboard>
        </>
    );
}

export default Show;
