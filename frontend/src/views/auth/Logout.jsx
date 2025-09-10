import React, { useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";

function Logout() {
    useEffect(() => {
        logout();
    }, []);

    return (
        <>
            <Header />
            <section className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
                <div className="row justify-content-center w-100">
                    <div className="col-lg-5 col-md-8 col-12">
                        <div className="card shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                <div className="mb-4 text-center">
                                    <h1 className="mb-1 fw-bold">You have been logged out</h1>
                                    <span>Thanks for visiting our website, come back anytime!</span>
                                </div>
                                <div className="d-grid gap-3 mt-5">
                                    <Link to="/login/" className="btn btn-primary w-100">
                                        Login <i className="fas fa-sign-in-alt"></i>
                                    </Link>
                                    <Link to="/register/" className="btn btn-primary w-100">
                                        Register <i className="fas fa-user-plus"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Logout;
