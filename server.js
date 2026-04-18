const express  = require("express");
const axios = require("axios").default
const {connectRedisClient,client}= require("./client");
const app = express();


connectRedisClient();

app.use(express.json());

app.get("/:Id", async (req,res)=>{
    try {
        const {Id} = req.params;
        const user = await client.HGETALL(`userId:${Id}`);
        console.log(user);
        console.log(Object.keys(user).length === 0);
        if(!(Object.keys(user).length === 0))
        {
        
            console.log("fetching data from cache");

           return res.json({User:user})
        };
        const userOnline = await axios.get(`https://jsonplaceholder.typicode.com/todos/${Id}`);
        if(!userOnline) return res.json("no data found");
        const {userId, title, completed} = userOnline.data;
        console.log(Id,title,completed);
        const response = await client.HSET(`userId:${Id}`,{Id : `${userId}`, title:`${title}`, completed:`${completed}`});
        console.log(response);
        await client.EXPIRE(`userId:${Id}`, 400);

    return res.json(userOnline.data);
        
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