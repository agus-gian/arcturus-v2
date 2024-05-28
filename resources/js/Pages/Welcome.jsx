import React from 'react';
import { Head } from '@inertiajs/react';

export default function Welcome({ user }) {
    return (
        <>
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
                                Hello {user.name} - {user.email}, welcome to your first Inertia app!
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
