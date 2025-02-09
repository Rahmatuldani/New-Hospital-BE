import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { Gender, Role } from "@/config/types";

export type UserDocument = HydratedDocument<User>

@Schema({
    versionKey: false,
    timestamps: true
})
export class User {
    @Prop({required: true})
    np: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    @Exclude()
    password: string;
    
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

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret
    }
})