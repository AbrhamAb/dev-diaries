import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { useCategories } from "../../hooks/useCategories";
import "./Header.css";

function Header() {
    const [isLoggedIn, user] = useAuthStore((state) => [state.isLoggedIn, state.user]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [search, setSearch] = useState("");
    const navRef = useRef(null);
    const categories = useCategories();
    const navigate = useNavigate();
    console.log("Categories from hook:", categories);

    // Close dropdowns when clicking/touching outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    // Toggle dropdown open/close
    const handleDropdownToggle = (name) => (e) => {
        e.preventDefault();
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`);
            setSearch("");
        }
    };

    return (
        <header className="modern-navbar">
            <nav className="navbar navbar-expand-lg navbar-dark" ref={navRef}>
                <div className="container-fluid px-3 px-md-5">
                    <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="navbar-brand-item"
                        />
                        <span className="fw-bold fs-4 brand-title">BlogMaster</span>
                    </Link>
                    <button
                        className="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="mx-auto nav-searchbar">
                            <form className="rounded-pill position-relative" onSubmit={handleSearchSubmit}>
                                <input
                                    className="form-control pe-5 rounded-pill"
                                    type="search"
                                    placeholder="Search Articles"
                                    aria-label="Search"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <button
                                    className="btn bg-transparent border-0 px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                                    type="submit"
                                >
                                    <i className="bi bi-search fs-5"></i>
                                </button>
                            </form>
                        </div>
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 gap-2">
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className={`nav-link dropdown-toggle px-3${openDropdown === "category" ? " show" : ""}`}
                                    href="#"
                                    id="categoryDropdown"
                                    aria-haspopup="true"
                                    aria-expanded={openDropdown === "category"}
                                    onClick={handleDropdownToggle("category")}
                                >
                                    Category
                                </a>
                                <ul className={`dropdown-menu dropdown-menu-end${openDropdown === "category" ? " show" : ""}`} aria-labelledby="categoryDropdown">
                                    {categories.length === 0 ? (
                                        <li>
                                            <span className="dropdown-item text-muted">No categories</span>
                                        </li>
                                    ) : (
                                        categories.map(cat => (
                                            <li key={cat.slug}>
                                                <Link className="dropdown-item" to={`/category/${cat.slug}`}>
                                                    {cat.name}
                                                </Link>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className={`nav-link dropdown-toggle px-3${openDropdown === "info" ? " show" : ""}`}
                                    href="#"
                                    id="infoDropdown"
                                    aria-haspopup="true"
                                    aria-expanded={openDropdown === "info"}
                                    onClick={handleDropdownToggle("info")}
                                >
                                    Info
                                </a>
                                <ul className={`dropdown-menu dropdown-menu-end${openDropdown === "info" ? " show" : ""}`} aria-labelledby="infoDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/about/">
                                            <i className="bi bi-person-lines-fill"></i> About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/contact/">
                                            <i className="bi bi-telephone-fill"></i> Contact
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className={`nav-link dropdown-toggle px-3${openDropdown === "menu" ? " show" : ""}`}
                                    href="#"
                                    id="menuDropdown"
                                    aria-haspopup="true"
                                    aria-expanded={openDropdown === "menu"}
                                    onClick={handleDropdownToggle("menu")}
                                >
                                    Menu
                                </a>
                                <ul className={`dropdown-menu dropdown-menu-end${openDropdown === "menu" ? " show" : ""}`} aria-labelledby="menuDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/dashboard/">
                                            <i className="fas fa-user"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/posts/">
                                            <i className="bi bi-grid-fill"></i> Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/add-post/">
                                            <i className="fas fa-plus-circle"></i> Add Post
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/comments/">
                                            <i className="bi bi-chat-left-quote-fill"></i> Comments
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/notifications/">
                                            <i className="fas fa-bell"></i> Notifications
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/profile/">
                                            <i className="fas fa-user-gear"></i> Profile
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item ms-lg-2 mt-3 mt-lg-0 d-flex align-items-center justify-content-center">
                                {isLoggedIn() ? (
                                    <div className="navbar-btn-group d-flex flex-column flex-lg-row gap-2 w-100">
                                        <Link to={"/dashboard/"} className="btn btn-outline-primary btn-sm rounded-pill">
                                            Insights <i className="fas fa-gauge-high"></i>
                                        </Link>
                                        <Link to={"/logout/"} className="btn btn-outline-danger btn-sm rounded-pill">
                                            Logout <i className="fas fa-sign-out-alt"></i>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column flex-lg-row gap-2 w-100">
                                        <Link to={"/register/"} className="btn btn-outline-success btn-sm rounded-pill">
                                            Register <i className="fas fa-user-plus"></i>
                                        </Link>
                                        <Link to={"/login/"} className="btn btn-outline-primary btn-sm rounded-pill">
                                            Login <i className="fas fa-sign-in-alt"></i>
                                        </Link>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
