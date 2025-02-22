import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreatePolyclinicDto {
    @ApiProperty({
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class AddPolyclinicDoctorDto {
    @ApiProperty({
        required: true
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    doctorId: string;
}
