 253396fff53d5d0c9298f28ad565096a 
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Загружаем базу монет
let db = {};
try {
    db = JSON.parse(fs.readFileSync('db.json','utf-8'));
} catch(e){}

app.get('/coins', (req,res)=>{
    const userId = req.query.userId;
    res.json({coins: db[userId] || 0});
});

app.post('/add', (req,res)=>{
    const {userId, amount} = req.body;
    db[userId] = (db[userId] || 0) + (amount || 0);
    if(db[userId] < 0) db[userId] = 0;
    fs.writeFileSync('db.json', JSON.stringify(db));
    res.json({coins: db[userId]});
});

app.listen(3000, ()=>console.log('Server running on port 3000')); 
