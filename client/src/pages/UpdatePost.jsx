import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, SpeedDial, TextField, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const [blog, setBlog] = useState({title: "", image: "", content: ""});
    const {id} = useParams()
    const navigator = useNavigate()

    useEffect(() => {
        const fetchSingleBlog = async () => {
            const res = await fetch("https://blog-app-project-tau.vercel.app"+id, {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if(res.ok) {
                setBlog(data)
            } else {
                console.log(data);
            }
        }
        fetchSingleBlog()
    },[id])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value });
    }

    const handleSubmit = async () => {
        console.log(blog);
        const res = await fetch("https://blog-app-project-tau.vercel.app/update/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        if(res.ok){
            console.log(data);
            alert("Blog Updated");
            navigator("/")
        } else {
            console.log(data);
        }
    }

    return (
        <Card sx={{ p: 4, py: 5, maxWidth: "550px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }} elevation={10}>
            <CardContent sx={{m:0}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ m: 0, textAlign: "center" }}>
                    Update Blog!
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="Title" variant="outlined" name="title" onChange={handleChange} value={blog.title}/>
            <TextField id="outlined-basic" label="ImageURL" variant="outlined" name="image" onChange={handleChange} value={blog.image}/>
            <TextField id="outlined-basic" label="Content" variant="outlined" name="content" rows={7} onChange={handleChange} value={blog.content} multiline />

            <Box sx={{textAlign: "center"}}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    onClick={handleSubmit}
                    icon={<Add />}
                />
            </Box>
        </Card>
    )
}

export default UpdatePost;