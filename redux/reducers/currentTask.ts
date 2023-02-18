import { ReplaceCurrentTask, ClearCurrentTask, ChangeCurrentTaskStopStatus, RestartCurrentTask, ReciprocalTime, RestCurrentTask } from "../constant";
import type { Action } from "redux";
import type { CurrentTask } from "../types"
import {initCurrentTask} from "../init"

export default function CurrentTasksReducer(preState: CurrentTask = initCurrentTask, action: Action) {
  const { type, data } = <any>action;
  switch (type) {
    case ReplaceCurrentTask:
      return { ...data, remainingTime: 1500, stop: true };
    case ClearCurrentTask:
      return null;
    case ChangeCurrentTaskStopStatus:
      return { ...preState, stop: data };
    case RestartCurrentTask:
      // hack: time = 1500 ，demo先改成3 
      let time = 3
      if (preState.name === "休息") time = 300
      return { ...preState, remainingTime: time };
    case ReciprocalTime:
      return { ...preState, remainingTime: preState.remainingTime - 1 }
    case RestCurrentTask:
      // hack: remainingTime = 300 ，demo先改成5
      return { ...preState, name: "休息", description: `恭喜完成一個番茄鐘"${preState.name}"。`, remainingTime: 5 }
    // 初始化 第一次store會帶type = @@redux/xxxxxxx
    default:
      return preState;
  }
}
