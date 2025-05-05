import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BloodType, Payment, Religion, Gender } from "@/config/types";

export type PatientDocument = HydratedDocument<Patient>

@Schema({
    versionKey: false,
    timestamps: true
})

export class Patient {
    @Prop({required: true})
    medicalRecord: string;

    @Prop({required: true})
    nik: string;

    @Prop({required: true})
    name: string;

    @Prop({
        type: String,
        required: true,
        enum: Gender
    })
    gender: Gender;

    @Prop({required: true})
    birthDate: Date;

    @Prop({required: true})
    birthPlace: string;

    @Prop({required: true})
    address: string;

    @Prop({
        type: String,
        enum: BloodType,
        default: null
    })
    bloodType: BloodType | null;

    @Prop({
        type: String,
        required: true,
        enum: Payment
    })
    payment: Payment;

    @Prop({
        type: String,
        default: null
    })
    bpjs: string | null;
    
    @Prop({
        type: String,
        default: null,
        nullable: true
    })
    job: string | null;

    @Prop({
        type: String,
        nullable: true,
        default: null
    })
    partner: string | null;

    @Prop({
        type:String,
        nullable: true,
        default: null,
    })
    phoneNumber: string | null;

    @Prop({
        type: String,
        nullable: true
    })
    partnerPhone: string | null;

    @Prop({
        type: String,
        nullable: true
    })
    partnerAddress: string | null;

    @Prop({
        type: String,
        required: true,
        enum: Religion
    })
    religion: Religion;

    @Prop({
        type: Date,
        default: null
    })
    deletedAt: Date | null;
}

export const PatientSchema = SchemaFactory.createForClass(Patient)