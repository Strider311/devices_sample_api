import { InstanceLinksHost } from '@nestjs/core/injector/instance-links-host';
import { IsNotEmpty, IsString, IsNumber, IsMACAddress } from 'class-validator';

export class DeviceDto {
  @IsNotEmpty()
  @IsString()
  deviceName: string;

  @IsNotEmpty()
  @IsMACAddress()
  macAddress: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  deviceType: number;
}
