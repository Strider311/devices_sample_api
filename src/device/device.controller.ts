import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DeviceService } from './device.service';
import { AuthGuard } from '@nestjs/passport';
import { DeviceDto } from './dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createDevice(@GetUser('id') userId: number, @Body() dto: DeviceDto) {
    const newDevice = await this.deviceService.addNewDevice(dto, userId);
    return { newDevice };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllDevices() {
    const devices = await this.deviceService.getAllDevices();
    return { devices };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateDevice(
    @Body() deviceDto: DeviceDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const update = await this.deviceService.updateDevice(deviceDto, id);
    return { update };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteDevice(@Param('id', ParseIntPipe) id: number) {
    const deletedDevice = await this.deviceService.deleteDevice(id);
    return { deletedDevice };
  }
}
