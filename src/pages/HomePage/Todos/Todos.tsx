import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { IAddTodo, ITodos } from "../../../interfaces/ITodos";
import { Loader, Pagination, StatusMessage } from "../../../components";

import { IStateContext, StateContext } from "../../../store/store";
import {
  CreateTodosService,
  GetTodosService,
} from "../../../services/TodosService";
import withCommentsLogic from "../../../hooks/withCommentsLogic";
import { useFetchGet } from "../../../hooks/useFetchGet";
import { appConfig } from "../../../appConfig";
import "./Todos.scss";

const Todos = ({ onClickComments }: any) => {
  const { state } = useContext<IStateContext>(StateContext);
  const [todos, setTodos] = useState<ITodos[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, apiError, apiData } = useFetchGet(
    `${appConfig?.baseApiURL}/todos?limit=300`
  );
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error>();
  const [newTodo, setNewTodo] = useState<string>("");
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false);
  const [showTodoCreateInputs, setShowTodoCreateInputs] =
    useState<boolean>(false);

  // const getAllPosts = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const { status, data }: AxiosResponse = await GetTodosService();
  //     if (status === 200) {
  //       const myTodos = data?.todos.filter(
  //         (todo: ITodos) => todo.userId === state?.loggedUser?.id
  //       );

  //       setTodos(myTodos);
  //     } else {
  //       setError(data.message);
  //     }
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    // getAllPosts();
    setTodos(apiData?.todos);
  }, [apiData]);

  const createTodo = async () => {
    const todo: IAddTodo = {
      todo: newTodo,
      completed: newTodoCompleted,
      userId: state?.loggedUser?.id,
    };

    const { status, data }: AxiosResponse = await CreateTodosService(todo);

    if (status === 200) {
      // setTodos((prevArr) => [...prevArr!, data]);
      setShowTodoCreateInputs((prevVal) => (prevVal = !prevVal));
      setNewTodo("");
    } else {
      // setError(data?.message);
    }
  };

  return (
    <div className="todos d-flex flex-column">
      <div className="add-todo-btn d-flex w-100 justify-content-center">
        <button
          type="button"
          className="btn btn-link text-decoration-none"
          style={{ color: "#b0b3b8" }}
          onClick={() =>
            setShowTodoCreateInputs((prevVal) => (prevVal = !prevVal))
          }
        >
          Add new todo
        </button>
      </div>
      {showTodoCreateInputs && (
        <div className="create-todo d-flex flex-column p-3">
          <div className="title d-flex">
            <h3>Add new Todo</h3>
          </div>
          <div className="create-todo-inputs d-flex flex-row gap-3 align-items-center">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={newTodoCompleted}
                onChange={() =>
                  setNewTodoCompleted((prevVal) => (prevVal = !prevVal))
                }
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked"
              >
                Completed
              </label>
            </div>
            <div className="button-add">
              <button
                type="button"
                className="btn btn-add"
                onClick={createTodo}
              >
                Add todo
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && !apiError && <Loader />}
      {!loading && apiError && (
        <StatusMessage status="error" message={apiError.message} />
      )}
      {!loading && !apiError && todos ? (
        <>
          {todos
            ?.slice(currentPage, currentPage + 10)
            ?.map((item: ITodos, index: number) => {
              return (
                <div
                  className="todos-item d-flex flex-column gap-2"
                  key={item?.id + "_" + index}
                  onClick={(e) => onClickComments(e)}
                >
                  <div className="todo-text d-flex p-3">{item?.todo}</div>
                  <div className="todo-completed">
                    <span>{item?.completed}</span>
                  </div>
                </div>
              );
            })}
          <Pagination
            currentPage={currentPage}
            total={todos?.length}
            limit={10}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
};

export default withCommentsLogic(Todos);
