import { EventPosition } from "./eventPosition";
import { Emergency } from "./emergency";

export class Event{
    public eventId: number;
    public eventName: string;
    public description: string;
    public harmed?: number;
    public deaths?: number;
    public losses?: number;
    public costs?: number;
    public date?: string
    public imageData?: string[];
    public eventPosition: EventPosition;
    public emergency?: Emergency;
    public emergencyId: number;
    
    constructor(){
        this.eventPosition = new EventPosition();
        this.emergency = new Emergency();
        this.harmed = 0;
        this.deaths = 0;
        this.losses = 0;
        this.costs = 0;
    }
}