import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/routes';



// Express initialization
const server = express();
server.use(bodyParser.urlencoded({
	extended: true,
}));

server.use(session({
	secret: 'shh its a secret',
	resave: false,
	saveUninitialized: true,
	cookieParser: { secure: true }
}));

const urlParser = express.urlencoded({
	extended: true,
});



server.use(cookieParser());
const jsonParser = express.json();
server.use(jsonParser);
server.use(urlParser);
server.use(bodyParser.json());



// Route
routes(server);

// Create a server using the express framework
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

export default server;