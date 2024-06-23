import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import TransportShowModal from "@/Pages/Dashboard/Admin/Transport/Components/TransportShowModal.jsx";
import TransportCardDataList from "@/Pages/Dashboard/Admin/Transport/Components/TransportCardDataList.jsx";

function Show({ items, detail_item }) {
    let page_title = 'Transport';

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <TransportCardDataList page_title={page_title} items={items} />

                <TransportShowModal detail_item={detail_item} />
            </Dashboard>
        </>
    );
}

export default Show;
