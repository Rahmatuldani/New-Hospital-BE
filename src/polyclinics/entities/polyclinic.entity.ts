import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class Polyclinic extends Document {
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: [String],
        ref: "Employee",
        default: []
    })
    doctors: string[];
}

export const PolyclinicSchema = SchemaFactory.createForClass(Polyclinic)