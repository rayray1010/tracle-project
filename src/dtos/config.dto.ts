import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { LoggingLevel } from '../interfaces/config-interface';
import { PartialType } from '@nestjs/mapped-types';
export class ConfigDto {
  @IsString()
  maxConnections: number;
  @IsBoolean()
  maintenanceMode: boolean;
  @IsString({ each: true })
  supportedLocales: string[];
  @IsEnum(LoggingLevel)
  loggingLevel: LoggingLevel;
}

export class UpdateConfigDto extends PartialType(ConfigDto) {}
