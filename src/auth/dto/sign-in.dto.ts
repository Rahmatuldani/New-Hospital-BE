import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: ""
    })
    @IsNumberString()
    @IsNotEmpty()
    np: string;
    
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}