# 8bitoracle-site

## Project Setup

First, ensure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

After installing Node.js, clone this repository and navigate into the project directory:

```
bash
gh repo clone augchan42/8bitoracle-site
cd 8bitoracle-site
```

Then, install the project dependencies:

```
bash
npm install
```


## Building the Project

To build the project and generate the `dist` directory with all the compiled assets, run:

```
bash
npm run build
```

This command executes Webpack, which will bundle your JavaScript and other assets based on the configurations defined in `webpack.config.js`.

## Running the Development Server

To start a development server, first ensure you have a `"start"` script defined in your `package.json` that looks like this:

```
json
"scripts": {
"start": "webpack serve --open"
}
```

This script uses Webpack Dev Server to serve your project locally and opens it in your default web browser.

If you haven't installed Webpack Dev Server yet, you can do so by running:

```
bash
npm install --save-dev webpack-dev-server
```


After setting up, you can start the development server by running:


```
bash
npm start
```


This will compile your project in development mode, start a local server, and open your project in the web browser. The server will automatically reload if you make changes to your source files.

## Additional Scripts

You can add more scripts in your `package.json` for tasks like linting, testing, or deploying. For example, to lint your JavaScript files, you might add:

```
json
"scripts": {
"lint": "eslint src//.js"}
```


Remember to install any necessary tools (like ESLint for linting) as part of your development dependencies.

## Troubleshooting

If you encounter any issues with starting the development server or building the project, ensure all dependencies are correctly installed and your `webpack.config.js` is correctly set up. For more specific problems, consulting the documentation for Webpack or the relevant npm packages can provide additional insights.


