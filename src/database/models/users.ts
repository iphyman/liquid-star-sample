import { model, Schema } from "mongoose";
import { UserTypes } from "./types";

const UserSchema: Schema = new Schema(
    {
        phone: { type: String },
        wallet: {
            id: { type: String },
            address: { type: String },
            Crypto: {
                kdfparams: {
                    dklen: { type: Number },
                    p: { type: Number },
                    salt: { type: String },
                    r: { type: Number },
                    n: { type: Number }
                },
                kdf: { type: String },
                ciphertext: { type: String },
                mac: { type: String },
                cipher: { type: String },
                cipherparams: {
                    iv: { type: String }
                }
            },
            version: { type: Number }
        },
        carbonCreditBonus: { type: Number },
        address: { type: String },
        mnemonic: { type: String },
        balance: { type: String },
        password: { type: String }
    },
    { timestamps: true }
);

export default model<UserTypes>("User", UserSchema);
