import { Container } from "inversify";
import { TYPES } from "./types";
import { FileProcessor, Parser } from "./interfaces";
import { CsvFileProcessor, RowParser } from "./impl";

const myContainer = new Container();
myContainer.bind<FileProcessor>(TYPES.FileProcessor).to(CsvFileProcessor);
myContainer.bind<Parser>(TYPES.Parser).to(RowParser);

export { myContainer };