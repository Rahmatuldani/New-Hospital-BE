import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Gender, Role } from "@/config/types";

export class CreateUserDto {
    @ApiProperty({
        example: ""
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        example: new Date("2000-01-01")
    })
    @IsDateString()
    @IsNotEmpty()
    birthDate: Date;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    birthPlace: string;

    @ApiProperty({
        enum: Gender
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({
        enum: Role
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

}
