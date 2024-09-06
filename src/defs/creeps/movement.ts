const DIRECTIONS = ['❌', '🡹', '🡽', '🡺', '🡾', '🡻', '🡿', '🡸', '🡼']

export function moveCreep(creep:Creep):number {
    if (creep.memory.path === undefined) return ERR_NOT_FOUND;

    const memory = creep.memory;
    let sliceIdx = 0;
    let result:number = OK;
    let lastPos:number[] = [creep.pos.x, creep.pos.y]
    for (let i = 0; i < memory.path.length; i++) {
        const direction:DirectionConstant = Number(memory.path[i]) as DirectionConstant

        result = creep.move(direction);

        const curPos = [creep.pos.x, creep.pos.y]

        console.log(direction, result, lastPos, curPos)

        if (lastPos[0] === curPos[0] && lastPos[1] === curPos[1]) result = ERR_NO_PATH
        if (result !== OK) break;

        sliceIdx = i;
    }

    memory.path = memory.path.slice(sliceIdx);
    return result;
}

export function pathToReadableString(path:string):string {
    return path.split('').map((direction) => {return DIRECTIONS[Number(direction)]}).join(' ')
}
