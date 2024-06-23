import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import AffiliateCardDataList from "@/Pages/Dashboard/Admin/Affiliate/Components/AffiliateCardDataList.jsx";

function Index({ items }) {
    let page_title = 'Affiliate';

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <AffiliateCardDataList page_title={page_title} items={items} />
            </Dashboard>
        </>
    );
}

export default Index;
