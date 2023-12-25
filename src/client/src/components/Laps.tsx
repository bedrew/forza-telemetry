import React from 'react'


/* const useStyles = makeStyles({
    table: {
        width: '95%',
        backgroundColor: '#171717',
        margin: '2.5%',
    },
})
 */
type LapProps = {
    LapNumber: number
    LapTime: string
    PreviousLaps: number[][]
}

type Lap = {
    LapNumber: number
    Time: string
    Split: string
}

const Laps: React.FC<LapProps> = ({ LapNumber, LapTime, PreviousLaps }) => {
    // const classes = useStyles()

    const visibleLaps: Lap[] = []
    const lapCap = 16

    for (let i = 0; i < PreviousLaps.length; i++) {
        if (i > 0 && PreviousLaps[i][0] !== PreviousLaps[i - 1][0] - 1) {
            break
        }

        visibleLaps.push({
            LapNumber: PreviousLaps[i][0] + 1,
            Time: PreviousLaps[i][1] + '',
            Split: PreviousLaps[i][2] + '',
        })
    }

    if (visibleLaps.length > lapCap) {
        visibleLaps.splice(lapCap, visibleLaps.length - lapCap)
    }

    const getTime = (time:any) => (Number(time) / 60).toFixed(4)

    return (<div></div>
    /*   <TableContainer
            style={{ backgroundColor: '#171717' }}
            component={Paper}
        >
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow key={'header'}>
                        <TableCell style={{ color: '#C54242' }}>LAP</TableCell>
                        <TableCell align="left" style={{ color: '#C54242' }}>
                            TIME
                        </TableCell>
                        <TableCell align="right" style={{ color: '#C54242' }}>
                            SPLIT
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={LapNumber}>
                        <TableCell component="th" scope="row">
                            {LapNumber}
                        </TableCell>
                        <TableCell align="left">{getTime(LapTime)}</TableCell>
                        <TableCell align="right"> </TableCell>
                    </TableRow>
                    {visibleLaps.map((row) => (
                        <TableRow key={row.LapNumber}>
                            <TableCell component="th" scope="row">
                                {row.LapNumber}
                            </TableCell>
                            <TableCell align="left">{getTime(row.Time)}</TableCell>
                            <TableCell align="right">{row.Split}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> */
    )
}

export default Laps
