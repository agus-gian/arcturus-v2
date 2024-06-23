import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import AffiliateCreateModal from "@/Pages/Dashboard/Admin/Affiliate/Components/AffiliateCreateModal.jsx";
import AffiliateCardDataList from "@/Pages/Dashboard/Admin/Affiliate/Components/AffiliateCardDataList.jsx";

function Create({ items, countries }) {
    let page_title = 'Affiliate';

    let modal_data = {
        'countries': countries
    };

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <AffiliateCardDataList page_title={page_title} items={items} />

                <AffiliateCreateModal modal_data={modal_data} />
            </Dashboard>
        </>
    );
}

export default Create;
