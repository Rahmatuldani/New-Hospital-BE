import { PatientStatus } from "@/config/types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class WaitingList extends Document {
    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "Patient"
    })
    patientId: string;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "Polyclinic"
    })
    polyId: string;

    @Prop({
        type: String,
        required: true,
        enum: PatientStatus
    })
    status: string;
}

export const WaitingListSchema = SchemaFactory.createForClass(WaitingList)