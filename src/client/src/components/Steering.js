import React from 'react'
import Arc from './Arc'

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
    marginLeft: '-10px',
}
const centerStyle = {
    margin: 'auto',
    width: '100%',
    height: '100%',
}
const blockStyle = {
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '100%',
    maxHeight: '100%',
}
const backgroundStyle = {
    boxSizing: 'borderBox',
    width: '100%',
    flex: 'none',
    height: '336px',
    maxHeight: '100%',
}
const foregroundStyle = {
    boxSizing: 'borderBox',
    width: '100%',
    flex: 'none',
    marginLeft: '-100%',
    height: '336px',
    maxHeight: '100%',
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

function getSteeringAngle(angle, x) {
    const percentSteeringAngle = (angle + 127.0) / 255.0
    return percentSteeringAngle * 2 * Math.PI * (321.25 / 360) + x
}

function Steering(props) {
    return (
        <div className='sterring-block'>
            <div className='caption-wrap'>
                <div className='caption'>
                    <div>
                        {Math.abs(
                            Math.max(0, (props.power / 745.699872).toFixed(0))
                        )}
                    </div>
                    <div>POWER</div>
                </div>
                <div className='caption'>
                    <div>
                        {Math.abs(
                            Math.max(0, props.torque * 0.73756).toFixed(0)
                        )}
                    </div>
                    <div>TORQUE</div>
                </div>
                <div className='caption'>
                    <div>
                        {((props.throttle / 255) * 100).toFixed(0)}%
                    </div>
                    <div>THROTTLE</div>
                </div>
                <div className='caption'>
                    <div>{props.boost.toFixed(1)}</div>
                    <div>BOOST</div>
                </div>
            </div>
            <div className='sterring'>
                    <Arc
                        outerRadius={140}
                        innerRadius={140}
                        startAngle={0}
                        endAngle={2 * Math.PI * (320 / 360)}
                        color="#4D4D4D"
                        strokeWidth="20"
                    />
                    <Arc
                        outerRadius={160}
                        innerRadius={160}
                        startAngle={getSteeringAngle(
                            props.steering,
                            -0.2
                        )}
                        endAngle={getSteeringAngle(props.steering, 0.2)}
                        color="#C54242"
                        strokeWidth="10"
                    />
            </div>
        </div>
    )
}

export default Steering
