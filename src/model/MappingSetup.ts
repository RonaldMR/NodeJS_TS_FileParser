export default interface MappingSetup {
    field: string,
    type: "string" | "number" | "date",
    position?: number,
    required?: boolean,
    defaultValue?: string
}