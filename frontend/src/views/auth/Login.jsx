import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { login } from "../../utils/auth";

function Login() {
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setBioData({
            email: "",
            password: "",
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await login(bioData.email, bioData.password);
        if (error) {
            alert(JSON.stringify(error));
            resetForm();
        } else {
            navigate("/");
        }
        setIsLoading(false);
    };

    return (
        <>
            <Header />
            <section className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
                <div className="row justify-content-center w-100">
                    <div className="col-lg-5 col-md-8 col-12">
                        <div className="card shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                <div className="mb-4 text-center">
                                    <h1 className="mb-1 fw-bold">Sign in</h1>
                                    <span>
                                        Don’t have an account?
                                        <Link to="/register/" className="ms-1">
                                            Sign up
                                        </Link>
                                    </span>
                                </div>
                                <form className="needs-validation" noValidate onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            onChange={handleBioDataChange}
                                            value={bioData.email}
                                            id="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="johndoe@gmail.com"
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter valid username.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            onChange={handleBioDataChange}
                                            value={bioData.password}
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="**************"
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter valid password.</div>
                                    </div>
                                    <div className="d-lg-flex justify-content-between align-items-center mb-4">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="rememberme" />
                                            <label className="form-check-label" htmlFor="rememberme">
                                                Remember me
                                            </label>
                                        </div>
                                        <div>
                                            <Link to="/forgot-password/">Forgot your password?</Link>
                                        </div>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <span className="me-2">Processing...</span>
                                                    <i className="fas fa-spinner fa-spin" />
                                                </>
                                            ) : (
                                                <>
                                                    <span className="me-2">Sign In</span>
                                                    <i className="fas fa-sign-in-alt" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Login;
