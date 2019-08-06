const express=require('express');

const app=express();

const port=5000;

app.get('/register',(req,res) => {
const customers=[
    {id:1,fisrtname:"harshal" ,lastname:"Patil"},
    {id:2,fisrtname:"Kedar" ,lastname:"chaudari"},
]; 
res.json(customers);
});

app.listen(port,() =>console.log(`Server started on port ${port}`));