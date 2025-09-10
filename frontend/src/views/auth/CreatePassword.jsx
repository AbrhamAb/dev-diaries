import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";

function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const otp = searchParams.get("otp");
    const uidb64 = searchParams.get("uidb64");
    const reset_token = searchParams.get("reset_token");

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password !== confirmPassword) {
            setIsLoading(false);
            Toast().fire({
                icon: "warning",
                text: "Password Does Not Match",
            });
        } else {
            setIsLoading(true);
            const formdata = new FormData();
            formdata.append("otp", otp);
            formdata.append("uidb64", uidb64);
            formdata.append("reset_token", reset_token);
            formdata.append("password", password);

            try {
                apiInstance.post(`user/password-change/`, formdata).then((res) => {
                    Toast().fire({
                        icon: "success",
                        text: "Password Changed Successfully",
                    });
                    navigate("/login");
                });
            } catch (error) {
                console.log(error);
                Toast().fire({
                    icon: "error",
                    title: "An Error Occured Try Again",
                });
                setIsLoading(false);
            }
        }
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
                                    <h1 className="mb-1 fw-bold">Create New Password</h1>
                                    <span>Choose a new password for your account</span>
                                </div>
                                <form className="needs-validation" onSubmit={handlePasswordSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Enter New Password
                                        </label>
                                        <input type="password" className="form-control" placeholder="**************" required onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">
                                            Confirm New Password
                                        </label>
                                        <input type="password" className="form-control" placeholder="**************" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="d-grid">
                                        {isLoading ? (
                                            <button disabled className="btn btn-primary">
                                                Processing <i className="fas fa-spinner fa-spin"></i>
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-primary">
                                                Save New Password <i className="fas fa-check-circle"></i>
                                            </button>
                                        )}
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

export default CreatePassword;
