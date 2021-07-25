import { Wallet } from "ethers";
import { provider } from "../../providers";

/**
 *
 * @returns Promise<{}>
 */
export const createWallet = async (password: string) => {
    const account = Wallet.createRandom();

    return {
        address: account.address,
        mnemonic: account.mnemonic.phrase,
        privateKey: account.privateKey,
        wallet: await account.encrypt(password)
    };
};

/**
 *
 * @param address
 */
export const getAccountFromMnemonics = async (mnemonics: string) => {
    return Wallet.fromMnemonic(mnemonics).connect(provider);
};

// export const getWallet = async (address: string) => {};

/**
 *
 * @param address
 */
// export const balance = async (address: string) => {};
