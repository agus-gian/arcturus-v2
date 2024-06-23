import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import TransportCardDataList from "@/Pages/Dashboard/Admin/Transport/Components/TransportCardDataList.jsx";
import TransportCreateModal from "@/Pages/Dashboard/Admin/Transport/Components/TransportCreateModal.jsx";

function Create({ items, phone_countries, address_countries }) {
    let page_title = 'Transport';

    let modal_data = {
        'phone_countries': phone_countries,
        'address_countries': address_countries
    };

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <TransportCardDataList page_title={page_title} items={items} />

                <TransportCreateModal modal_data={modal_data} />
            </Dashboard>
        </>
    );
}

export default Create;
