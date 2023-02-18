import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from 'react-redux';
import { ReplaceCurrentTask } from "../../../redux/constant";
import { css } from "@emotion/css";

const cssHover = css`cursor:pointer;`

function Item({item, index, last, current}){
  const dispatch = useDispatch();
  const changeCurrentTask = () => dispatch({type:ReplaceCurrentTask,data:item})
  return (
    <TimelineItem key={index}>
      <TimelineOppositeContent>
        <Typography pl={2} variant="body2" color="textSecondary">
          {item.time}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot className={cssHover} color={current?"primary":item.finish?"success":"grey"} onClick={changeCurrentTask}>
          <AssignmentIcon />
        </TimelineDot>
        {!last && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3}>
          <Typography pl={2} variant="h6" component="h1">
            {item.name}
          </Typography>
          <Typography pl={2}>{item.description}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )
}

export default function TimeLine({ data }) {
  const {id}= useSelector(state => state["currentTask"]);
  const render = () => {
    return (
      data &&
      data.map((item, index) => {
        if (index % 2 !== 0) {
          return (
            <Item {...{ item,index, last:index===data.length-1, current:id===item.id}}/>
          );
        } else if (index % 2 === 0) {
          return (
            <Item {...{ item,index, last:index===data.length-1, current:id===item.id}}/>
          );
        } 
      })
    );
  };
  return <Timeline align="alternate">{render()}</Timeline>;
}
