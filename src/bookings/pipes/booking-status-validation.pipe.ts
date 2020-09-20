import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookingStatus } from '../booking-status.enum';

export class BookingStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    BookingStatus.OPEN,
    BookingStatus.IN_PROGRESS,
    BookingStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusAllowed(value)) {
      throw new BadRequestException(`"${value}" is not vaid status`);
    }
    return value;
  }

  private isStatusAllowed(status: any) {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
