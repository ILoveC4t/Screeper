import { moveCreep, pathToReadableString } from "../movement";

const findPathOpts = {
    ignoreCreeps: true,
    range: 1
}

/*
State 0: Get Source
State 1: Path to Source
State 2: Mine Source
*/

function getSource(creep:Creep) {
    const tID = creep.room.memory.resources.sources[0]
    if (Game.getObjectById<Source>(tID) === null) return;

    creep.memory.target = tID
    creep.memory.state = 1
}

function movement(creep:Creep) {
    const hasPath = creep.memory.path?.length ? true:false
    const room = creep.room;
    const target = Game.getObjectById<Source>(creep.memory.target);

    if (!target) return;
    if (hasPath === false) {
        const path = room.findPath(creep.pos, target.pos, findPathOpts)
        creep.memory.path = Room.serializePath(path).split('').slice(4).join('')
        creep.memory.state = 1
    }
    const moveRes = moveCreep(creep);
    if (moveRes === ERR_NO_PATH) creep.memory.path = ''
    if (moveRes === OK && creep.pos.inRangeTo(target.pos, 1)) creep.memory.state = 2
}

function harvest(creep:Creep) {
    const capacity = creep.store.getFreeCapacity(RESOURCE_ENERGY)
    if (capacity < 2) {
        creep.memory.state = 3;
        return;
    }

    const target = Game.getObjectById<Source>(creep.memory.target);
    if (!target) return;
    const res = creep.harvest(target)
}

function store(creep:Creep) {

}

export default function allrounder(creep: Creep): void {
    let state = creep.memory.state | 0
    switch (state) {
        case 0: return getSource(creep)
        case 1: return movement(creep)
        case 2: return harvest(creep)
        default: creep.say("=w=")
    }

}
