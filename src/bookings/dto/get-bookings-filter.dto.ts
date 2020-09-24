import { ApiProperty } from '@nestjs/swagger';

export class GetBookingsFilterDto {
  @ApiProperty({ required: false })
  search: string;
}
