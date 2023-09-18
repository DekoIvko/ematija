import React, { useState } from 'react'

const RenderPropsCounter = (props: any) => {
    const [Counter, setCounter] = useState<number>(0);
    const onClickButtonCounter = () => {
      setCounter((prev) => prev + 1);
    };
  return (
    <div>{props.render(Counter, onClickButtonCounter)}</div>
  )
}

export default RenderPropsCounter