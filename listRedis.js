const client = require("./client");

async function initLists()
{
     let resultArr=[];
    await client.connect();
    for (let index = 0; index < 10000; index++) {
         result= await client.RPOP("bikes:repairs");
         resultArr.push(result);
        
        
    }  

    console.log(resultArr);
    
    



}



initLists();