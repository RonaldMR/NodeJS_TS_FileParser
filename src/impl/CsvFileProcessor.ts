import fs, { appendFile } from "fs";
import { parse } from "csv-parse";
import { FileProcessor, Parser } from "../interfaces";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid';

@injectable()
export default class CsvFileProcessor implements FileProcessor {
    @inject(TYPES.Parser) private _parser: Parser;

    private AppendFile(fileName: string, line: string) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.appendFile(fileName, `${line}\n`, error => {
                if (error) reject(error);
                resolve(true);
              });
        });
    }

    public Process(fileName: string): Promise<Boolean> {
        const processFileName = `./${uuidv4()}.txt`;

        return new Promise<boolean>((resolve, reject): void => {
            fs.createReadStream(fileName)
                .pipe(parse({
                    fromLine: 2
                 }))
                .on("data", async (data: string[]) => {
                    const lead = this._parser.Parse(data);
                    await this.AppendFile(processFileName, JSON.stringify(lead));
                })
                .on("error", error => {
                    reject(error);
                })
                .on("end", () => {
                    resolve(true);
                });
        });
    }
}