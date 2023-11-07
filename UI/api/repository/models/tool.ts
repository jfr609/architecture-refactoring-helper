import { ApproachUsability } from "./approach-usability";
import { ToolSource } from "./tool-source";
import { ToolType } from "./tool-type";

export interface Tool{
    toolId?: number;
    identifier: string;
    toolSource?: ToolSource;
    toolTypes?: null | Array<ToolType>;
    approachUsabilities?: null | Array<ApproachUsability>;
}