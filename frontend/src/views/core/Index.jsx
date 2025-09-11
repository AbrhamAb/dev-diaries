import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import "../../App.css";

function Index() {
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        apiInstance.get("post/lists/").then(res => setPosts(res.data));
        apiInstance.get("post/category/list/").then(res => setCategory(res.data));
    }, []);

    useEffect(() => {
        setPopularPosts([...posts].sort((a, b) => b.view - a.view));
    }, [posts]);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);

    // Like & Bookmark handlers
    const handleLikePost = async (postId) => {
        const jsonData = { user_id: useUserData()?.user_id, post_id: postId };
        const response = await apiInstance.post("post/like-post/", jsonData);
        Toast("success", response.data.message, "");
        apiInstance.get("post/lists/").then(res => setPosts(res.data));
    };
    const handleBookmarkPost = async (postId) => {
        const jsonData = { user_id: useUserData()?.user_id, post_id: postId };
        const response = await apiInstance.post("post/bookmark-post/", jsonData);
        Toast("success", response.data.message, "");
        apiInstance.get("post/lists/").then(res => setPosts(res.data));
    };

    return (
        <div>
            <Header />
            {/* Hero Section */}
            <section className="bg-gradient py-5 mb-4">
                <div className="container text-center">
                    <h1 className="fw-bold display-4 mb-3">Welcome to BlogMaster</h1>
                    <p className="lead mb-4">Discover trending articles, explore categories, and join our community!</p>
                    <img src="assets/images/adv-3.png" alt="Banner" className="img-fluid rounded-4 shadow" style={{maxHeight: "220px"}} />
                </div>
            </section>

            {/* Trending Articles */}
            <section className="container-fluid mb-5">
                <h2 className="mb-4 fw-bold" style={{fontSize: "2rem"}}>🔥 Trending Articles</h2>
                <div className="row g-4 justify-content-center">
                    {postItems.map((p, idx) => (
                        <div className="col-12 col-md-6 col-lg-4 d-flex" key={idx}>
                            <div className="card h-100 shadow-lg border-0 rounded-4 w-100 d-flex flex-column">
                                <img src={p.image} className="card-img-top rounded-top-4" alt={p.title} style={{height: "280px", objectFit: "cover"}} />
                                <div className="card-body d-flex flex-column px-3 pt-3">
                                    <h5 className="card-title fw-bold mb-2" style={{fontSize: "1.15rem"}}>
                                        <Link to={`/${p.slug}`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                            {p.title?.slice(0, 32) + "..."}
                                        </Link>
                                    </h5>
                                    <div className="d-flex align-items-center mb-2 gap-2">
                                        <button type="button" onClick={() => handleBookmarkPost(p.id)} className="btn btn-sm btn-light rounded-circle">
                                            <i className="fas fa-bookmark text-danger"></i>
                                        </button>
                                        <button onClick={() => handleLikePost(p.id)} className="btn btn-sm btn-light rounded-circle">
                                            <i className="fas fa-thumbs-up text-primary"></i>
                                        </button>
                                        <span>{p.likes?.length}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span><i className="fas fa-user"></i></span>
                                        <span>{p.profile?.full_name}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span><i className="fas fa-calendar"></i></span>
                                        <span>{moment(p.date).format("DD MMM, YYYY")}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <span><i className="fas fa-eye"></i></span>
                                        <span>{p.view} Views</span>
                                    </div>
                                    <Link to={`/${p.slug}`} className="btn btn-gradient mt-auto rounded-pill fw-bold">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <nav className="d-flex justify-content-center mt-5">
                    <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                <i className="fas fa-arrow-left me-2" />
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                                <button className="page-link" onClick={() => setCurrentPage(number)}>
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                                Next
                                <i className="fas fa-arrow-right ms-2" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </section>

            {/* Categories */}
            <section className="container-fluid mb-5">
                <h2 className="mb-4 fw-bold" style={{fontSize: "2rem"}}>📚 Categories</h2>
                <div className="row g-4 justify-content-center">
                    {category.map((c, idx) => (
                        <div className="col-12 col-md-6 col-lg-4 d-flex" key={idx}>
                            <div className="card h-100 shadow-lg border-0 rounded-4 w-100 d-flex flex-column align-items-center text-center">
                                <img src={c.image} className="card-img-top rounded-top-4" alt={c.title} style={{height: "180px", objectFit: "cover"}} />
                                <div className="card-body d-flex flex-column px-3 pt-3">
                                    <h5 className="card-title fw-bold mb-2" style={{fontSize: "1.15rem"}}>
                                        <Link to={`/category/${c.slug}/`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                            {c.title}
                                        </Link>
                                    </h5>
                                    <small className="text-muted mb-2">{c.post_count} Articles</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Articles */}
            <section className="container-fluid mb-5">
                <h2 className="mb-4 fw-bold" style={{fontSize: "2rem"}}>🕒 Popular Articles</h2>
                <div className="row g-4 justify-content-center">
                    {popularPosts.slice(0, 8).map((p, idx) => (
                        <div className="col-12 col-md-6 col-lg-4 d-flex" key={idx}>
                            <div className="card h-100 shadow-lg border-0 rounded-4 w-100 d-flex flex-column">
                                <img src={p.image} className="card-img-top rounded-top-4" alt={p.title} style={{height: "180px", objectFit: "cover"}} />
                                <div className="card-body px-3 pt-3 d-flex flex-column">
                                    <h5 className="card-title fw-bold mb-2" style={{fontSize: "1.15rem"}}>
                                        <Link to={`/${p.slug}`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                            {p.title?.slice(0, 32) + "..."}
                                        </Link>
                                    </h5>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span><i className="fas fa-user"></i></span>
                                        <span>{p.profile?.full_name}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span><i className="fas fa-calendar"></i></span>
                                        <span>{moment(p.date).format("DD MMM, YYYY")}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <span><i className="fas fa-eye"></i></span>
                                        <span>{p.view} Views</span>
                                    </div>
                                    <Link to={`/${p.slug}`} className="btn btn-gradient mt-auto rounded-pill fw-bold">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Index;