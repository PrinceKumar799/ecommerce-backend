import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInDto {
  @ApiProperty({ description: "Email to login", example: "example@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({description:"Password",example:"pass"})
  @IsString()
  @MinLength(4)
  password: string;
}
