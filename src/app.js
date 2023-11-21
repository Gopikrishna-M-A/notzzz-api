import express from 'express';
import userRoutes from './routes/user.js'; 
import semesterRoutes from './routes/semester.js'; 
import subjectRoutes from './routes/subject.js'; 
import moduleRoutes from './routes/module.js'; 
import branchRoutes from './routes/branch.js'; 
import './config.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  Headers: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}; 

app.use(cors(corsOptions));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/user', userRoutes);
app.use('/semester', semesterRoutes);
app.use('/subject', subjectRoutes);
app.use('/module', moduleRoutes);
app.use('/branch', branchRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});

