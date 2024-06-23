import React, { useEffect, useState } from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Monitor, Settings } from 'react-feather';
import SuperAdminSidebar from "@/Components/MenuSidebars/SuperAdminSidebar.jsx";
import AffiliateSidebar from '@/Components/MenuSidebars/AffiliateSidebar';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransportSidebar from "@/Components/MenuSidebars/TransportSidebar.jsx";

export default function Dashboard({ children }) {
    const { appName, authUser, flash, isSuperAdmin } = usePage().props;
    const [isCollapse, setIsCollapse] = useState(false);
    const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const ModalLogout = () => {
        return (
            <>
                <div className="position-absolute top-50 start-50 translate-middle" style={{ display: `${isModalLogoutOpen ? 'block' : 'none'}`, zIndex: 1060 }}>
                    <div className="alert alert-primary alert-outline alert-dismissible">
                        <div className="alert-message">
                            <h4 className="alert-heading">Sign Out</h4>
                            <p>Are you realy want to signg out?</p>
                            <hr />
                            <div className="row gap-1">
                                <div className='col'>
                                    <Link href='/logout' className="btn btn-pill btn-primary w-100" as='button' type='button' method='post'>Yes</Link>
                                </div>
                                <div className='col'>
                                    <button className="btn btn-pill btn-danger w-100" type="button" onClick={() => setIsModalLogoutOpen(false)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-backdrop fade show"></div>
            </>
        )
    }

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
                            {(isSuperAdmin && authUser.role_name !== 'super-admin') && (
                                <>
                                    <li className="sidebar-header">
                                        Super Admin
                                    </li>

                                    <li className={`sidebar-item`}>
                                        <Link className='sidebar-link' href='/dashboard/backdoor/redirect/admin'>
                                            <Monitor className="align-middle" width="19" height="19" /> <span className="align-middle">Admin Dashboard</span>
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li className="sidebar-header">
                                Menu
                            </li>

                            {authUser.role_name === 'super-admin' && (
                                <SuperAdminSidebar />
                            )}

                            {authUser.role_name === 'affiliate' && (
                                <AffiliateSidebar />
                            )}

                            {authUser.role_name === 'transport' && (
                                <TransportSidebar />
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
                                        <button type='button' className="dropdown-item" onClick={() => setIsModalLogoutOpen(true)}>
                                            <i className="align-middle me-1" data-feather="log-out"></i> Log out
                                        </button>
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

            {isModalLogoutOpen && (
                <ModalLogout />
            )}

            <ToastContainer />
        </>
    )
}
