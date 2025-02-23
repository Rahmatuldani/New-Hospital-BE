import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWaitingListDto } from './create-waiting-list.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PatientStatus } from '@/config/types';

export class UpdateWaitingListDto extends PartialType(CreateWaitingListDto) {
    @ApiProperty({
        enum: PatientStatus
    })
    @IsString()
    @IsEnum(PatientStatus)
    @IsOptional()
    status: string
}
