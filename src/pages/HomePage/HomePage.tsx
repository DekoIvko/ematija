import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext } from "../../store/store";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";

import { IPosts } from "../../interfaces/IPosts";
import { IUserDetails } from "../../interfaces/IUserDetails";
import { IComments } from "../../interfaces/IComments";
import { IQuotes } from "../../interfaces/IQuotes";
import { ITodos } from "../../interfaces/ITodos";

import { Loader, StatusMessage } from "../../components/index";

import { GetPostsService } from "../../services/GetPostsService";
import { GetUsersService } from "../../services/GetUsersService";
import { GetAllCommentsService } from "../../services/GetCommentsService";
import { GetQuotesService } from "../../services/GetQuotesService";
import { GetTodosService } from "../../services/GetTodosService";

import HomeFeed from "./HomeFeed/HomeFeed";
import Quotes from "./Quotes/Quotes";
import Todos from "./Todos/Todos";

import "./HomePage.scss";

const HomePage = () => {
  const { state, dispatch } = useContext(StateContext);
  const [allPosts, setAllPosts] = useState<IPosts[]>();
  const [quotes, setQuotes] = useState<IQuotes[]>();
  const [todos, setTodos] = useState<ITodos[]>();

  const getAllPosts = useCallback(async () => {
    dispatch({ type: "setLoader", payload: true });
    try {
      const getPosts: IPosts[] = await GetPostsService();
      const allUsers: IUserDetails[] = await GetUsersService();
      const allComments: IComments[] = await GetAllCommentsService();
      const allQuotes: IQuotes[] = await GetQuotesService();
      const allTodos: ITodos[] = await GetTodosService();

      getPosts?.forEach((post: IPosts) => {
        const user = allUsers?.find(
          (user: IUserDetails) => post?.userId === user.id
        );
        const comments = allComments?.filter(
          (comment: IComments) => post.id === comment.postId
        );
        if (user) {
          post.user = user;
          post.comments = comments;
        }
        return post;
      });

      allTodos?.forEach((todo: ITodos) => {
        const user = allUsers?.find(
          (user: IUserDetails) => todo?.userId === user.id
        );
        if (user) {
          todo.user = user;
        }
        return todo;
      });

      setTodos(allTodos);
      setQuotes(allQuotes);
      setAllPosts(getPosts);
    } catch (error: any) {
      dispatch({ type: "setError", payload: true });
      dispatch({ type: "setErrorMessage", payload: error.message });
    } finally {
      dispatch({ type: "setLoader", payload: false });
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, []);

  const setNavItem = (navItem: string) => {
    dispatch({ type: "setNavItem", payload: navItem });
  };

  return (
    <div
      className="home-page container-fluid d-flex flex-row gap-2"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      {state?.error && !state?.loader && (
        <StatusMessage status="error" message={state?.errorMessage} />
      )}
      {!state?.error && state?.loader && <Loader />}
      {!state?.error && !state?.loader && (
        <>
          <div className="navigation d-flex flex-column align-self-start bd-highlight flex-grow-1">
            <NavigationMenu state={state} setNavItem={setNavItem} />
          </div>
          {state?.activeNavItem === "feed" && allPosts && (
            <div className="main d-flex flex-column align-self-center">
              <HomeFeed allPosts={allPosts} />
            </div>
          )}
          {state?.activeNavItem === "quotes" && quotes && (
            <div className="main d-flex flex-column align-self-center">
              <Quotes quotes={quotes} />
            </div>
          )}
          {state?.activeNavItem === "todos" && todos && (
            <div className="main d-flex flex-column align-self-center">
              <Todos todos={todos} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
