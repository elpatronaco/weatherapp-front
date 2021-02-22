# WeatherApp Front

## First steps

Before deploying this app you'll have to run backend first and copy its domain name/IP to the environment variables file called _.env_. [Backend repo](https://github.com/elpatronaco/weatherapp-back)

## How to Deploy

First, install the dependencies needed for the app to work with the command `npm install`. This command installs both dev dependencies and production dependencies.

### Dev mode

Command `npm start` runs the app for development purposes. Note that the app is not optimized and is used to recompile on modified code.

### Production mode

Compile the app to plain javascript and optimized for production mode with `npm run build`. This will create a directory named **build**. Dev dependencies are no longer needed, so we'll delete them with

- Linux

```console
foo@bar:~$ sudo rm -r -f node_modules
```

- Windows

```console
PS C:\app> rmdir -r node_modules
```

To install production dependencies, just run `npm i only=production`. To serve the app, package named _serve_ can be used. You can install it globally with `npm i -g serve`. Finally, run `npm run serve` in the app directory to serve the app on the port provided.
