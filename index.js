import express from 'express'
import cors from 'cors'
import boardRouter from './controllers/boards.js';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './utils/config.js';
import taskRouter from './controllers/task.js';

const app=express()
app.use(cors())
app.use(express.json());
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("conected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/boards", boardRouter);
app.use("/api/tasks", taskRouter);


app.listen(PORT, () => {
  console.log(`started on port ${PORT}`);
});