import express from 'express';
import session from 'express-session';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/routes';

// Express initialization
const server = express();
server.use(bodyParser.urlencoded({
	extended: true,
}));

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

server.use(session({
	//secret: process.env.SECRET,
	secret: "shh its a secret",
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
server.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


routes(server);


const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});


export default server;