import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { FileProcessor } from "./interfaces";

const FileProcessor = myContainer.get<FileProcessor>(TYPES.FileProcessor);
FileProcessor.Process("./dist/temporary/lead.csv");
