import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(

    {

        student: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        job: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Job",

            required: true,

        },

        resume: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Resume",

        },

        coverLetter: {

            type: String,

            default: "",

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "Reviewed",

                "Accepted",

                "Rejected",

            ],

            default: "Pending",

        },

    },

    {

        timestamps: true,

    }

);

export default mongoose.model(
    "Application",
    applicationSchema
);