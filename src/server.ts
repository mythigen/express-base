import net from 'net';
import path from "path";
import fs from "fs";
import { default as express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { getNetworkInterfaces, getNetworkInterfacesArray } from "@utils/networkInterfaces.ts";
import { isPortInUse } from "@utils/isPortInUse";
import cors_options from "@middlewares/cors";
import logger from "@middlewares/logger";
import router from "@routes";
// Dynamic Imports (on build)
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { swaggerSpec } from "@middlewares/swagger";
import swaggerUi from 'swagger-ui-express';
import handlebars from 'express-handlebars';

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'web/main',
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials'
})

// if (typeof engine !== 'function') {
  // throw new Error('Failed to import handlebars-express engine function.');
// }

// Parse environment variables
const PORT: string = process.env.PORT || "3000";
const NODE_ENV = process.env.NODE_ENV || "development";

// Parse command-line arguments
const argv = yargs(hideBin(process.argv)).argv as { [key: string]: any };

// var logFile = fs.createWriteStream('_logs/myLogFile.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode

const app = express();

app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join('static')));
app.use(logger);
// app.use(morgan('combined', { stream: logFile }));
app.use("/v1", router);
// app.use(cors(cors_options));
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
// Handlebars setup
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs');
app.set('views', 'views');

// Example usage of a utility function to get network interfaces
const useNetworkInterfaces = argv.host ?? false;

if (NODE_ENV === "production") {
  var ipAddresseDefault = "0.0.0.0";
}
else {
  var ipAddresseDefault = "localhost";
}

const ipAddresses = useNetworkInterfaces 
  ? [ipAddresseDefault, ...getNetworkInterfacesArray().flat()]
  : [ipAddresseDefault];

// Function to start the server on a given IP address
async function startServer (ip: string) {
  if (await isPortInUse(parseInt(PORT), ip)) {
    console.log(`Port ${PORT} is already in use on ${ip}`);
    return;
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(parseInt(PORT), ip, function() {
      console.log(`\x1b[0;32m→\x1b[0m ${
        ["localhost", "127.0.0.1", "0.0.0.0"].includes(ip) 
        ? "Local" 
        : "Network"
      }:\t\x1b[0;36mhttp://${ip}:${PORT}/\x1b[0m`);
      resolve();
    }).on('error', reject);
  });
};

/**
 * @prerender
 * @args {"title": "Something static"}
 */
export function http4xx(req: Request, res: Response, status: number): void {
  status = Number.isInteger(status) ? status : 405;
  res
    .status(status)
    .render('web/home', {title: "Something Went Wrong!"})
}

if (process.env.NODE_ENV === 'production')
  app.get('*', (req: Request, res: Response) => {
    res
      .status(404)
      .sendFile(path.join(__dirname, 'prerendered/http4xx.html'));
  });
else
  app.get('*', (req: Request, res: Response) => {
    http4xx(req, res, 404);
  });

// app.get("*", (req, res) => {
//   http4xx(req, res, 404);
// });

// Start the server on all defined IP addresses
(async () => {
  try {
    console.clear();
    console.log(`Automatically generated when running "bun run dev"`);
    console.log(`\n\x1b[0;32m→\x1b[0m Express v4.19.2 dev server running at:`);
    await Promise.all(ipAddresses.map(ip => startServer(ip)));
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();

export default app;
