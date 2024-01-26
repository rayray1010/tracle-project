import { Injectable } from '@nestjs/common';
import { Config } from './interfaces/config-interface';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigDto, UpdateConfigDto } from './dtos/config.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getConfig(): Config {
    const configPath = path.resolve('app.config.json');
    try {
      if (!fs.existsSync(configPath)) {
        throw new Error('Configuration file not found');
      }
      const configString = fs.readFileSync(configPath, 'utf-8');
      const config: Config = JSON.parse(configString);
      return config;
    } catch (err) {
      throw new Error(`failed to get config: ${err.message}`);
    }
  }

  updateConfig(config: UpdateConfigDto): ConfigDto | null {
    const configPath = path.resolve('app.config.json');

    try {
      if (!fs.existsSync(configPath)) {
        throw new Error('Configuration file not found');
      }

      const existingConfigString = fs.readFileSync(configPath, 'utf-8');
      const existingConfig: ConfigDto = JSON.parse(existingConfigString);

      const updatedConfig = { ...existingConfig, ...config };

      const newConfigString = JSON.stringify(updatedConfig);
      fs.writeFileSync(configPath, newConfigString, 'utf-8');

      return updatedConfig;
    } catch (err) {
      throw new Error(`failed to update config: ${err.message}`);
    }
  }
}
