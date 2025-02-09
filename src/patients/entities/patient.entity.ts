import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BloodType, PaymentMethod, Religion, Gender } from "@/config/types";

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
        enum: PaymentMethod
    })
    paymentMethod: PaymentMethod;

    @Prop({
        type: String,
        default: null
    })
    bpjs: string | null;
    
    @Prop({
        type: String,
        default: null
    })
    job: string | null;

    @Prop({
        required: true
    })
    partner: string;

    @Prop({
        required: true
    })
    patientPhone: string;

    @Prop({
        required: true
    })
    partnerPhone: string;

    @Prop({
        required: true
    })
    partnerAddress: string;

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