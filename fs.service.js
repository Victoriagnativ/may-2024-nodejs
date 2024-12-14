const fs=require('node:fs/promises');
const path =require('node:path');

const pathFile = path.resolve(__dirname ,'db','users.json');
module.exports ={
    read:async ()=>{
     try{
       const json = await fs.readFile(pathFile,"utf-8");
       return json ? JSON.parse(json):[];
     }catch (error){
         console.log('error:',error.message);
     }
    },
    write:async (users)=>{
        try{
            await fs.writeFile(pathFile,JSON.stringify(users,null,2));
        }catch (error){
            console.log('error:',error.message);
        }

    }
}