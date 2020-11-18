import {IsEnum, IsNotEmpty, MinDate} from "class-validator";
import {CATEGORY} from "../task.constants";

export class CreatetaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsEnum(CATEGORY)
    category : CATEGORY;

    timestamp = Date.now().toString()
}
