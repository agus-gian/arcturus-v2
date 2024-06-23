import React from 'react';
import {Anchor, Monitor, Home, User, Briefcase} from "react-feather";
import {Link, usePage} from "@inertiajs/react";

function SuperAdminSidebar() {
    const { component } = usePage();
    const { currentRouteName } = usePage().props;

    return (
        <>
            <li className={`sidebar-item ${currentRouteName === 'dashboard.admin.home.index' ? 'active' : ''}`}>
                <Link className='sidebar-link' href='/dashboard/admin'>
                    <Monitor className="align-middle" width="19" height="19" /> <span className="align-middle">Dashboards</span>
                </Link>
            </li>

            <li className="sidebar-item">
                <a data-bs-target="#nav-master" data-bs-toggle="collapse" className="sidebar-link collapsed">
                    <Anchor className="align-middle" width="19" height="19" /> <span className="align-middle">Master Data</span>
                </a>
                <ul id="nav-master" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                    <li className="sidebar-item ">
                        <Link className='sidebar-link' href='/dashboard/admin/master/destination'>All Destination</Link>
                    </li>
                </ul>
            </li>

            <li className={`sidebar-item ${component.startsWith('Dashboard/Admin/Transport') ? 'active' : ''}`}>
                <a data-bs-target="#nav-transport" data-bs-toggle="collapse" className={`sidebar-link ${component.startsWith('Dashboard/Admin/Transport') ? '' : 'collapsed'}`}>
                    <Briefcase className="align-middle" width="19" height="19" /> <span className="align-middle">Transport</span>
                </a>
                <ul id="nav-transport" className={`sidebar-dropdown list-unstyled collapse ${component.startsWith('Dashboard/Admin/Transport') ? 'show' : ''}`} data-bs-parent="#sidebar">
                    <li className={`sidebar-item ${component.startsWith('Dashboard/Admin/Transport') ? 'active' : ''}`}>
                        <Link className='sidebar-link' href='/dashboard/admin/transport'>All Transport</Link>
                    </li>
                </ul>
            </li>

            <li className={`sidebar-item ${component.startsWith('Dashboard/Admin/Affiliate') ? 'active' : ''}`}>
                <a data-bs-target="#nav-affiliate" data-bs-toggle="collapse" className={`sidebar-link ${component.startsWith('Dashboard/Admin/Affiliate') ? '' : 'collapsed'}`}>
                    <User className="align-middle" width="19" height="19" /> <span className="align-middle">Affiliate</span>
                </a>
                <ul id="nav-affiliate" className={`sidebar-dropdown list-unstyled collapse ${component.startsWith('Dashboard/Admin/Affiliate') ? 'show' : ''}`} data-bs-parent="#sidebar">
                    <li className={`sidebar-item ${component.startsWith('Dashboard/Admin/Affiliate') ? 'active' : ''}`}>
                        <Link className='sidebar-link' href='/dashboard/admin/affiliate'>All Affiliate</Link>
                    </li>
                </ul>
            </li>
        </>
    );
}

export default SuperAdminSidebar;
