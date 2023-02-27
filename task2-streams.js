import csv from "csvtojson"
import fs from "fs"

const readStream = fs.createReadStream("./csv/nodejs-hw1-ex1.csv");
const writeStream = fs.createWriteStream("./csv/nodejs-hw1-ex1.json") 
readStream.pipe(csv()).pipe(writeStream);


