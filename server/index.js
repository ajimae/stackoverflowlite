<<<<<<< HEAD
import bodyParser from 'body-parser';
import routes from './routes/routes';
import express from 'express';
=======
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';

>>>>>>> server

// Express initialization
const server = express();
server.use(bodyParser.urlencoded({
	extended: true,
}));
<<<<<<< HEAD

server.use(bodyParser.json());

=======
const urlParser = express.urlencoded({
	extended: true,
  });

const jsonParser = express.json();
server.use(jsonParser);
server.use(urlParser);
server.use(bodyParser.json());



>>>>>>> server
// Route
routes(server);

// Create a server using the express framework
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

export default server;
