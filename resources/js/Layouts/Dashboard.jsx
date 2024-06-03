import React, {useState} from 'react';
import {usePage} from "@inertiajs/react";
import {Settings} from 'react-feather';
import SuperAdmin from "@/Components/MenuSidebars/SuperAdminSidebar.jsx";

export default function Dashboard({ children }) {
    const { appName, authUser } = usePage().props;
    const [isCollapse, setIsCollapse] = useState(false);

    return (
        <>
            <div className="wrapper">
                <nav id="sidebar" className={`sidebar-position-left sidebar ${isCollapse ? 'collapsed' : ''}`}>
                    <div className="sidebar-content js-simplebar">
                        <div className='sidebar-brand'>
                            <span className="sidebar-brand-text align-middle">
                                {appName}
                            </span>
                        </div>

                        <div className="sidebar-user">
                            <div className="d-flex justify-content-center">
                                <div className="flex-shrink-0">
                                    <img src={authUser.profile_picture} className="avatar img-fluid rounded me-1" alt={authUser.name} />
                                </div>
                                <div className="flex-grow-1 ps-2">
                                    <span className="sidebar-user-title">
                                        {authUser.name}
                                    </span>

                                    <div className="sidebar-user-subtitle">
                                        {authUser.role_label}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className="sidebar-nav">
                            <li className="sidebar-header">
                                Menu
                            </li>

                            {authUser.role_name === 'super-admin' ? (
                                <SuperAdmin />
                            ) : authUser.role_name === 'transport' ? (
                                <SuperAdmin />
                            ) : (
                                <SuperAdmin />
                            )}
                        </ul>
                    </div>
                </nav>

                <div className="main">
                    <nav className="navbar navbar-expand navbar-light navbar-bg">
                        <a className="sidebar-toggle js-sidebar-toggle" onClick={() => setIsCollapse(!isCollapse)}>
                            <i className="hamburger align-self-center"></i>
                        </a>

                        <div className="navbar-collapse collapse">
                            <ul className="navbar-nav navbar-align">
                                <li className="nav-item dropdown">
                                    <a className="nav-icon pe-md-0 dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                        <Settings className="align-middle me-1" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className='dropdown-item' href='#'>
                                            <i className="align-middle me-1" data-feather="user"></i> Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="align-middle me-1" data-feather="log-out"></i> Log out
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="content">
                        {children}
                    </main>

                    <footer className="footer">
                        <div className="container-fluid">
                            <div className="row text-muted">
                                <div className="col-6 text-start">
                                    <p className="mb-0">
                                        <a href="/dashboard" className="text-muted"><strong>{appName}</strong></a>
                                    </p>
                                </div>
                                <div className="col-6 text-end">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#">Support</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#">Help Center</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#">Privacy</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="text-muted" href="#">Terms</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
