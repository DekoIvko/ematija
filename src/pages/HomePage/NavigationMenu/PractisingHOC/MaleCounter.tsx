import React from "react";
import withCounter from "../../../../hocs/withCounter";

const MaleCounter = ({ description, counter, onClickButtonCounter }: any) => {
  return (
    <div className="d-flex">
      <h5>{counter}</h5>
      <button className="btn" type="button" onClick={onClickButtonCounter}>
        {description}
      </button>
    </div>
  );
};

export default withCounter(MaleCounter);