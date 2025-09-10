import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

function Notifications() {
    const [noti, setNoti] = useState([]);
    const userId = useUserData()?.user_id;

    useEffect(() => {
        if (userId) fetchNoti();
        // eslint-disable-next-line
    }, [userId]);

    const fetchNoti = async () => {
        try {
            const response = await apiInstance.get(`author/dashboard/noti-list/${userId}/`);
            setNoti(response.data || []);
        } catch {
            Toast("error", "Failed to load notifications");
        }
    };

    const handleMarkNotiAsSeen = async (notiId) => {
        try {
            await apiInstance.post("author/dashboard/noti-mark-seen/", { noti_id: notiId });
            Toast("success", "Notification Seen", "");
            fetchNoti();
        } catch {
            Toast("error", "Failed to mark notification as seen");
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
                                <div className="card-header d-flex flex-column flex-lg-row align-items-lg-center justify-content-between">
                                    <div className="mb-3 mb-lg-0">
                                        <h3 className="mb-0">Notifications</h3>
                                        <span>Manage all your notifications from here</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {noti?.map((n) => (
                                            <li className="list-group-item p-4 shadow rounded-3 mt-4" key={n.id}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="d-flex flex-column flex-md-row justify-content-between position-relative">
                                                            <div className="d-flex align-items-center">
                                                                <div className="icon-lg bg-opacity-15 rounded-2 flex-shrink-0 me-3">
                                                                    {n.type === "Like" && <i className="fas fa-thumbs-up text-primary fs-5" />}
                                                                    {n.type === "Comment" && <i className="bi bi-chat-left-quote-fill text-success fs-5" />}
                                                                    {n.type === "Bookmark" && <i className="fas fa-bookmark text-danger fs-5" />}
                                                                </div>
                                                                <div>
                                                                    <h6 className="mb-0">{n.type}</h6>
                                                                    <div className="mb-0">
                                                                        {n.type === "Like" && (
                                                                            <span>
                                                                                Someone liked your post <b>{n.post?.title?.slice(0, 30) + "..."}</b>
                                                                            </span>
                                                                        )}
                                                                        {n.type === "Comment" && (
                                                                            <span>
                                                                                You have a new comment on <b>{n.post?.title?.slice(0, 30) + "..."}</b>
                                                                            </span>
                                                                        )}
                                                                        {n.type === "Bookmark" && (
                                                                            <span>
                                                                                Someone bookmarked your post <b>{n.post?.title?.slice(0, 30) + "..."}</b>
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <span className="small">5 min ago</span>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 mt-md-0">
                                                                <button onClick={() => handleMarkNotiAsSeen(n.id)} className="btn btn-secondary">
                                                                    <i className="fas fa-check-circle"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        {noti?.length < 1 && <p className="text-center mt-4">No notifications yet</p>}
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

export default Notifications;
