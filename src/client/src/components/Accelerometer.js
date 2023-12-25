import React from 'react'
import { Circle, Polyline } from '../plugins/ReactShapes/Shapes'


const backgroundStyle = {
    boxSizing: 'borderBox',
    width: '100%',
    flex: 'none',
}
const foregroundStyle = {
    boxSizing: 'borderBox',
    width: '100%',
    flex: 'none',
    marginLeft: '-100%',
}

function getAccelerometerPosition(x, z, radius) {
    const xSign = x >= 0 ? 1 : -1
    const zSign = z >= 0 ? 1 : -1
    const xVal = Math.min(Math.abs(x * 10), radius) * xSign
    const zVal = Math.min(Math.abs(z * 10), radius) * zSign
    return `${radius},${radius} ${radius - xVal},${radius + zVal}`
}

function getRedLinePosition(x, z, radius) {
    const xSign = x >= 0 ? 1 : -1
    const zSign = z >= 0 ? 1 : -1

    const xEnd = radius - Math.min(Math.abs(x * 10), radius) * xSign
    const zEnd = radius + Math.min(Math.abs(z * 10), radius) * zSign

    const xLen = xEnd - radius
    const zLen = zEnd - radius
    const xStart =
        radius - Math.min(Math.abs(x * 10), radius) * xSign - xLen * 0.15
    const zStart =
        radius + Math.min(Math.abs(z * 10), radius) * zSign - zLen * 0.15

    return `${xStart},${zStart} ${xEnd},${zEnd}`
}

function Accelerometer(props) {
    const radius = 150

    return (
        <div className='acc-block'>
            <div>
                <div className='acc-circle'>
                <div>
                    <Circle
                        r={radius}
                        fill={{ color: 'transparent' }}
                        stroke={{ color: '#4D4D4D' }}
                        strokeWidth={1}
                    />
                </div>
                <div>
                    <Polyline
                        points={getAccelerometerPosition(
                            props.X,
                            props.Z,
                            radius
                        )}
                        fill={{ color: '#34495e' }}
                        stroke={{ color: '#4D4D4D' }}
                        strokeWidth={3}
                    />
                </div>
                <div>
                    <Polyline
                        points={getRedLinePosition(props.X, props.Z, radius)}
                        fill={{ color: 'transparent' }}
                        stroke={{ color: '#C54242' }}
                        strokeWidth={3}
                    />
                </div>
                </div>
               
                <div style={{position: 'absolute'}} className='caption-wrap'>
                    <div className='caption'>
                        <div>
                        {(
                            Math.abs(props.X / 9.81) +
                            Math.abs(props.Y / 9.81) +
                            Math.abs(props.Z / 9.81)
                        ).toFixed(2)} 
                        G</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accelerometer
