import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { BloodType, Payment, Religion, Gender } from "@/config/types";

export class CreatePatientDto {
    @ApiProperty({
        example: "",
    })
    @IsNumberString()
    @IsNotEmpty()
    nik: string;
    
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        enum: Gender
    })
    @IsString()
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @ApiProperty({
        example: new Date()
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
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        enum: [...Object.values(BloodType), "-"],
        nullable: true
    })
    @IsOptional()
    @IsString()
    @IsIn([...Object.values(BloodType), "-"])
    bloodType: BloodType | null;

    @ApiProperty({
        enum: Payment
    })
    @IsString()
    @IsNotEmpty()
    payment: Payment;

    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    job: string
    
    @ApiPropertyOptional({
        example: null,
        type: String,
        nullable: true
    })
    @IsOptional()
    @IsNumberString()
    bpjs: string
    
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    partner: string
    
    @ApiProperty({
        example: ""
    })
    @IsNumberString()
    @IsNotEmpty()
    phoneNumber: string
    
    @ApiProperty({
        example: ""
    })
    @IsNumberString()
    @IsNotEmpty()
    partnerPhone: string
    
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    partnerAddress: string
    
    @ApiProperty({
        enum: Religion
    })
    @IsString()
    @IsEnum(Religion)
    @IsNotEmpty()
    religion: Religion
}
