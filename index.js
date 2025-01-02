
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './dbconnection/db.js';
import userRouter from './src/module/usermanagment/user.js';


dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database', err);
  });


app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});