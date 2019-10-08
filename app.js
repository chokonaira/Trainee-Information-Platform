import express from 'express';
import bodyParser from 'body-parser';
import router from './src/routes/index';

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(router);

// Root route
app.get('/', (req, res) => {
  res.status(200).send(
    'Welcome to Enyata trainee platform...',
  );
});

//Error route
app.use('*', (req, res) => res.status(404).json({
  status: '404',
  message: 'route not found',
}));

const PORT = 3000;

app.listen(PORT, () => { console.log(`Server is running port ${PORT}`); });

export default app;
