import express from 'express';

const server = express();

// Home route 
server.get('/', (req, res) => {
	res.json({
		Message: 'Welcome to StackoverFlowLite',
	});
});

// Create a server using the express framework
const port = 3000 || process.env.PORT;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
