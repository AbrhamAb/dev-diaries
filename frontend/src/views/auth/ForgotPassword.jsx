import { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async () => {
        try {
            setIsLoading(true);
            await apiInstance.get(`user/password-reset/${email}/`).then((res) => {
                setEmail("");
                Swal.fire({
                    icon: "success",
                    title: "Password Reset Email Sent!",
                });
                setIsLoading(false);
            });
        } catch (error) {
            setIsLoading(false);
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
                                    <h1 className="mb-1 fw-bold">Forgot Password</h1>
                                    <span>Let's help you get back into your account</span>
                                </div>
                                <form className="needs-validation" onSubmit={e => { e.preventDefault(); handleEmailSubmit(); }}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="johndoe@gmail.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="d-grid">
                                            {isLoading === true ? (
                                                <button disabled className="btn btn-primary">
                                                    {" "}
                                                    Processing <i className="fas fa-spinner fa-spin"></i>
                                                </button>
                                            ) : (
                                                <button type="submit" className="btn btn-primary">
                                                    {" "}
                                                    Reset Password <i className="fas fa-arrow-right"></i>
                                                </button>
                                            )}
                                        </div>
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

export default ForgotPassword;
