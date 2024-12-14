const express = require('express')
const app = express();
const {read,write} = require('./fs.service.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
     
     try{
          const users = await read();
          res.json(users);   
     }catch (e) {
          res.status(500).json(e.message)
     }
     
})
app.post('/users', async (req,res) =>{
     try {
          if (!req.body.name || req.body.name.length < 3) {
               return res.status(400).json('Name is required and should be minimum 3 symbols');
          }
          if (!req.body.email || !req.body.email.includes('@') ) {
               return res.status(400).json('Email is required');
          }
          if (!req.body.password || req.body.password.length < 8) {
               return res.status(400).json('Password is required and should be minimum 8 symbols');
          }
     const users = await read();
     const newUser ={
          id:users.length ? users[users.length -1].id + 1 : 1 ,
          name: req.body.name,
          email:req.body.email,
          password:req.body.password

     }
     users.push(newUser);
     await write(users);
     res.json(newUser);
     } catch (e) {
          res.status(500).json(e.message);
     }
})
app.get('/users/:userId', async (req, res) => {
     try {
          const users = await read();
          const user = users.find(user => user.id === Number(req.params.userId))
          res.json(user);  
     }catch (e) {
          res.status(500).json(e.message);
     }
     
})
app.put('/users/:userId', async (req, res) => {
     try {
          if (!req.body.name || req.body.name.length < 3) {
               return res.status(400).json('Name is required and should be minimum 3 symbols');
          }
          if (!req.body.email || !req.body.email.includes('@') ) {
               return res.status(400).json('Email is required');
          }
          if (!req.body.password || req.body.password.length < 8) {
               return res.status(400).json('Password is required and should be minimum 8 symbols');
          }
     const users = await read();
     const index = users.findIndex(user => user.id === Number(req.params.userId));
     if(index === -1){
          return res.status(404).json({message : 'User not Found'})
     }
     users[index] ={
          ... users[index],
          name: req.body.name,
          email:req.body.email,
          password:req.body.password

     }
     await write(users);
     res.status(201).json(users[index]);
     } catch (e) {
          res.status(500).json(e.message);
     }
})

app.delete('/users/:userId', async (req, res) => {
     try{
          const users = await read();
          const index = users.findIndex(user => user.id === Number(req.params.userId))
          if(index === -1){
               return res.status(404).json({message : 'User not Found'})
          }
          users.splice(index ,1)
          await write(users);
          res.sendStatus(204);
     }catch (e){
          res.status(500).json(e.message);
     }

})
app.listen(3000)


