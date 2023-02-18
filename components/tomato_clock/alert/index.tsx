
import useCountdown from "../hooks/useCountdown"
import { css, cx } from "@emotion/css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const cssMain = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
    gap: 10px;
`

const cssButtonArea = css`
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    border:1px solid #707070;
`

const cssItem = css`
    background-color: #707070;
    border-radius: 5px;
    padding:5px 10px;
    color:#fff;
`


function Item({children, ...args}){
    return <div className={cx(cssItem, args.css)} {...{args}}>{children}</div>
}

export default function Alert() {
    const [start, pause, time, restart, setOpen, open] = useCountdown()
    const {name, description} = useSelector(state => state["currentTask"]);

    const format = (s) => {
        let m: string | number = Math.floor(s/60);
        s = s%60;
        m = `${m}`
        s = `${s}`
        m = (m.length==1)?'0'+m:m;
        s = (s.length==1)?'0'+s:s;
        return m+':'+s;
    }

    const close = () => setOpen(false)
    return (
        <div className={cssMain}>
            <Box className={cssButtonArea}>
                <ButtonGroup color="primary" aria-label="medium secondary button group">
                    <Button variant="contained" onClick={start} key="start">Start</Button>
                    <Button variant="contained" onClick={pause} key="pause">Pause</Button>
                    <Button variant="contained" onClick={restart} key="restart">Restart</Button>
                </ButtonGroup>
                
            </Box>

            <Box className={cssButtonArea}>
                <Stack direction="row" spacing={2}>
                    <div>
                        任務： <Item>{name}</Item>                        
                    </div>
                    <div>
                        時間：<Item>{format(time)}</Item>
                    </div>
                </Stack>
            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={close} anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
                <MuiAlert variant="filled" severity="success">
                    {description}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}