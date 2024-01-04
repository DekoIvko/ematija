import { BaseSyntheticEvent } from "react";

interface IProps {
  onClickWrapped: Function;
}

const withCommentsLogic = (
  WrappedComponent: React.JSXElementConstructor<any>
) => {
  const WithCommentsLogic = (props: React.PropsWithChildren<IProps | any>) => {
    const onClickWrapped = (comment: BaseSyntheticEvent) => {
      // console.log(comment);
      comment.target.setAttribute("style", "color: red");
    };
    return <WrappedComponent onClickComments={onClickWrapped} {...props} />;
  };
  return WithCommentsLogic;
};

export default withCommentsLogic;

// this is for exercise propers HOC
