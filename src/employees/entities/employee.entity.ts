import { Gender, Role } from "@/config/types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class Employee extends Document {
    @Prop({required: true})
    nik: string;
    
    @Prop({required: true})
    np: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;
    
    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({
        type: Date,
        required: true
    })
    birthDate: Date;

    @Prop({required: true})
    birthPlace: string;

    @Prop({
        type: String,
        required: true, 
        enum: Gender
    })
    gender: Gender;

    @Prop({
        type: String,
        required: true, 
        enum: Role
    })
    role: Role;
    
    @Prop({
        type: String,
        default: null
    })
    photo: string | null;

    @Prop({
        type: Date,
        default: null
    })
    deletedAt: Date | null;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)