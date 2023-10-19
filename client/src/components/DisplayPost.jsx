import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import PostCard from './PostCard';

const DisplayPost = () => {
    // const post = [
    //     {
    //         id: 1,
    //         title: "This is title 1",
    //         content: "This is content 1",
    //         image: "https://www.elegantthemes.com/blog/wp-content/uploads/2023/07/history-of-AI-art.jpg",
    //         user: "Akash",
    //         timestamp: "2 days ago"
    //     },
    //     {
    //         id:  2,
    //         title: "This is title 2",
    //         content: "This is content 2",
    //         image: "https://i.pcmag.com/imagery/articles/03a3gbCKfH8dDJnjhHLuHDf-1..v1665523315.png",
    //         user: "Akash",
    //         timestamp: "1 day ago"
    //     }
    // ]
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:7000/api/blog/", {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json();
            if(res.ok) {
                setPosts(data)
            } else {
                console.log(data);
            }
        }
        fetchData()
    },[posts])
    return (
        <Box sx={{ maxWidth: "600px", display: "flex", flexDirection: "column", margin: "auto", gap: 3, py: 4 }}>
            {posts && posts.map(post=>(
                <PostCard post={post} />
            ))}
        </Box>
    )
}

export default DisplayPost