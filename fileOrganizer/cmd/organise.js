let fs = require('fs');
let Path  = require('path');
const { text } = require('stream/consumers');
let types = {media: ["mp4", "mkv", "mp3"],
archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
documents: [,'docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
app: ['exe', 'dmg', 'pkg', "deb"],
images: ['png','jpg','jpeg'],
extras: ['csv','vsf','html','css','msi','js']}
function organise(dirPath) {

   

    // 1.) input given as directory path
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd();
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            // 2. create -> organized_files -> directory
            destPath = Path.join(dirPath, "organised_Files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
                
            }
            else {
                console.log("already present");
                
            }

                //  read the files
            let allFile =  fs.readdirSync(dirPath);
            // console.log( allFile);
            for(let i = 0 ; i< allFile.length ;i++){
                let ext =  Path.extname(allFile[i]);
                // console.log(ext);

                // alternate 
                // let ext  =  allFile[i].split('.')[1]; 
                // text.txt => [0] =  text ,[1] = txt
                     
                for(let  i = 0 ; i < allFile.length;i++){
                    let fullPathOfFile =  Path.join(dirPath,allFile[i]);

                    // 1.) check is it a file / Folder
                    let isFile = fs.lstatSync(fullPathOfFile).isFile();
                    if(isFile){
                        // 1.1) get extn
                        let ext  = Path.extname(allFile[i]).split(".")[1];

                        // 1.2) Get Folder Name in which file is to put
                let folderName  =  getFoldername(ext);
// 1.3)copy the data from src to dest
                        copyFileToDest(dirPath,fullPathOfFile,folderName);
                    }

                }

            }

        } else {

            console.log("Kindly enter the correct path");
            return;
        }

    }
}

function getFoldername(ext){
    for(let key in types){
        // console.log(key);
            for(let i = 0 ; i < types[key].length;i++){
                if(types[key][i]==ext){
                    return key;
                }
            }
            //  return extras;
    }
}

function copyFileToDest(srcPath,fullPathOfFile,folderName){
//   1. path for folder name in organised file
    let destFolderPath  =   Path.join(srcPath,"organised_files",folderName);
// 2.) check folder exist or not 
    if(!fs.existsSync(destFolderPath)){
        fs.mkdirSync(destFolderPath);
    }

//    folder formed now step to copy file data to dest
let fileName = Path.basename(fullPathOfFile); //abc.zip
//  path of dest file 
let destFileName  = Path.join(destFolderPath,fileName);
fs.copyFileSync(fullPathOfFile,destFileName);
}
organise();

module.exports = {
    // KEY : VALUE
    org : organise 
} 