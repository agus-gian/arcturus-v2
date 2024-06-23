import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import AffiliateShowModal from "@/Pages/Dashboard/Admin/Affiliate/Components/AffiliateShowModal.jsx";
import AffiliateCardDataList from "@/Pages/Dashboard/Admin/Affiliate/Components/AffiliateCardDataList.jsx";

function Show({ items, detail_item }) {
    let page_title = 'Affiliate';

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <AffiliateCardDataList page_title={page_title} items={items} />

                <AffiliateShowModal detail_item={detail_item} />
            </Dashboard>
        </>
    );
}

export default Show;
