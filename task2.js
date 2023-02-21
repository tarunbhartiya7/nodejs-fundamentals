const csv=require('csvtojson')
const fs = require('fs');

csv()
.fromFile("./csv/nodejs-hw1-ex1.csv")
.then((jsonObj)=>{
    fs.writeFile("./csv/nodejs-hw1-ex1.json", JSON.stringify(jsonObj), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
})
.catch(err => console.log(err))

