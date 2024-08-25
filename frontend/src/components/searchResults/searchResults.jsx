import { useEffect,useState } from "react";
import axios from "axios"
import { useLocation } from 'react-router-dom';
import PostCard from "../homepage/postCard.jsx"
import UserCard from "../homepage/userCard/userCard.jsx";
import Shimmer from "../shimmer/shimmer.jsx";

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
            console.log("user",users)
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
        <div className="w-full h-[100vh] overflow-y-scroll no-scrollbar flex bg-[#0d1114] flex-col items-center py-4 ">
            <div className=" lg:min-w-[500px] min-w-[350px] h-[500px] bg-[#0d1114] py-2 px-8 flex flex-col gap-4">
            <div className="flex text-white justify-start  text-xl font-mono border-b border-gray-600
            ">
                <div className={`border-r px-2 hover:bg-[#2e2b2b] py-1
                    ${openUser===true?'bg-[#2e2b2b]':null}
                    `}>
                    <button onClick={toggleUser}>Users</button>
                </div>
                <div className={`px-2 hover:bg-[#2e2b2b] py-1
                ${openUser===false?'bg-[#2e2b2b]':null}
                `}>
                    <button onClick={togglePosts}>Posts</button>
                </div>
            </div>
            <div>
                {
                    openUser && users.length===0 && 
                    <div className="min-h-[100vh] text-white">
                        <h1>No users</h1>
                    </div>
                }
                {openUser && users.map((user) => (
                    <UserCard key={user._id} {...user} />
                ))}
            </div>
            <div>
                {
                    !openUser && posts.length===0 && 
                    <div className="min-h-[100vh] text-white">
                        <h1>No posts</h1>
                    </div>
                }
                {
                    !openUser && posts.map((post)=>(
                        <div>

                            {console.log("hey")}
                            <PostCard key={post._id} {...post} ></PostCard>
                        </div>
                    ))
                }
            </div>
            </div>
        </div>
    )
}
export default SearchResults;