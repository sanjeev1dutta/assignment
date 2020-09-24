import * as NodeGeocoder from 'node-geocoder';
import * as config from 'config';
import { Injectable } from '@nestjs/common';

const geocodingConfig = config.get('geocoding');

@Injectable()
export class LocationService {
  private geocoder: any;

  constructor() {
    const options: NodeGeocoder.Options = {
      provider: geocodingConfig.provider,
      apiKey: geocodingConfig.apiKey,
    };
    this.geocoder = NodeGeocoder(options);
  }

  async geoCountry(address: string): Promise<any> {
    return await this.geocoder.geocode(address);
  }
}
