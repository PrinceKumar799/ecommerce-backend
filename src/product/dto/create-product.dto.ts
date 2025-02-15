import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateProductDto {
  @ApiProperty({
    description: "Name",
    example:"Samsung M12"
    })
    @IsString()
    @IsNotEmpty()
  name: string;
  
  @IsString()
    @IsNotEmpty()
  category: string;

  @IsString()
    @IsNotEmpty()
  image: string;

    
    @ApiProperty({
      description: "Product Description",
      example:"Smartphone with ultra smooth experience"
  })
    @IsString()
    description: string;
    
    @ApiProperty({
      description: "Price per piece",
      example:100.00
  })
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @ApiProperty({
      description: "Stocks quantity",
      example:10
  })
    @IsNumber()
    @IsNotEmpty()
  stockQuantity: number;
}
