import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import Typography from '@material-ui/core/Typography'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
}))

export default function TimeLine({ data }) {
  const classes = useStyles()

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
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
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
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
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
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
        }
      })
    )
  }
  return <Timeline align="alternate">{render()}</Timeline>
}
