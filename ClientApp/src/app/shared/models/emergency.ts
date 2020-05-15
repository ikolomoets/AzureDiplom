import { Event } from "./event";

export class Emergency{
    public emergencyId: number;
    public Name: string;
    public events: Event[];
}

export const EMERGENCY_BE_NAME_TO_ID = getEmergencyBENameToIdMap();
export const EMERGENCY_FE_NAME_TO_ID = getEmergencyFENameToIdMap();
export const EMERGENCY_UKRAINE_NAME_TO_BACKEND_NAME = getEmergencyFENametoBENameMap();

function getEmergencyBENameToIdMap():Map<string, number>{
    let name2id = new Map();
    name2id.set("Technogenic", 1)
    name2id.set("Natural", 2)
    name2id.set("Social", 3)
    name2id.set("Military", 4)
    return name2id;
}

function getEmergencyFENameToIdMap():Map<string, number>{
    let name2id = new Map();
    name2id.set("ТЕХНОГЕННОГО", 1)
    name2id.set("ПРИРОДНОГО", 2)
    name2id.set("СОЦІАЛЬНО-ПОЛІТИЧНОГО", 3)
    name2id.set("ВІЙСЬКОВОГО", 4)
    return name2id;
}

function getEmergencyFENametoBENameMap():Map<string, number>{
    let feName2beName = new Map();
    feName2beName.set("ТЕХНОГЕННОГО", "Technogenic")
    feName2beName.set("ПРИРОДНОГО", "Natural")
    feName2beName.set("СОЦІАЛЬНО-ПОЛІТИЧНОГО", "Social")
    feName2beName.set("ВІЙСЬКОВОГО", "Military")
    return feName2beName;
}