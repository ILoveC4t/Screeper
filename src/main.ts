import { ErrorMapper } from "utils/ErrorMapper";
import * as utils from "utils/utils";

import { Harvester } from "classes/screeps/creep";

let spawned_creeps:any = {
    _total : 0,
}

export const loop = ErrorMapper.wrapLoop(() => {
    if (spawned_creeps._total < Object.keys(Game.creeps).length) {
        spawned_creeps = { "_total": Object.keys(Game.creeps).length };
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            const memory = <any>creep.memory;
            const role = memory.role;
            if (spawned_creeps[role] == undefined) spawned_creeps[role] = [];
            spawned_creeps[role].push(new Harvester());
        }
    }
});
