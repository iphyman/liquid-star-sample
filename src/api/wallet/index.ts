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
                const cmd = text.split("*");

                switch (cmd[0]) {
                    case "00":
                        return res.status(200).send("END " + (await createUser(phoneNumber, cmd[1])));
                    case "01":
                        return res.status(200).send("END Thank you, we hope to get you onboard soon");
                    case "1":
                        if (cmd[1] == "1") {
                            return res.status(200).send(insufficientBalance());
                        }
                        break;
                    case "2":
                        return res.status(200).send(insufficientBalance());
                    case "4":
                        return res.status(200).send(checkBalance(phoneNumber));
                    default:
                        return res.status(200).send("END You have provided an invalid input, enter numbers only");
                }
        }
    } catch (error) {
        res.status(400).send("Error connecting, try again");
    }

    next();
});

export default walletRoutes;
