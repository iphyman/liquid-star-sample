import { Document } from "mongoose";

export interface IWallet {
    id: string;
    address: string;
    Crypto: CryptoI;
    version: number;
}

interface CryptoI {
    kdfparams: KdfParams;
    kdf: string;
    ciphertext: string;
    mac: string;
    cipher: string;
    cipherparams: CipherParams;
}

interface KdfParams {
    dklen: number;
    p: number;
    salt: string;
    r: number;
    n: number;
}

interface CipherParams {
    iv: string;
}

export interface UserTypes extends Document {
    phone: string;
    wallet: IWallet;
    carbonCreditBonus: number;
    balance: string;
    address: string;
    mnemonic: string;
    password: string;
}

export interface TransactionTypes extends Document {
    phone: string;
    sessionId: string;
    amount: string;
    status: "PENDING" | "ACTIVE" | "CANCELED" | "COMPLETED";
    transactionType: "DEPOSIT" | "PAYMENT" | "WITHDRAWAL";
}
