import * as utils from "utils/utils";

export class CreepType {
    public static Type:string = 'Generic';
    public static Role:string = 'Generic';
    public static Body:BodyPartConstant[] = [WORK, CARRY, MOVE];
    public static Memory:CreepMemory = {role: CreepType.Role};

    public id:string;

    spawned:boolean = false;
    instance:Creep|null = null;

    constructor() {
        this.id = utils.makeid(5);
    }

    public Spawn(spawn:StructureSpawn, memory:CreepMemory):void {
        const full_memory = _.merge({}, CreepType.Memory, memory);
        let err:number = OK;
        while (spawn.spawnCreep(CreepType.Body, this.id, {memory: full_memory}) == ERR_NAME_EXISTS) {
            this.id = utils.makeid(5);
        }

        switch(err) {
            case OK: {
                console.log(`Spawning ${CreepType.Type} creep. At: ${spawn.name}`);
                break;
            }
            case ERR_BUSY: {
                console.log(`Spawn is busy. At: ${spawn.name}`);
                return;
            }
            case ERR_NOT_ENOUGH_ENERGY: {
                console.log(`Not enough energy to spawn ${CreepType.Type} creep. At: ${spawn.name}`);
                return;
            }
            case ERR_INVALID_ARGS: {
                console.log(`Invalid arguments. At: ${spawn.name}`);
                return;
            }
            case ERR_RCL_NOT_ENOUGH: {
                console.log(`Room Controller level not enough. At: ${spawn.name}`);
                return;
            }
        }
        this.spawned = true;
        this.instance = Game.creeps[this.id];
    }

    public Run():void {}
}

export class Harvester extends CreepType {
    public static Type:string = 'Harvester';
    public static Role:string = 'Harvester';
    public static Body:BodyPartConstant[] = [WORK, CARRY, MOVE];
    public static Memory:CreepMemory = {role: Harvester.Role};

    public Run():void {
        const creep = Game.creeps[this.id];
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}