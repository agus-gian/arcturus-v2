import React from 'react';
import {Monitor} from "react-feather";
import {Link, usePage} from "@inertiajs/react";

function AffiliateSidebar() {
    const { component } = usePage();

    return (
        <>
            <li className={`sidebar-item ${component.startsWith('Dashboard/Affiliate/Home') ? 'active' : ''}`}>
                <Link className='sidebar-link' href='/dashboard/affiliate'>
                    <Monitor className="align-middle" width="19" height="19" /> <span className="align-middle">Dashboards</span>
                </Link>
            </li>
        </>
    );
}

export default AffiliateSidebar;
