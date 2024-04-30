import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
    fetchPosts(userId)
}

async function fetchPosts(userId) {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPosts(data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <div className="post__search">
          <button>← Back</button>
          <div className="post__search--container">
            <label className="post__search--label">Search by Id</label>
            <input type="number" value={searchId} onChange={(event) => setSearchId(event.target.value)} />
            <button onClick={() => onSearch()} >Enter</button>
          </div>
        </div>

        { loading ? 
            ( new Array(10).fill(0).map((_, index) => (
                <div className="post" key={index}>
                <div className="post__title">
                    <div className="post__title--skeleton"></div>
                </div>
                <div className="post__body">
                    <p className="post__body--skeleton"></p>
                </div>
                </div>  
            ))
            ) : (
                posts.map((posts) => {
                    return <div className="post" key={posts.id}>
                    <div className="post__title">{posts.title}</div>
                    <p className="post__body">{posts.body}</p>
                    </div>
                    })
            )  
    }



        
      </div>
    </>
  );
};

export default Posts;
