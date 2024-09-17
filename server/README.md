## Weather API

This is a simple express weather api that utilizes the following free APIs:

1. United States Census Geocoder [docs](https://geocoding.geo.census.gov/geocoder/)
2. National Weather Service Weather API [docs](https://www.weather.gov/documentation/services-web-api)

Prerequisites:
1. Node LTS: https://nodejs.org/en
2. Recommended: nvm <button>[Linux & macOS](https://github.com/nvm-sh/nvm)</button> | <button>[Windows](https://github.com/coreybutler/nvm-windows)</button>

Commands to get started

1. Clone the repo `git clone git@github.com:spacecostsmoney/react-node-weather.git`
2. Switch into the client folder with `cd server`
3. Switch to the appropriate node version with `nvm use`
4. Install npm dependencies `npm ci`
5. Run project with hot reloading `npm run dev`
6. Server will be available at: http://localhost:3000

There's a helpful file for running HTTP requests to test things out locally should you need it [Server Example Requests](./example-requests/weather.http)
