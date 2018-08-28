import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import YAML from 'yamljs';



// Express initialization
const server = express();
server.use(bodyParser.urlencoded({
	extended: true,
}));

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);
const urlParser = express.urlencoded({
  extended: true,
});

server.use(session({
	secret: 'shh its a secret',
	resave: false,
	saveUninitialized: true,
	cookieParser: { secure: true }
}));

const urlParser = express.urlencoded({
	extended: true,
});

const jsonParser = express.json();

server.use(cookieParser());
server.use(jsonParser);
server.use(urlParser);
server.use(bodyParser.json());
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Route
routes(server);

// Create a server using the express framework
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

export default server;