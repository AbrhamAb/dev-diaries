import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

function Category() {
    const [posts, setPosts] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/posts/?category=${slug}`) // Adjust URL to match your backend
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => setPosts([]));
    }, [slug]);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div>
            <Header />
            <section className="pt-0 pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="d-block card-img-flash mb-3">
                                <img src="assets/images/adv-3.png" alt="" className="img-fluid rounded" />
                            </a>
                            <h2 className="text-start d-block mt-1">
                                <i className="bi bi-grid-fill"></i> {posts[0]?.category?.title} ({posts.length} Articles)
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0 mt-4">
                <div className="container">
                    <div className="row g-4">
                        {postItems?.map((p, index) => (
                            <div className="col-12 col-sm-6 col-lg-3" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-fold position-relative">
                                        <img className="card-img-top" style={{ width: "100%", height: "160px", objectFit: "cover" }} src={p.image} alt={p.title} />
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <h4 className="card-title">
                                            <Link to={`${p.slug}`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                                {p.title?.slice(0, 32) + "..."}
                                            </Link>
                                        </h4>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                <i className="bi bi-clock"></i> {moment(p.created_at).fromNow()}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <nav aria-label="Page navigation example" className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <Link className="page-link" to="#" onClick={() => setCurrentPage(currentPage - 1)}>
                                    Previous
                                </Link>
                            </li>
                            {pageNumbers.map(number => (
                                <li className={`page-item ${currentPage === number ? "active" : ""}`} key={number}>
                                    <Link className="page-link" to="#" onClick={() => setCurrentPage(number)}>
                                        {number}
                                    </Link>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <Link className="page-link" to="#" onClick={() => setCurrentPage(currentPage + 1)}>
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Category;
