import React from 'react';
import parse from "html-react-parser";
import {Link} from "@inertiajs/react";

function Pagination({ total_data, links }) {
    return (
        <>
            <div className="row">
                <div className="col">
                    Total: {total_data}
                </div>
                <div className="col">
                    <ul className="pagination pagination-md mb-0 justify-content-end">
                        {links.map((link, index) => (
                            <li className={`page-item ${link.active ? 'active' : link.url === null ? 'disabled' : ''}`} key={index}>
                                <Link preserveScroll className="page-link" href={link.url !== null ? link.url : '#'}>
                                    {parse(link.label)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Pagination;
