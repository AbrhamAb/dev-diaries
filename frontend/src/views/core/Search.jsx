import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";

function Search() {
    return (
        <div>
            <Header />
            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="d-block card-img-flash mb-3">
                                <img src="assets/images/adv-3.png" alt="" className="img-fluid rounded" />
                            </a>
                            <h2 className="text-start d-block mt-1">
                                <i className="fas fa-search"></i> Search All Articles
                            </h2>
                            <input type="text" className="form-control" placeholder="Search All Articles" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0 mt-4">
                <div className="container">
                    <div className="row g-4">
                        {[...Array(12)].map((_, index) => (
                            <div className="col-12 col-sm-6 col-lg-3" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-fold position-relative">
                                        <img
                                            className="card-img-top"
                                            style={{ width: "100%", height: "160px", objectFit: "cover" }}
                                            src={`https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/cheerful-loving-couple-bakers-drinking-coffee-PCAVA6B-2.jpg`}
                                            alt="Card image"
                                        />
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <h4 className="card-title">
                                            <Link to="/post-single.html" className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                                7 common mistakes everyone makes while traveling
                                            </Link>
                                        </h4>
                                        <ul className="mt-3 list-unstyled">
                                            <li>
                                                <span className="text-dark">
                                                    <i className="fas fa-user"></i> Louis Ferguson
                                                </span>
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-calendar"></i> Mar 07, 2022
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-eye"></i> 10 Views
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav className="d-flex flex-wrap justify-content-center mt-2">
                        <ul className="pagination mb-0">
                            <li className="page-item disabled">
                                <button className="page-link text-dark fw-bold me-1 rounded">
                                    <i className="fas fa-arrow-left me-2" />
                                    Previous
                                </button>
                            </li>
                            <li className="page-item active">
                                <button className="page-link text-dark fw-bold rounded">1</button>
                            </li>
                            <li className="page-item ms-1">
                                <button className="page-link text-dark fw-bold rounded">2</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link text-dark fw-bold ms-1 rounded">
                                    Next
                                    <i className="fas fa-arrow-right ms-3 " />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Search;
