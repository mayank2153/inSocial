import { useEffect,useState } from "react";
import axios from "axios"
import { useLocation } from 'react-router-dom';
import PostCard from "../homepage/postCard.jsx"
import UserCard from "../homepage/userCard/userCard.jsx";

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
const SearchResults = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [openUser,setOpenUser]=useState(true)
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    console.log("query:",query)
    useEffect(() => {
      const fetchResults = async () => {
        try {
          const response = await axios.get(`${url}search/searchUsersAndPosts?query=${query}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setPosts(response.data.data.posts);
            setUsers(response.data.data.users);
            console.log(users)
            console.log(posts)
            console.log("users")
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
  
      if (query) {
        fetchResults();
      }
    }, [query]);
    const toggleUser=()=>{
        setOpenUser(true);
    }
    const togglePosts=()=>{
        setOpenUser(false)
    }
    return(
        <div className="pl-80 pt-40">
            <div>
                <button onClick={toggleUser}>Users</button>
                <button onClick={togglePosts}>Posts</button>
            </div>
            <div>
                {openUser && users.map((user) => (
                    <UserCard key={user._id} {...user}/>
                ))}
            </div>
            <div>
                {
                    !openUser && posts.map((post)=>(
                        <div>

                            {console.log("hey")}
                            <PostCard key={post._id} {...post}></PostCard>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default SearchResults;