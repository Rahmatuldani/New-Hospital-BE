import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWaitingListDto } from './dto/create-waiting-list.dto';
import { UpdateWaitingListDto } from './dto/update-waiting-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WaitingList } from './entities/waiting-list.entity';
import { Model } from 'mongoose';
import { PatientStatus } from '@/config/types';

@Injectable()
export class WaitingListService {
  constructor (
    @InjectModel(WaitingList.name) private readonly waitListModel: Model<WaitingList>
  ) {}

  async create(createWaitingListDto: CreateWaitingListDto) {
    createWaitingListDto["status"] = PatientStatus.EXAMINATION_WAIT
    const waiting = await this.waitListModel.create(createWaitingListDto)
    return waiting.save();
  }

  findAll() {
    return this.waitListModel.find().populate(["patientId", { path: "polyId", populate: { path: "doctors", model: "Employee"} }]);
  }

  async findOne(id: string): Promise<WaitingList> {
    const waitList = await this.waitListModel.findById(id);
    if (!waitList) {
      throw new NotFoundException("Waiting list not found")
    }
    return waitList;
  }

  async update(id: string, updateWaitingListDto: UpdateWaitingListDto) {
    const waitList = await this.findOne(id)
    Object.assign(waitList, updateWaitingListDto)
    return waitList.save();
  }

  async remove(id: string) {
    const waitList = await this.findOne(id)
    await waitList.deleteOne()
    return waitList;
  }
}
