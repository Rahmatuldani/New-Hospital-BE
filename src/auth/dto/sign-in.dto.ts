import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: ""
    })
    @IsString()
    @IsNotEmpty()
    data: string;
}