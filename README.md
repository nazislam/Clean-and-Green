# CSC-Project-Clean-Green
Project "Clean &amp; Green" for CSC436/446
Team Members: Sam Tursunov, Naz Islam, Vasu


In order to run the application:

1. First, install Node from [Nodejs.org](https://nodejs.org/en/) website.
2. Clone the repository by `git clone https://github.com/nazislam/CSC-Project-Clean-Green.git`
3. Navigate to the directory and open a terminal and do `npm install`. This will install the dependancies for the application.
4. *RUNNING THE SERVER:*
	1. In terminal, do `node app.js` to run the server. It will run the server on localhost on port 5000. If server is run with this command, it will not restart automatically after every saved change. To enable auto restart, skip this step and do next step.
	2. In order to enable the server restart after any change detected, do the following:

		3. In your Terminal, do `sudo npm install -g gulp`, which will install Gulp globally on your machine.
		4. Then, `gulp serve`, to run the server. Now, it will keep track of any change in files. After every saved changes, the server will restart automatically.

	Run the server with Gulp, so it can restart automatically after every change. This makes writing code and testing much easier. :)

5. Once the serve is running, access it `http://localhost:5000`.
