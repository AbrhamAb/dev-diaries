import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

function Profile() {
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        about: "",
        bio: "",
        facebook: "",
        twitter: "",
        country: "",
    });
    const userId = useUserData()?.user_id;
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId) fetchProfile();
        // eslint-disable-next-line
    }, [userId]);

    const fetchProfile = async () => {
        try {
            const res = await apiInstance.get(`user/profile/${userId}/`);
            setProfileData(res.data);
            setImagePreview(res.data.image);
        } catch {
            Toast("error", "Failed to load profile");
        }
    };

    const handleProfileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setProfileData({
            ...profileData,
            image: selectedFile,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiInstance.get(`user/profile/${userId}/`);
            const formData = new FormData();
            if (profileData.image && profileData.image !== res.data.image) {
                formData.append("image", profileData.image);
            }
            formData.append("full_name", profileData.full_name);
            formData.append("about", profileData.about);
            formData.append("bio", profileData.bio);
            formData.append("facebook", profileData.facebook);
            formData.append("twitter", profileData.twitter);
            formData.append("country", profileData.country);

            await apiInstance.patch(`user/profile/${userId}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Toast("success", "Profile updated successfully", "");
        } catch (error) {
            Toast("error", "An Error Occurred", "");
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="mb-0">Profile Details</h3>
                                    <p className="mb-0">You have full control to manage your own account setting.</p>
                                </div>
                                <form className="card-body" onSubmit={handleFormSubmit}>
                                    <div className="row align-items-center mb-4">
                                        <div className="col-12 col-md-auto text-center text-md-start mb-3 mb-md-0">
                                            <img
                                                src={imagePreview || "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"}
                                                id="img-uploaded"
                                                className="avatar-xl rounded-circle"
                                                alt="avatar"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div className="col-12 col-md">
                                            <h4 className="mb-0">Your avatar</h4>
                                            <p className="mb-0">PNG or JPG no bigger than 800px wide and tall.</p>
                                            <input type="file" name="image" className="form-control mt-3" onChange={handleFileChange} />
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div>
                                        <h4 className="mb-0">Personal Details</h4>
                                        <p className="mb-4">Edit your personal information and address.</p>
                                        <div className="row gx-3 gy-2">
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label" htmlFor="fname">
                                                    Full Name
                                                </label>
                                                <input type="text" id="fname" className="form-control" placeholder="Full Name" required onChange={handleProfileChange} name="full_name" value={profileData?.full_name} />
                                            </div>
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label" htmlFor="bio">
                                                    Bio
                                                </label>
                                                <input type="text" id="bio" className="form-control" placeholder="Bio" required value={profileData?.bio} onChange={handleProfileChange} name="bio" />
                                            </div>
                                            <div className="mb-3 col-12">
                                                <label className="form-label" htmlFor="about">
                                                    About Me
                                                </label>
                                                <textarea onChange={handleProfileChange} name="about" id="about" cols="30" value={profileData?.about} rows="5" className="form-control"></textarea>
                                            </div>
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label" htmlFor="country">
                                                    Country
                                                </label>
                                                <input type="text" id="country" className="form-control" placeholder="Country" required value={profileData?.country} onChange={handleProfileChange} name="country" />
                                            </div>
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label" htmlFor="facebook">
                                                    Facebook
                                                </label>
                                                <input type="text" id="facebook" className="form-control" placeholder="Facebook" value={profileData?.facebook} onChange={handleProfileChange} name="facebook" />
                                            </div>
                                            <div className="mb-3 col-12 col-md-6">
                                                <label className="form-label" htmlFor="twitter">
                                                    Twitter
                                                </label>
                                                <input type="text" id="twitter" className="form-control" placeholder="Twitter" value={profileData?.twitter} onChange={handleProfileChange} name="twitter" />
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                                    {loading ? (
                                                        <>Updating... <i className="fas fa-spinner fa-spin"></i></>
                                                    ) : (
                                                        <>Update Profile <i className="fas fa-check-circle"></i></>
                                                    )}
                                                </button>
                                            </div>
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

export default Profile;
