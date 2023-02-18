// 為Count生成action
// Object是同步action
// Func是異步action

import type {Task} from "../types"
import { IncrementTask, DecrementTask } from "../constant";
import { v4 as uuidv4 } from 'uuid';

export const createIncrementTaskAction = (data: Task) => {
  let uuid = uuidv4();
  return{
    type: IncrementTask,
    data:{...data, id:uuid, finish:false}
}
};
export const createDecrementTaskAction = (data: Task) => ({
  type: DecrementTask,
  data
});