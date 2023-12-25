import React from 'react'
import * as shape from 'd3-shape'

const d3 = { shape }

const Arc = ({
    outerRadius,
    innerRadius,
    startAngle,
    endAngle,
    color,
    strokeWidth,
}) => {
    const arcGenerator = d3.shape
        .arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)

    return (
            <svg viewBox={'-200 -200 400 400'}>
                <g transform="rotate(200 0 0)">
                    <path
                        d={arcGenerator()}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                </g>
            </svg>
    )
}

export default Arc
