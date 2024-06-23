import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import TransportCardDataList from "@/Pages/Dashboard/Admin/Transport/Components/TransportCardDataList.jsx";

function Index({ items }) {
    let page_title = 'Transport';

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <TransportCardDataList page_title={page_title} items={items} />
            </Dashboard>
        </>
    );
}

export default Index;
