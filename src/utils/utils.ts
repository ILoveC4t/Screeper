import { Performance } from "perf_hooks";

export function makeid(length:number):string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function patchConsoleLog() {
  const orig_console_log = console.log;
  console.log = function(...args: any[]) {
    for (let i = 0; i < args.length; i++) {
        if(typeof args[i] === "object") args[i] = JSON.stringify(args[i], null, 1)
    }
    orig_console_log.apply(console, args);
  };
}

export function errorName(eID:number):string {
  eID = Math.abs(eID) || 0;
  switch (eID) {
      case 0: return "OK";
      case 1: return "ERR_NOT_OWNER";
      case 2: return "ERR_NO_PATH";
      case 3: return "ERR_NAME_EXISTS";
      case 4: return "ERR_BUSY";
      case 5: return "ERR_NOT_FOUND";
      case 6: return "ERR_NOT_ENOUGH_ENERGY";
      case 7: return "ERR_INVALID_TARGET";
      case 8: return "ERR_FULL";
      case 9: return "ERR_NOT_IN_RANGE";
      case 10: return "ERR_INVALID_ARGS";
      case 11: return "ERR_TIRED";
      case 12: return "ERR_NO_BODYPART";
      case 14: return "ERR_RCL_NOT_ENOUGH";
      case 15: return "ERR_GCL_NOT_ENOUGH";
      default: return `ERR_${eID}_UNKNOWN`;
  }
}

export function creepsNeeded(creep:Creep) {
    const amntWork = creep.body.filter((part) => {return part.type === WORK}).length

}
