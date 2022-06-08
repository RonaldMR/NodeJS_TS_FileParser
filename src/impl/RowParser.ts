import { injectable } from 'inversify';
import { Parser } from '../interfaces';
import { Lead, MappingSetup } from '../model';

type Assigners = {
    [key: string] : ((lead: Lead, value: string | undefined) => void)
};

const assigners: Assigners = {
    "firstName": (lead: Lead, value: string | undefined) =>  { lead.firstName = value; },
    "middleName": (lead: Lead, value: string | undefined) =>  { lead.middleName = value; },
    "lastName": (lead: Lead, value: string | undefined) =>  { lead.lastName = value; },
    "campaign": (lead: Lead, value: string | undefined) =>  { lead.campaign = value; }
}

@injectable()
export default class RowParser implements Parser {
    private readonly setupFields: MappingSetup[];

    constructor() {
        this.setupFields = [{
            field: "firstName",
            type: "string",
            position: 0,
            required: true
        },
        {
            field: "middleName",            
            type: "string",
            position: 1,
            required: false,
            defaultValue: "NO MIDDLENAME"
        },
        {
            field: "lastName",            
            type: "string",
            position: 2,
            required: true
        },
        {
            field: "campaign",
            type: "string",
            defaultValue: "defaultcampaign"
        }];
    }

    Parse(line: string[]): Lead {
        const lead: Lead = new Lead();

        for(const setupField of this.setupFields) {
            let currentValue: string | undefined;

            if(setupField.position != undefined && setupField.position < line.length) {
                currentValue = line[setupField.position];
            }

            if(!currentValue && setupField.required) {
                //Add Error
            } else {
                const valueToAssign = currentValue || setupField.defaultValue;

                assigners[setupField.field](lead, valueToAssign);
            }
        }

        return lead;
    }

}