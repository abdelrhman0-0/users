require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/user/routes/userRoute');
const dbConncection = require('./config/db');
const app = express()
const port = 3000 || process.env.PORT

app.use(express.json());
dbConncection();
app.use(userRoutes);
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(` listening on port ${port}!`))