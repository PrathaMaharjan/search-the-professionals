import './profile.css';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import NavBar from '../navBar/navBar';
import axiosInstance from '../../shared/config/axiosInstance';

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const [user, setUser] = useState(storedUser);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const defaultSkills: string[] = ["React", "Node.js", "Python", "Java", "MongoDB", "TypeScript"];
  const skills = (user.skills && user.skills.length > 0) ? user.skills : defaultSkills;

  if (!user || !user.username) {
    return <div style={{ textAlign: 'center', marginTop: '2rem', color: '#fff' }}>No user data found.</div>;
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Upload image to backend
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file); 
    try {
      const res = await axiosInstance.patch("/user/uploadProfilePicture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = {
        ...user,
        profilePicture: res.data.image,
      };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

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

            {/* Upload Form */}
            <div className="profile-upload-container">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Picture"}
              </button>
            </div>
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
            </div>
          </div>

          {/* Email Section */}
          <div className="profile-section">
            <h3>Email</h3>
            <div className="profile-email-box" style={{ display: 'flex', flexDirection: 'column' }}>
              <div>{user.email || "No email"}</div>
              <button className="profile-add-email-btn" style={{ marginTop: '0.5rem' }}>+ Add Email Address</button>
            </div>
          </div>

          {/* Experience Section */}
          <div className="profile-section">
            <h3>Role</h3>
            <div className="profile-experience-box" style={{ display: 'flex', flexDirection: 'column' }}>
              <div>{user.role || "No role"}</div>
               <button className="profile-add-email-btn" style={{ marginTop: '0.5rem' }}>+ Add new role</button>
              
            </div>
          </div>

          {/* Skills Section */}
          <div className="profile-section">
            <h3>Skills & Endorsements</h3>
            <div className="skills-box">
              {skills.map((skill: string, idx: number) => (
                <span className="skill-tag" key={idx}>{skill}</span>
              ))}
              <span className="skill-tag add-skill">+ Add skill</span>
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
                <strong>{user.username}</strong> added new work experience
                <div className="profile-email-meta">1 week ago</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
