import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";

function Comments() {
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState({});
    const [activeCollapse, setActiveCollapse] = useState(null);

    const fetchComment = async () => {
        const response = await apiInstance.get(`author/dashboard/comment-list/`);
        setComments(response.data);
    };

    useEffect(() => {
        fetchComment();
    }, []);

    const handleReplyChange = (commentId, value) => {
        setReply({ ...reply, [commentId]: value });
    };

    const handleSubmitReply = async (commentId) => {
        try {
            await apiInstance.post(`author/dashboard/reply-comment/`, {
                comment_id: commentId,
                reply: reply[commentId] || "",
            });
            fetchComment();
            Toast("success", "Reply Sent.", "");
            setReply({ ...reply, [commentId]: "" });
            setActiveCollapse(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-lg-flex align-items-center justify-content-between">
                                    <div className="mb-3 mb-lg-0">
                                        <h3 className="mb-0">Comments</h3>
                                        <span>You have full control to manage your own comments.</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {comments?.map((c) => (
                                            <li className="list-group-item p-4 shadow rounded-3 mb-3" key={c.id}>
                                                <div className="d-flex">
                                                    <img src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" alt="avatar" className="rounded-circle avatar-lg" style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} />
                                                    <div className="ms-3 mt-2 flex-grow-1">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h4 className="mb-0">{c.name}</h4>
                                                                <span>{Moment(c.date)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <p className="mt-2">
                                                                <span className="fw-bold me-2">
                                                                    Comment <i className="fas fa-arrow-right"></i>
                                                                </span>
                                                                {c.comment}
                                                            </p>
                                                            <p className="mt-2 d-flex">
                                                                <span className="fw-bold me-2">
                                                                    Response <i className="fas fa-arrow-right"></i>
                                                                </span>
                                                                {c.reply || <span className="text-danger">No Reply</span>}
                                                            </p>
                                                            <p>
                                                                <button
                                                                    className="btn btn-outline-secondary"
                                                                    type="button"
                                                                    onClick={() => setActiveCollapse(activeCollapse === c.id ? null : c.id)}
                                                                >
                                                                    Send Response
                                                                </button>
                                                            </p>
                                                            {activeCollapse === c.id && (
                                                                <div className="card card-body mb-3">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">
                                                                            Write Response
                                                                        </label>
                                                                        <textarea
                                                                            onChange={(e) => handleReplyChange(c.id, e.target.value)}
                                                                            value={reply[c.id] || ""}
                                                                            className="form-control"
                                                                            rows="4"
                                                                        ></textarea>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleSubmitReply(c.id)}
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Send Response <i className="fas fa-paper-plane"></i>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
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

export default Comments;
