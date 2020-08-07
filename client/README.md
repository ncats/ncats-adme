# Client

If you want to modify the UI for this application, download and install the dependencies below and follow the steps to run the application. But you will also need to have the python server running by following [these steps](https://github.com/ncats/ncats-adme/blob/master/README.md#ncats-adme)

## Dependencies

- [Node](https://nodejs.org/en/)
- [Angular CLI](https://cli.angular.io/) installed globally (`npm install -g @angular/cli`)

## Setting up application

1. Open a terminal and make your way to the `/client` directory
2. Type `npm install` and hit Enter
3. Wait for a few minutes while all required packages are downloaded

## Running the application

1. Open a terminal and make your way to the `/client` directory
2. Type `npm run start:dev` and hit Enter
3. Navigate to http://localhost:4200/

This will start a development server that will refresh your browser whenever you make changes to the application.

## Building the application

To build and embed the application in the server directory (/server/client) so it can be deployed as a single application, you can run one of two commands:

- `npm run build:embedded`, or
- `npm run build:embedded:opendata` so the application's URL's path always starts with `/adme`
