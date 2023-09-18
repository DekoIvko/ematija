import React, { useState } from "react";

const withCounter = (WrappedComponent: any) => {

  const WithCounter = (props: any) => {
    const [Counter, setCounter] = useState(0);
    const onClickButtonCounter = () => {
      setCounter((prev) => prev + 1);
    };
    
    return (
      <WrappedComponent
        name="Deko"
        counter={Counter}
        onClickButtonCounter={onClickButtonCounter}
        {...props}
      />
    );
  };
  return WithCounter;
};

export default withCounter;
