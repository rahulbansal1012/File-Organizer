const fs = require("fs");
const path = require("path");

function treeFn(dirPath) {
    if (dirPath == undefined) {
        console.log("please Enter a Valid path");
        return;
    }
    let doesExist = fs.existsSync(dirPath);
    if (doesExist == true) {
        treeHelper(dirPath, " ");
    }
}


function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();
    // agr file h to 
    if (isFile == true) {
        // file ka base name print krao
        let fileName = path.basename(targetPath);
        console.log(indent + "├──" + fileName);
        return;
    }

    // folder/dir hai to under jao

    let dirName = path.basename(targetPath);
    //  print dir name 
    console.log(indent + "└──" + dirName);
    //  Access the files int that dir
    let children = fs.readdirSync(targetPath);
    // children contain all files of dir
    for (let i = 0; i < children.length; i++) {
        let childpath = path.join(targetPath, children[i]);
        treeHelper(childpath, indent + "\t");
    }
}

module.exports = {
    tree: treeFn,
};