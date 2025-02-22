import { PartialType } from '@nestjs/swagger';
import { CreatePolyclinicDto } from './create-polyclinic.dto';

export class UpdatePolyclinicDto extends PartialType(CreatePolyclinicDto) {}
