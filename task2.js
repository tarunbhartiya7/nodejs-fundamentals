// const csv=require('csvtojson')
// const fs = require('fs');

import csv from "csvtojson"
import fs from "fs"

async function convertCSVtoJSON() {
    try {
        const jsonArray=await csv().fromFile("./csv/nodejs-hw1-ex1.csv");
        fs.writeFile("./csv/nodejs-hw1-ex1.json", jsonArray, (err) => {
            if (err)
              throw new Error(err)
            else {
              console.log("File written successfully\n");
            }
          });
    
    } catch (error) {
        console.log("***************ERROR***************")
        console.log(error);
    }
}

convertCSVtoJSON()



// csv()
// .fromFile("./csv/nodejs-hw1-ex1.csv")
// .then((jsonObj)=>{
//     fs.writeFile("./csv/nodejs-hw1-ex1.json", JSON.stringify(jsonObj), (err) => {
//         if (err)
//           console.log(err);
//         else {
//           console.log("File written successfully\n");
//         }
//       });
// })
// .catch(err => console.log(err))

