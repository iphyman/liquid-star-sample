import express, { Request, Response, Router, NextFunction } from "express";
import {
    createUser,
    welcomeUser,
    promptUserToSetupPin,
    promptUserToSelectBattery,
    makeDeposit,
    purchaseWater,
    insufficientBalance,
    promptForPassword,
    checkBalance,
    checkCarbonCreditBalance
} from "../../services/user";

const walletRoutes: Router = express.Router();

walletRoutes.post("*", async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, text } = req.body;

    try {
        switch (text) {
            case "":
                return res.status(200).send(await welcomeUser(phoneNumber));
            case "00":
                return res.status(200).send(promptUserToSetupPin());

            case "1":
                return res.status(200).send(promptUserToSelectBattery());
            case "2":
                return res.status(200).send(purchaseWater());
            case "3":
                return res.status(200).send(makeDeposit());
            case "4":
                return res.status(200).send(promptForPassword());
            case "5":
                return res.status(200).send(checkCarbonCreditBalance(phoneNumber));
            case "6":
                return res.status(200).send(promptForPassword());

            default:
                const commands = text.split("*");
                if (commands[0] === "00") {
                    return res.status(200).send("END " + (await createUser(phoneNumber, commands[1])));
                }

                if (commands[0] === "01") {
                    return res.status(200).send("END Thank you, we hope to get you onboard soon");
                }

                if (commands[0] === "1") {
                    // if ()
                }

                if (commands[0] === "2") {
                    return res.status(200).send(insufficientBalance());
                }

                if (commands[0] === "4") {
                    return res.status(200).send(checkBalance(phoneNumber));
                }

                return res.status(200).send("END You have provided an invalid input, enter numbers only");
        }
    } catch (error) {
        res.status(400).send("Error connecting, try again");
    }

    next();
});

export default walletRoutes;
