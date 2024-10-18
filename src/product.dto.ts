import { Req } from "@nestjs/common";
import { IsDefined, IsNumber, IsString, Min } from "class-validator";

export class ReplaceProductDTO {
    @IsDefined({message: "Id is required"})
    @IsNumber()
    id: number;
    @IsDefined({message: "Name is required", groups: ["create"]})
    @IsString()
    name: string;
    @IsDefined()
    @IsNumber()
    @Min(1)
    price: number;
}