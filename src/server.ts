import http from "http";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import config from "./configs";
import database from "./database";
import walletRoutes from "./api/wallet";

const server = express();
server.use(cors());
server.use(morgan("dev"));

/** Connect to Database */
database();

/** Parse the requests */
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

/** CORS */
// server.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//     if (req.method == "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "GET, POST");
//         return res.status(200).json({});
//     }

//     next();
// });

/** Routes */
server.use("/api", walletRoutes);

/** Error handling */
server.use((req, res) => {
    const error = new Error("Request not found!");

    return res.status(404).json({
        message: error.message
    });
});

/** Create Server */
const httpServer = http.createServer(server);
httpServer.listen(config.server.port, () => console.log(chalk.blue(`\u{1F6A7} Server running on port ${config.server.hostname}:${config.server.port} \u{1F6A7}`)));
