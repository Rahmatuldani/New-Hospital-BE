import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersGateway } from './users.gateway';
import { ValidateIdPipe } from '@/pipes/validate-id/validate-id.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersGateway: UsersGateway
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email)
    if (user) {
      throw new BadRequestException(`User with email ${createUserDto.email} already exist`)
    }
    const newUser = await this.usersService.create(createUserDto);
    await this.usersGateway.handleCreatedUser(newUser)
    return newUser;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateIdPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    const updatedUser = await this.usersService.update(id, updateUserDto);
    await this.usersGateway.handleUpdatedUser(updatedUser)
    return updatedUser;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    const deletedUser = await this.usersService.remove(id);
    await this.usersGateway.handleDeletedUser(deletedUser)
    return deletedUser;
  }
}
