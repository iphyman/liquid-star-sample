import { isEmpty } from "ramda";
import User from "../../database/models/users";
import { createWallet } from "../wallet";

/**
 *
 * @param phone
 * @returns Promise<UserTypes[]> | null
 */
export const user = async (phone: string) => {
    return User.find({ phone: phone }).exec();
};

/**
 *
 * @param phone
 * @param password
 * @returns Promise<string>
 */
export const createUser = async (phone: string, password: string) => {
    const data = await createWallet(password);

    const user = new User({
        phone: phone,
        carbonCreditBonus: 0,
        address: data.address,
        mnemonic: data.mnemonic,
        wallet: data.wallet
    });

    try {
        await user.save();
        return "Account created successfully!";
    } catch (error) {
        return "Error creating account!";
    }
};

export const welcomeUser = (phoneNumber: string) => {
    return user(phoneNumber).then((account) => {
        if (!isEmpty(account)) {
            return `CON Welcome back, select a service
            1. Rent battery
            2. Purchase water
            3. Make deposit
            4. Check balance
            5. Carbon credits
            6. Cancel services`;
        } else {
            return `CON Welcome to LiquidStar self-Services. Create an account quickly.
            00. Open account 
            01. Cancel`;
        }
    });
};

export const promptUserToSetupPin = () => {
    return `CON Choose at least 4 digit PIN to secure your LiquidStar account.`;
};

export const promptUserToSelectBattery = () => {
    return `CON select number of batteries.
            1. 1 unit 12V
            2. 3 unit 12V
            3. 6 unit 12V
    `;
};

export const insufficientBalance = () => {
    return `END sorry you do not have enough balance`;
};

// export const rentBattery = async (option: string, phoneNumber: string) => {
//     const cost_per_battery = 300;
//     const packages = [1, 3, 6]
//     const units = packages[parseInt(option)]

//     const account = user(phoneNumber).then((res) => res)

//     if (!isEmpty(account)) {
//         const address = account.then((data) => data)
//     }
// }

export const makeDeposit = () => {
    return `END Dial
        1. UBA *919*203*Amount*UBA PIN#
        2. Zenith *824*302*Amount*PIN#
        `;
};

export const purchaseWater = () => {
    return `CON Enter Amount`;
};

export const promptForPassword = () => {
    return `CON Enter your LiquidStar PIN to continue`;
};

export const checkBalance = (phoneNumber: string) => {
    return "NGN0.00";
    return user(phoneNumber).then((data) => {
        // "NGN" + data.balance
    });
};

export const checkCarbonCreditBalance = (phoneNumber: string) => {
    return `END Rent a battery to earn carbon credits
            Bal: NGN0.00`;
    return user(phoneNumber).then((data) => {
        // "NGN" + data.balance
    });
};
