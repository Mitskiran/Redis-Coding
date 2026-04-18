const client = require("./client");



async function init(){

    
    try{
    await client.connect();

    const result = await client.set("bike:racing:france", "bike:Pulsar",{EX:7200});

    const name = await client.get("bike:racing:france");
    if(!result)
    {
        console.log("no values found for the key");
        return 0;
    }
    console.log("result",result);
    console.log("name: ",name);
}
catch(error)
{
    console.log(error, error.message);
}
}

init();
