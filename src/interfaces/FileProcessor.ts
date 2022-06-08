interface FileProcessor {
    Process(fileName: string) : Promise<Boolean>;
}

export default FileProcessor;