import React, { useState } from 'react';
import "../style.css";

// The single note button
const Pad = ({note, isActive, ...rest}) => {
  const [on, setOn] = useState(false);
  // const isOn = false;
  // console.log(props);
  //<button onClick={() => setOn(!on)} class={`ui ${on ? 'blue' : ''} button`}></button>
  const toggle = () => {
    setOn(!on);
    //this.props.onClick;
  }
  const classes = isActive ? "pad pad-pressed" : "pad";
  return (
    <div className={classes} {...rest}></div>
    );
};

export default Pad;