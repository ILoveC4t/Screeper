import * as _behaviours from "./creepBehaviours";

interface CreepBehaviours {
    [key: string]: Function;
}
const creepBehaviours: CreepBehaviours = _behaviours;

export const AllRounder: CreepType = {
    role: "allrounder",
    memory: {},
    body: [WORK, CARRY, MOVE]
};

export const Miner: CreepType = {
    role: "miner",
    memory: {},
    body: [WORK, WORK, MOVE]
};

export const Transporter: CreepType = {
    role: "transporter",
    memory: {},
    body: [CARRY, CARRY, MOVE]
};
