const path= require('node:path');
const fs= require('node:fs/promises');

const foo = async ()=>{
    const mainDir = path.join(process.cwd(),'baseFolder');
    await fs.mkdir(mainDir,{recursive:true});
    const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    console.log(`Created mainDir: ${mainDir}`);

    for (const folder of folders) {
        const dir= path.join('baseFolder', folder);
        await fs.mkdir(dir);

        console.log(`Created folder: ${dir}`);


    for (let i = 1; i <= 5; i++) {
        const file = path.join(dir, `file${i}.txt`);
        await fs.writeFile(file, `Content of ${file}`);
        console.log(`Created file: ${file}`);
    }
       await typeDefinition(mainDir);
}
}
const typeDefinition = async (directory) => {
    const items = await fs.readdir(directory);

    for (const item of items) {
        const itemPath = path.join(directory, item);
        const stats = await fs.stat(itemPath);

        if (stats.isFile()) {
            console.log('This is a file.');
            console.log(`File: ${itemPath}`);
        } else if (stats.isDirectory()) {
            console.log(`Folder: ${itemPath}`);
            console.log('This is a folder.');
            await typeDefinition(itemPath);
        }
    }
};

void foo();

