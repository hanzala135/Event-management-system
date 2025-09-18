const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RSPVSchema = new Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["Attending","non-Attended"],
             required: true,
            default: "Attending",
        },
    },
    { timestamps: true }
);
const RSPV = mongoose.model("RSPV", RSPVSchema);

module.exports = RSPV;