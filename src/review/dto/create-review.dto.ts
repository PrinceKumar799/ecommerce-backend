import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    content: string
    @IsNotEmpty()
    @IsNumber()
    productId: number
}
