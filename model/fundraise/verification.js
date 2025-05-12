/** @format */

const mongoose = require("mongoose");


const userVerificationData = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    meansOfVerification: {
        type: String,
        required: true
    },
    selfie: {
        type: String,
        required: true
    },
    documentData: {
        frontView: {
            type: String,
            required: true
        },
        backView: {
            type: String,
        }
    },
    mobileNumber: {
        type: String,
        required: true
    }
}, { _id: false })

const fileType = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
}, { _id: false })

const methodOfValidation = new mongoose.Schema({
    fundraiseData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FundRaise",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userVerificationData: {
        type: userVerificationData,
        default: {}
    },
    proofOfFundRaiseVerify: {
        type: [fileType],
        required: true
    }
})

const FundRaiseVerify = mongoose.model("Fundraise-verify", methodOfValidation)

module.exports = FundRaiseVerify;