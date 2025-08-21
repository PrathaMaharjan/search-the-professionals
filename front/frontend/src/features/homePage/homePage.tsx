import {
  useEffect,
  useState,
  type ChangeEvent,
  Component,
  type ReactNode,
} from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { searchUserApi, getUserListApi } from "../../shared/config/api";
import NavBar from "../navBar/navBar";

// ----- Types -----
interface IUser {
  _id: string;
  username: string;
  email: string;
  role?: string;
}

interface IUserResponse {
  users: IUser[];
}

// ----- Error Boundary -----
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

class HomeErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
          Oops! Something went wrong 
        </h2>
      );
    }
    return this.props.children;
  }
}

// ----- Home Component -----
export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [search, setSearch] = useState(""); // input value
  const [searchTrigger, setSearchTrigger] = useState(""); // search when Enter pressed
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const searchTags: string[] = ["All", "Designer", "Web Developer", "Doctor", "Engineer"];

  // ----- Get logged-in user -----
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    try {
      const parsedUser: IUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  // ----- Fetch users -----
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const usernameParam =
      searchTrigger.trim() !== "" ? searchTrigger.trim() : undefined;
    const roleParam = selectedTag !== "All" ? selectedTag : undefined;

    const fetchUsers = async () => {
      try {
        let res: AxiosResponse<IUserResponse | IUser[]>;
        if (!usernameParam && !roleParam) {
          res = await getUserListApi();
        } else {
          res = await searchUserApi(usernameParam, roleParam);
        }

        if (res.data && typeof res.data === "object" && "users" in res.data) {
          setUserList(res.data.users);
        } else if (Array.isArray(res.data)) {
          setUserList(res.data);
        } else {
          setUserList([]);
        }
      } catch (err) {
        console.error("API error:", err);
        setUserList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTrigger, selectedTag, user]);

  // ----- Handlers -----
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTrigger(search);
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSearchTrigger(search);
  };

  // ----- Render -----
  return (
    <HomeErrorBoundary>
      <>
        <NavBar />
        <div className="homepage-wrapper">
          <div className="page-content">
            <div className="hero-wrapper">
              {!user && <p style={{ textAlign: "center" }}>Loading your homepage...</p>}

              {user && (
                <div className="search-box full-width">
                  <h2 className="search-title">
                    Discover and connect with professionals who inspire you every day.
                  </h2>

                  <input
                    type="text"
                    onChange={onValueChange}
                    onKeyDown={handleSearchKeyDown}
                    value={search}
                    placeholder="Search by username..."
                    className="search-input"
                  />

                  <div className="search-tags">
                    {searchTags.map((tag) => (
                      <div
                        key={tag}
                        className={`pills${selectedTag === tag ? " selected" : ""}`}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {loading && <p style={{ textAlign: "center" }}>Loading users...</p>}

              {!loading && userList.length === 0 && user && (
                <p className="no-users">No users found</p>
              )}

              <div className="results">
                {userList.map((u) => (
                  <div
                    className="card"
                    key={u._id}
                    onClick={() => navigate(`/indiProfile/${u._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{u.username}</h3>
                    <p>{u.role || "No role set"}</p>
                    <p>{u.email || "No email"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </HomeErrorBoundary>
  );
}
