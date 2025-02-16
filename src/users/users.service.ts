import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LibService } from '@/lib/lib.service';
import { Employee } from '@/employees/entities/employee.entity';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly libService: LibService,
  ) {}
  
  async create(employee: Employee): Promise<User> {
    const user = await this.userModel.create({
      np: employee.np,
      password: this.libService.hash(employee.np),
      employee: employee
    })
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(np: string): Promise<User | null> {
    return await this.userModel.findOne({np: np}).populate("employee");
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
