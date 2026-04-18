const express  = require("express");
const axios = require("axios").default
const {connectRedisClient,client}= require("./client");
const app = express();


connectRedisClient();

app.use(express.json());

app.get("/:userId", async (req,res)=>{
    try {
        const {userId} = req.params;
        const user = await client.GET(`userId:${userId}`);
        if(user) return res.json(user);
        const userOnline = await axios.get(`https://jsonplaceholder.typicode.com/todos/${userId}`);
        console.log("useronline",userOnline);
    for (const ele of userOnline)
    {
        
            const {userId, id, title, completed} = ele;
            await client.HSET(`userId:${userId}`,{id : `${id}`, title:`${title}`, completed:`${completed}`});
            await client.EXPIRE(`userId:${userId}`, 40000);
    }

    return res.json(userOnline);
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
        
   
    }
    

})

app.post("/:userId",async(req,res)=>{
    try {
        const {userId} = req.params;

    



    } catch (error) {
        console.log(error);
    }
})


app.listen(2000,()=>{
    console.log("server is running on port 2000");
})