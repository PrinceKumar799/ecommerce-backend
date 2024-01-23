import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "Email",
        example:"user@gmail.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Password of minimum 4 character long",
        example:"pass"
    })
    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    password: string;

    @ApiProperty({
        description: "user firstName",
        example:"userFirst"
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({
        description: "user lastName",
        example:"userLast"
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;
}
