import { Employee } from "@/employees/entities/employee.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
    timestamps: true,
    versionKey: false
})
export class User extends Document{
    @Prop({
        type: String,
        required: true
    })
    np: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "Employee"
    })
    employee: Employee;
}

export const UserSchema = SchemaFactory.createForClass(User);