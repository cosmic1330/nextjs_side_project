import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ChangeCurrentTaskStopStatus, RestartCurrentTask, ReciprocalTime, RestCurrentTask, ChangeTaskFinishState } from "../../../redux/constant";

export default function useCountdown(){
    const [open, setOpen] = useState(false);
    const {remainingTime,stop, name, id }= useSelector(state => state["currentTask"]);
    const dispatch = useDispatch();

    useEffect(()=>{
        let timer = setInterval(()=>{
            if(!stop && remainingTime >0) dispatch({type:ReciprocalTime})
            else if(remainingTime<=0 && name!=="休息") dispatch({type:RestCurrentTask})
            else if(remainingTime<=0 && name==="休息"){
                dispatch({type:ChangeTaskFinishState, data:{id, state:true}})
                setOpen(true)
                clearInterval(timer);
            }
        },1000)
        return ()=>{
            clearInterval(timer);
        }
    },[stop, remainingTime, name])

    const start = () => dispatch({type:ChangeCurrentTaskStopStatus,data:false})
    const pause = () => dispatch({type:ChangeCurrentTaskStopStatus,data:true})
    const restart = () => dispatch({type:RestartCurrentTask})

    return [start, pause, remainingTime , restart, setOpen, open]
}