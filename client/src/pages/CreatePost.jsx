import React, { useState } from 'react';
import { Card, CardContent, SpeedDial, SpeedDialIcon, TextField, Typography } from "@mui/material";

const CreatePost = () => {
    const [blog, setBlog] = useState({ title: "", image: "" , content: "" });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value });
    }

    const handleSubmit = async () => {
        console.log(blog);
        const res = await fetch("http://localhost:7000/api/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        if(res.ok){
            console.log(data);
            alert("Blog Created");
            setBlog({title: "", image: "", content: ""})
        } else {
            console.log(data);
        }
    }
    
    return (
        <Card sx={{ p: 4, py: 5, maxWidth: "670px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }} elevation={10}>
            <CardContent sx={{ m: 0 }}>
                <Typography gutterBottom variant="h4" component="div" sx={{ m: 0, textAlign: "center" }}>
                    Write Blog!
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="Title" variant="outlined" name="title" onChange={handleChange} value={blog.title}/>
            <TextField id="outlined-basic" label="ImageURL" variant="outlined" name="image" onChange={handleChange} value={blog.image}/>
            <TextField id="outlined-basic" label="Content" variant="outlined" name="content" rows={7} onChange={handleChange} value={blog.content} multiline />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                onClick={handleSubmit}
            />
        </Card>
    )
}

export default CreatePost;