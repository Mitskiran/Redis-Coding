const express  = require("express");
const axios = require("axios").default
const {connectRedisClient,client}= require("./client");
const app = express();


connectRedisClient();

app.use(express.json());

app.get("/", async (req,res)=>{
    try {const cachedValue = await client.get("todos");
    if(cachedValue) return res.json(cachedValue)
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(typeof data);
    
    await client.set("todos",JSON.stringify(data));
    await client.EXPIRE("todos", 30)
    res.json(data);
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
        
   
    }
    

})


app.listen(2000,()=>{
    console.log("server is running on port 2000");
})