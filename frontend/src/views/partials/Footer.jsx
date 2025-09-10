import React, { useState } from "react";
import axios from "axios";
import "./Footer.css"; // Create this file for custom styles

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await axios.post("/api/v1/newsletter/subscribe/", { email });
            setMessage("Subscribed successfully!");
            setEmail("");
        } catch (err) {
            setMessage("Subscription failed or already subscribed.");
        }
    };

    return (
        <footer className="modern-footer">
            <div className="container py-5">
                <div className="row align-items-center gy-4">
                    {/* Logo & About */}
                    <div className="col-md-4 text-center text-md-start">
                        <div className="d-flex align-items-center mb-3 justify-content-center justify-content-md-start">
                            <img src="/logo.png" alt="footer logo" className="footer-logo me-2" />
                            <span className="fw-bold fs-4 text-white">dev diaries</span>
                        </div>
                        <p className="text-gray mb-2">
                            dev diaries is a modern blog platform for developers to share, learn, and grow together. Join our community and stay inspired!
                        </p>
                        <div className="footer-social mt-3">
                            <a href="https://facebook.com/desphixs" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/desphixs" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a href="https://youtube.com/@desphixs" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div className="col-md-2 text-center text-md-start">
                        <h6 className="text-white mb-3">Quick Links</h6>
                        <ul className="footer-links list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="/category/">Categories</a></li>
                            <li><a href="/about/">About</a></li>
                            <li><a href="/contact/">Contact</a></li>
                        </ul>
                    </div>
                    {/* Info */}
                    <div className="col-md-3 text-center text-md-start">
                        <h6 className="text-white mb-3">Contact</h6>
                        <ul className="footer-info list-unstyled">
                            <li><i className="fas fa-envelope me-2"></i> info@devdiaries.com</li>
                            <li><i className="fas fa-map-marker-alt me-2"></i> Addis Ababa, Ethiopia</li>
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div className="col-md-3 text-center text-md-start">
                        <h6 className="text-white mb-3">Newsletter</h6>
                        <form className="footer-newsletter" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-outline-primary w-100">Subscribe</button>
                            {message && <div className="mt-2 small text-info">{message}</div>}
                        </form>
                    </div>
                </div>
                <hr className="footer-divider my-4" />
                <div className="text-center text-gray small">
                    &copy; {new Date().getFullYear()} dev diaries. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
