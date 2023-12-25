import React from 'react'

function Tach(props) {
    return (
        <div className='tahometer-block'>
            <div style={{display:'flex', width: '300px', alignItems: 'flex-end'}}>
                <div style={{transform: 'rotate(180deg)'}} className='rpm-line'>
                    <span style={{height: `${props.rpmWidth}%` }}></span>
                </div>
                <div>
                    <span style={{marginLeft: '10px'}}>rpm:</span> 
                    <span> {props.rpm}</span>
                </div>
            </div>
            <div>
                <div>
                    <span>gear:</span>
                    <span> {props.gear}</span>
                </div>
                <div>
                    <span>mp/h:</span>
                    <span> {props.speed}</span>
                </div>
            </div>
        </div>
    )
}

export default Tach
