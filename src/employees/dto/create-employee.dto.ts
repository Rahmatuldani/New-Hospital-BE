import { Gender, Role } from "@/config/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, ValidateIf } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty({
        example: "",
    })
    @Length(16, 16)
    @IsNumberString()
    @IsNotEmpty()
    nik: string;

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
