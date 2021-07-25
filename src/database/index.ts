import { connect, set } from "mongoose";
import chalk from "chalk";
import config from "../configs";

export default () => {
    set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: (data: any) => {
            delete data._id;
        }
    });
    connect(config.mongodb.url, config.mongodb.options)
        .then(() => console.log(chalk.green("Database connection established...")))
        .catch((err) => console.log(chalk.red(err.message)));
};
