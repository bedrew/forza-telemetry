import React from 'react'
import * as d3 from 'd3'

const sideColumnStyle = {
    float: 'left',
    width: '25%',
    height: '100%',
    color: 'white',
}
const centerColumnStyle = {
    float: 'left',
    width: '75%',
    height: '100%',
}
const dataTopRowStyle = {
    height: '25%',
    textAlign: 'left',
    margin: '18px 0px 0px 30px',
    fontFamily: 'Roboto',
}
const dataRowStyle = {
    height: '25%',
    textAlign: 'left',
    margin: '-2px 0px 0px 30px',
    fontFamily: 'Roboto',
}
const dataValueStyle = {
    color: '#C54242',
    fontSize: '24px',
}
const dataKeyStyle = {
    color: 'grey',
    fontSize: '12px',
}
const tireTableStyle = {
    tableLayout: 'fixed',
    height: '100%',
    width: '80%',
    marginLeft: '22px',
}
const tireTableDataStyle = {
    width: '50%',
}

// cold: 135 < x < 155
// norm: 155 < x < 275
// warm: 275 < x < 300
// fire: 300 < x < 340
function getQuadColorInterpolation(
    temp,
    color1,
    color2,
    color3,
    color4,
    coldLower,
    coldUpper,
    warmLower,
    warmUpper,
    hotLower,
    hotUpper
) {
    if (temp < warmLower && temp > warmUpper) {
        return color2
    } else if (temp >= hotLower) {
        const x = Math.min(
            1,
            Math.max(0, (temp - hotLower) / (hotUpper - hotLower))
        )
        return d3.interpolateLab(color3, color4)(x)
    } else if (temp >= warmLower) {
        const x = Math.min(
            1,
            Math.max(0, (temp - warmLower) / (warmUpper - warmLower))
        )
        return d3.interpolateLab(color2, color3)(x)
    } else {
        const x = Math.min(
            1,
            Math.max(0, (temp - coldLower) / (coldUpper - coldLower))
        )
        return d3.interpolateLab(color1, color2)(x)
    }
}

function LeftTire(props) {
    const t = props.Temp
    const color = getQuadColorInterpolation(
        t,
        '#3ABDBD',
        '#171717',
        'orange',
        '#C54242',
        135,
        155,
        275,
        300,
        300,
        340
    )
    return (
        <div style={{backgroun: color }} className={'tire'}>
            <span style={{color:"red"}}>{Math.round(props.Temp)}</span>
        </div>
    )
}

function RightTire(props) {
    const color = getQuadColorInterpolation(
        props.Temp,
        '#3ABDBD',
        '#171717',
        'orange',
        '#C54242',
        135,
        155,
        275,
        300,
        300,
        340
    )
    return (
        <div style={{backgroun: color }} className={'tire'}>
            <span style={{color:"red"}}>{Math.round(props.Temp)}</span>
        </div>
    )
}

function Tires(props) {
    return (
        <div className='tire-block'>
            <div className='caption-wrap'>
                <div className='caption'>
                    <div>
                        {Number((180 * props.Pitch) / Math.PI).toFixed(1)}°
                    </div>
                    <div >PITCH</div>
                </div>
                <div className='caption'>
                    <div>
                        {Number((180 * props.Yaw) / Math.PI).toFixed(1)}°
                    </div>
                    <div >YAW</div>
                </div>
                <div className='caption'>
                    <div >
                        {Number((180 * props.Roll) / Math.PI).toFixed(1)}°
                    </div>
                    <div >ROLL</div>
                </div>
                <div className='caption'>
                    <div>
                        {Number(100 * (props.Brake / 255)).toFixed(0)}%
                    </div>
                    <div >BRAKE</div>
                </div>
            </div>
            <div className='tire-wrap'>
                <LeftTire Temp={props.FlTemp} />
                <RightTire Temp={props.FrTemp} />
                <LeftTire Temp={props.RlTemp} />
                <RightTire Temp={props.RrTemp} />
            </div>
        </div>
    )
}

export default Tires
