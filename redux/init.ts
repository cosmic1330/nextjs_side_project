
import { v4 as uuidv4 } from 'uuid';
import type {Tasks, CurrentTask} from "./types"


export const initTasks:Tasks = [
    {"name":"閱讀","time":"17:00","description":"book - 老人與海", finish:false, id:uuidv4()},
    {"name":"寫程式","time":"","description":"GraphQL + React", finish:false, id:uuidv4()}
]
export const initCurrentTask:CurrentTask = {remainingTime:1500, stop:true, ...initTasks[0]}