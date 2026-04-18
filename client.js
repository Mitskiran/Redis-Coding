const redis = require("redis");

const client = redis.createClient();

async function connectRedisClient(){
    try {
        await client.connect();
        console.log("redis client connect successfully")
        
    } catch (error) {
        console.log("client is not connecting on redis port 6379");
    }
   
}


module.exports = {connectRedisClient,client};