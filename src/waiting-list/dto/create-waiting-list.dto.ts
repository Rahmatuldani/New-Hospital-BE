import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateWaitingListDto {
    @ApiProperty({
        required: true
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    patientId: string;
    
    @ApiProperty({
        required: true
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    polyId: string;
}
