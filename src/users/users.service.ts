import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LibService } from '@/lib/lib.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private libService: LibService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const np: string = this.libService.generateNp(createUserDto.birthDate)
    const password: string = this.libService.hash(np)
    createUserDto['np'] = np;
    createUserDto['password'] = password
    const newUser = await this.userModel.create(createUserDto)
    return newUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({email: email}).lean().exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true}).exec()
    return updatedUser as User;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec()
    return deletedUser as User;
  }
}
