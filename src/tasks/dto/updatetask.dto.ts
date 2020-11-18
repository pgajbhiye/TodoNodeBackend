import {IsEnum, IsNotEmpty} from "class-validator";
import {CATEGORY, STATUS} from "../task.constants";

export class UpdatetaskDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsEnum(CATEGORY)
    category : CATEGORY;

    @IsEnum(STATUS)
    status :STATUS;

    timestamp: string
}
