import React from 'react';
import {Head, usePage} from '@inertiajs/react';
import Dashboard from '@/Layouts/Dashboard';

export default function Home() {
    const { authUser } = usePage().props

    return (
        <>
            <Dashboard profile_picture_url="https://ui-avatars.com/api/?name=Agus&background=eef3ff&color=1761fd&bold=true">
                <Head title="Welcome" />

                <div className="container-fluid p-0">
                    <h1 className="h3 mb-3">Welcome</h1>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Empty card</h5>
                                </div>
                                <div className="card-body">
                                    Hello {authUser.name} - {authUser.email}, welcome to your first Inertia app!
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Dashboard>
        </>
    )
}
