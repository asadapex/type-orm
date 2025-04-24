import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  year: number;

  @ApiProperty({ type: Number })
  user: number;

  @ApiProperty({ type: Array, example: [1, 2, 3] })
  genre: number[];
}
