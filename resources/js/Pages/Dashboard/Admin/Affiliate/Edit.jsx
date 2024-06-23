import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import AffiliateEditModal from "@/Pages/Dashboard/Admin/Affiliate/Components/AffiliateEditModal.jsx";
import AffiliateCardDataList from "@/Pages/Dashboard/Admin/Affiliate/Components/AffiliateCardDataList.jsx";

function Edit({ items, detail_item, countries }) {
    let page_title = 'Affiliate';

    let modal_data = {
        'detail_item': detail_item,
        'countries': countries
    };

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <AffiliateCardDataList page_title={page_title} items={items} />

                <AffiliateEditModal modal_data={modal_data} />
            </Dashboard>
        </>
    );
}

export default Edit;
