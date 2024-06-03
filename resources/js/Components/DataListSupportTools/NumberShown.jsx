import React from 'react';
import {router, usePage} from "@inertiajs/react";

function NumberShown({ items }) {
    const { getReqQuery } = usePage().props;
    const handleNumberShownChange = (value) => {
        router.visit(`${items.meta.path}`, {
            method: 'get',
            data: {
                page: '1',
                per_page: value,
                search: getReqQuery.search
            },
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <>
            <label htmlFor="number_shown" className="me-2 d-inline">Show</label>

            <select id="number_shown" className="form-select w-auto d-inline" defaultValue={getReqQuery.per_page} onChange={(event) => handleNumberShownChange(event.target.value)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </>
    );
}

export default NumberShown;
