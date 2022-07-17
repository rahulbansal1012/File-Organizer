let fs = require("fs");
let Path = require("path");
let organise_fun  = require("./organise");
let help_fun = require("./help");
let tree_Fn = require("./tree");

const { PassThrough } = require("stream");

let inputArr = process.argv.slice(2);

let cmd = inputArr[0];

let dirPath = inputArr[1];

switch (cmd) {
    //  Tree Case
    case "tree":
        tree_Fn.tree(dirPath);
        break;


   
    case "organise":
     organise_fun.org(dirPath);
        break;

    //  Help Case
    case "help": 
    help_fun.help(dirPath); 
        break;

    // Default Case
    default:
        console.log("cmd not right");
}
