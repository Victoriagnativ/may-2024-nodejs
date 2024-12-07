const http = require('node:http');
const foo = async ()=>{

    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const url= req.url;
        if(url === '/about'){
          return  res.end(JSON.stringify({
                data: 'About Page!',
            }));

        }
        if(url === '/contest'){
            return   res.end(JSON.stringify({
                data: 'Contest Page!',
            }));

        }
        if(url === '/'){
        return res.end(JSON.stringify({
            data: 'Hello World!',
        }));
        }
    });

    server.listen(8000);
}
void foo();