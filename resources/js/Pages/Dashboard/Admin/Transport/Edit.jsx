import React from 'react';
import {Head} from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard.jsx";
import TransportCardDataList from "@/Pages/Dashboard/Admin/Transport/Components/TransportCardDataList.jsx";
import TransportEditModal from "@/Pages/Dashboard/Admin/Transport/Components/TransportEditModal.jsx";

function Edit({ items, detail_item, phone_countries, address_countries, address_states, address_cities }) {
    let page_title = 'Transport';

    let modal_data = {
        detail_item: detail_item,
        phone_countries: phone_countries,
        address_countries: address_countries,
        address_states: address_states,
        address_cities: address_cities
    };

    return (
        <>
            <Head title={page_title} />

            <Dashboard>
                <TransportCardDataList page_title={page_title} items={items} />

                <TransportEditModal modal_data={modal_data} />
            </Dashboard>
        </>
    );
}

export default Edit;
