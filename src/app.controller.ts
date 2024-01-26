import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigDto, UpdateConfigDto } from './dtos/config.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/config')
  getConfig(): ConfigDto {
    try {
      return this.appService.getConfig();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put('/config')
  @UsePipes(new ValidationPipe())
  updateConfig(@Body() config: UpdateConfigDto): {
    message: string;
    data: ConfigDto;
  } {
    try {
      return {
        message: 'success',
        data: this.appService.updateConfig(config),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
