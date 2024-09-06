//Custom Types
interface CreepType {
    role: string;
    memory: CreepMemory;
    body: BodyPartConstant[];
}

//Fix Screep's typings
interface CreepMemory { [key:string]: any; }
interface RoomMemory { [key:string]: any; }

interface Memory { [key:string]: any; }
