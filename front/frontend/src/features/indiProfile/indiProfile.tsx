import "./indiProfile.css";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import NavBar from "../navBar/navBar";
import axiosInstance from "../../shared/config/axiosInstance";
import { useParams } from "react-router-dom";

interface IUser {
  _id: string;
  username: string;
  email: string;
  role?: string;
  profilePicture?: { url: string };
  skills?: string[];
}

export default function IndiProfile() {
  const { id } = useParams<{ id: string }>();
  const loggedInUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [user, setUser] = useState<IUser | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const defaultSkills: string[] = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "MongoDB",
    "TypeScript",
  ];

  // 🔹 Fetch user by ID from backend
  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      });
  }, [id]);

  // 🔹 Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // 🔹 Upload profile picture (only if own profile)
  const handleUpload = async () => {
    if (!file || !user) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosInstance.patch(
        "/user/uploadProfilePicture",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updatedUser = { ...user, profilePicture: res.data.image };
      setUser(updatedUser);

      // Update localStorage if editing own profile
      if (loggedInUser._id === user._id) {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "#fff" }}>
        Loading profile...
      </div>
    );
  }

  const skills =
    user.skills && user.skills.length > 0 ? user.skills : defaultSkills;

  return (
    <div>
      <NavBar />
      <div className="homepage-wrapper">
        <div className="profile-main-container">
          {/* Profile Header */}
          <div className="profile-header-card">
            <div className="profile-banner"></div>
            <div className="profile-header-content">
              <div className="profile-avatar-large">
                {user.profilePicture?.url ? (
                  <img
                    src={user.profilePicture.url}
                    alt="Profile"
                    className="profile-avatar-img"
                  />
                ) : (
                  <FaUserCircle size={100} color="#fff" />
                )}
              </div>
              <div className="profile-header-text">
                <h2 className="profile-name">{user.username}</h2>
                <p className="profile-email">{user.email || "No email"}</p>
              </div>
            </div>

            {/* Upload Form (only if own profile) */}
            {loggedInUser._id === user._id && (
              <div className="profile-upload-container">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Picture"}
                </button>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="profile-section">
            <h3>About</h3>
            <div className="profile-about-box">
              <div className="about-item">
                <span className="about-label">Full Name:</span>
                <span className="about-value">{user.username}</span>
              </div>
              <div className="about-item">
                <span className="about-label">Email:</span>
                <span className="about-value">{user.email || "No email"}</span>
              </div>
              <div className="about-item">
                <span className="about-label">Role:</span>
                <span className="about-value">{user.role || "No role set"}</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="profile-section">
            <h3>Skills & Endorsements</h3>
            <div className="skills-box">
              {skills.map((skill: string, idx: number) => (
                <span className="skill-tag" key={idx}>
                  {skill}
                </span>
              ))}
              {loggedInUser._id === user._id && (
                <span className="skill-tag add-skill">+ Add skill</span>
              )}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="profile-section">
            <h3>Recent Activity</h3>
            <div className="recent-activity-item">
              <div className="recent-activity-icon user-icon">👤</div>
              <div>
                <strong>{user.username}</strong> updated their profile picture
                <div className="profile-email-meta">2 days ago</div>
              </div>
            </div>
            <div className="recent-activity-item">
              <div className="recent-activity-icon work-icon">💼</div>
              <div>
                <strong>{user.username}</strong> updated role:{" "}
                {user.role || "No role set"}
                <div className="profile-email-meta">1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
