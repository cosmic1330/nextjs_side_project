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

export default function TimeLine({ data }) {
  const render = () => {
    return (
      data &&
      data.map((item, index) => {
        if (index === data.length - 1) {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <AssignmentIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3}>
                  <Typography variant="h6" component="h1">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        } else if (index % 2 === 0) {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <AssignmentIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3}>
                  <Typography variant="h6" component="h1">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        } else if (index % 2 === 1) {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <AssignmentIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3}>
                  <Typography variant="h6" component="h1">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        }
      })
    );
  };
  return <Timeline align="alternate">{render()}</Timeline>;
}
