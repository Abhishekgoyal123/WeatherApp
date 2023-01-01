const fs = require("fs");
var request = require("requests");
const express = require("express");
const app = express();

const replaceVal = (tempVal,orgVal) =>{
let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
temperature = temperature.replace("{%location%}",orgVal.name);
temperature = temperature.replace("{%country%}",orgVal.sys.country);
temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
return temperature;
};

const homeFile = fs.readFileSync("home.html","utf-8");

app.get("",(req,res)=>{

request(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=3367ece321a8d98b0d68810e1605b530`)
.on("data",(chunk) => {
    const objdata = JSON.parse(chunk);
    const arrData = [objdata];
    
    const realTineData = arrData.map((val) => replaceVal(homeFile,val)).join("");
      res.send(realTineData); 
      
});
});

app.listen(8000);
