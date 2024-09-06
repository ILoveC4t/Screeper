export default function cleanMem() {
    const nextCleanup = Memory.meta?.ticksToNext || 0;
    if ( Game.time < nextCleanup) return;
    if (Memory.meta === undefined) Memory.meta = {};
    Memory.meta.ticksToNext = Game.time + 10;

    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }

    for (const name in Memory.rooms) {
        if (!(name in Game.rooms)) {
            delete Memory.rooms[name];
        }
    }
}
