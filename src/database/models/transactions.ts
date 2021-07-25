import { model, Schema } from "mongoose";
import { TransactionTypes } from "./types";

const TransactionSchema: Schema = new Schema(
    {
        phone: { type: String },
        sessionId: { type: String },
        amount: { type: String },
        status: { type: String, enum: ["PENDING", "ACTIVE", "CANCELED", "COMPLETED"], default: "ACTIVE" },
        transactionType: { type: String, enum: ["DEPOSIT", "PAYMENT", "WITHDRAWAL"] }
    },
    { timestamps: true }
);

export default model<TransactionTypes>("Transaction", TransactionSchema);
