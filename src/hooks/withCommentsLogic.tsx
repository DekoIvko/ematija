import { BaseSyntheticEvent } from "react";

interface IProps {
  onClickComments: Function;
}

const withCommentsLogic = (
  WrappedComponent: React.JSXElementConstructor<any>
) => {
  const WithCommentsLogic = (props: React.PropsWithChildren<IProps | any>) => {
    const onClickComments = (comment: BaseSyntheticEvent) => {
      comment.target.setAttribute("style", "color: red");
    };
    return <WrappedComponent onClickComments={onClickComments} {...props} />;
  };
  return WithCommentsLogic;
};

export default withCommentsLogic;

// this is for exercise propers HOC
