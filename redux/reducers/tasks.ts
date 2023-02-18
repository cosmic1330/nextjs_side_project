import { IncrementTask, DecrementTask, ChangeTaskFinishState } from "../constant";
import type { Action } from "redux";
import type {Tasks} from "../types"
import {initTasks} from "../init"


export default function TasksReducer(preState: Tasks = initTasks, action: Action) {
  const { type, data } = <any>action;
  switch (type) {
    case IncrementTask:
      return [...preState, data];
    case DecrementTask:
      preState.splice(data,1)
      return preState;
    case ChangeTaskFinishState:
      let index = preState.findIndex((task)=>task.id===data.id)
      preState[index].finish = data.state
      return preState
    // 初始化 第一次store會帶type = @@redux/xxxxxxx
    default:
      return preState;
  }
}
