import express from 'express';
import apiRouter from './routers/api.route.js';
import zaloRoutes from './routers/zalo.route.js';


import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';


const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); 


app.use('/zalo', zaloRoutes);
app.use('/api', apiRouter);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database", err);
});