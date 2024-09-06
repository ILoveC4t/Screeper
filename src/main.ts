import { ErrorMapper } from "utils/ErrorMapper";
import profiler from "screeps-profiler";
import { AllRounder } from "defs/creeps/creepTypes";
import { makeid, patchConsoleLog } from "utils/utils";
import executeBehaviour from "defs/creeps/creepBehaviours";
import cleanMem from "defs/memory/cleanup";

function spawn_creep(spawn: StructureSpawn, name:string, type: CreepType, additional_memory: CreepMemory = {}) {
    const memory = { ...{role: type.role}, ...type.memory, ...additional_memory };
    spawn.spawnCreep(type.body, name, { memory: memory });
}

function spawn_handler(room: Room) {
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    if (spawn === undefined) return;
    if (spawn.isActive() === false) return;

    const creeps = room.find(FIND_MY_CREEPS);
    if (creeps.length === 0) {
        const name = AllRounder.role + "_" + makeid(6);
        spawn_creep(spawn, name, AllRounder);
        return;
    }
}

profiler.enable();
export const loop = ErrorMapper.wrapLoop(() => { profiler.wrap(() => {
    patchConsoleLog()
    cleanMem();
    for(const rName in Game.rooms) {
        const room = Game.rooms[rName];
        room.memory = {}
        room.memory.resources = {};
        const resources = room.memory.resources;
        const minerals = room.find(FIND_MINERALS);
        resources.minerals = {};
        for (const mineral of minerals) {
            if (resources.minerals[mineral.mineralType] === undefined) {
                resources.minerals[mineral.mineralType] = [];
            }
            resources.minerals[mineral.mineralType].push(mineral.id);
        }

        const sources = room.find(FIND_SOURCES);
        resources.sources = [];
        for (const source of sources) {
            resources.sources.push(source.id);
        }

        for (const idx in room.memory.sources) {
            const sourceId: Id<Source> = room.memory.sources[idx];
            const source = Game.getObjectById<Source>(sourceId);
            if (source === null) {
                delete room.memory.sources[idx];
            }
        }
        room.memory.initialized = true;
        spawn_handler(room);
    }

    for(const cName in Game.creeps) {
        const creep = Game.creeps[cName];
        if (creep.spawning) continue;
        executeBehaviour(creep);
    }
})});
