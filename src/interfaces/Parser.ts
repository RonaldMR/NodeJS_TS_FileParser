import { Lead } from "../model";

export default interface Parser {
    Parse(line: string[]) : Lead;
}