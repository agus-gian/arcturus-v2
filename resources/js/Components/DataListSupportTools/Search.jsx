import React from 'react';
import {router, usePage} from "@inertiajs/react";

function Search({ items }) {
    const { getReqQuery } = usePage().props;

    const handleSearchChange = (value) => {
        router.visit(`${items.meta.path}`, {
            method: 'get',
            data: {
                page: '1',
                per_page: getReqQuery.per_page,
                search: value
            },
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." autoComplete="off" defaultValue={getReqQuery.search} onInput={(event) => handleSearchChange(event.target.value)} />
                <button className="btn btn-secondary" type="button"><i className="fas fa-search"></i></button>
            </div>
        </>
    );
}

export default Search;
