import { Injectable } from '@nestjs/common';
import { DeviceDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { Device } from '@prisma/client';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async getAllDevices(): Promise<Device[]> {
    try {
      const list = await this.prisma.device.findMany();
      return list;
    } catch (Error) {
      console.error(`Failed to read devices: ${Error}`);
    }
  }

  async deleteDevice(deviceId: number): Promise<Device> {
    try {
      const deleted = await this.prisma.device.delete({
        where: {
          id: deviceId,
        },
      });
      return deleted;
    } catch (error) {
      console.error(`Failed to delete device ${deviceId} : ${error}`);
    }
  }

  async addNewDevice(dto: DeviceDto, userId: number): Promise<Device> {
    try {
      const device = await this.prisma.device.create({
        data: {
          macAddress: dto.macAddress.toString(),
          name: dto.deviceName,
          userId: userId,
          type: dto.deviceType,
          location: dto.location,
        },
      });

      return device;
    } catch (error) {
      console.error(`Failed to register device: ${error.toString()}`);
    }
  }

  async updateDevice(dto: DeviceDto, deviceId: number): Promise<Device> {
    try {
      const updatedDevice = await this.prisma.device.update({
        where: {
          id: deviceId,
        },
        data: {
          name: dto.deviceName,
          location: dto.location,
          type: dto.deviceType,
        },
      });

      return updatedDevice;
    } catch (Error) {
      console.log(`Failed to update device: ${Error}`);
    }
  }
}
