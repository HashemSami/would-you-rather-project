import React from 'react';

export default function Avatar(props){
    return(
        <img className={props.className} src={props.avatar} alt={`${props.name}'s avatar`}/>
    )
}