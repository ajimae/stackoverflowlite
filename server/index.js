import bodyParser from 'body-parser';
import routes from './routes/routes';
import express from 'express';

// Express initialization
const server = express();
server.use(bodyParser.urlencoded({
	extended: true,
}));

server.use(bodyParser.json());

// Route
routes(server);

// Create a server using the express framework
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

export default server;
