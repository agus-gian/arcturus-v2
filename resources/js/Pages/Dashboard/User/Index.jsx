import React, {useState} from 'react';
import {Head, Link, router, usePage} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import Pagination from "@/Components/DataListSupportTools/Pagination.jsx";
import NumberShown from "@/Components/DataListSupportTools/NumberShown.jsx";
import Search from "@/Components/DataListSupportTools/Search.jsx";
import UserList from "@/Pages/Dashboard/User/Components/UserList.jsx";
import LoadingSpinner from "@/Components/Elements/LoadingSpinner.jsx";

function Index({ users }) {
    let page_title = 'User';

    const { getReqQuery } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const handleCreate = () => {
        setIsLoading(true);

        router.visit(`/dashboard/user/create`, {
            method: 'get',
            data: getReqQuery,
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <div className="container-fluid p-0">
                    <button type="button" className="btn btn-primary float-end mt-n1" disabled={isLoading} onClick={handleCreate}>
                        {isLoading && (<LoadingSpinner size="small" />)} Add {page_title}
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
                                            <NumberShown items={users} />
                                        </div>

                                        <div className="col-6 col-sm-3">
                                            <Search items={users} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <UserList users={users} />

                                    <Pagination total_data={users.meta.total} links={users.meta.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>
        </>
    );
}

export default Index;
