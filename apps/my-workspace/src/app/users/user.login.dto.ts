import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
