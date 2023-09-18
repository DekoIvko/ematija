import React from "react";
import withCounter from "../../../../hocs/withCounter";

const CatCounter = ({ description, counter, onClickButtonCounter }: any) => {
  return (
    <div className="d-flex">
      <h5>{counter}</h5>
      <button className="btn" type="button" onClick={onClickButtonCounter}>
        {description}
      </button>
    </div>
  );
};

export default withCounter(CatCounter);
