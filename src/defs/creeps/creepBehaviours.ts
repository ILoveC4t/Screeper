import { errorName } from "utils/utils";
import { moveCreep, pathToReadableString } from "./movement";
import allrounder from "./behaviours/allrounder";

export default function executeBehaviour(creep: Creep): void {
    switch (creep.memory.role) {
        case "allrounder":
            allrounder(creep);
            break;
        case "miner":
            break;
        case "transporter":
            break;
    }
}
