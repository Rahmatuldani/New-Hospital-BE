import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: "",
    })
    @IsNumberString()
    @IsNotEmpty()
    np: string;
    
    @ApiProperty({
        example: "",
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
