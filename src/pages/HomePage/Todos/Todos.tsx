import { useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { IAddTodo, ITodos } from "../../../interfaces/ITodos";
import { Loader, Pagination, StatusMessage } from "../../../components";

import { IStateContext, StateContext } from "../../../store/store";
import { CreateTodosService } from "../../../services/TodosService";
import withCommentsLogic from "../../../hooks/withCommentsLogic";
import { useFetchGet } from "../../../hooks/useFetchGet";
import { appConfig } from "../../../appConfig";
import AddTodo from "./AddTodo/AddTodo";
import "./Todos.scss";

// example with CUSTOM HOOK FETCH DATA ------->>
const Todos = ({ onClickComments }: any) => {
  const { state } = useContext<IStateContext>(StateContext);
  const [todos, setTodos] = useState<ITodos[]>();
  const [error, setError] = useState<Error>();
  const [loadingNewTodo, setLoadingNewTodo] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, apiError, apiData } = useFetchGet(
    // custom hook
    `${appConfig?.baseApiURL}/todos/user/${state?.loggedUser?.id}`
  );
  const [newTodo, setNewTodo] = useState<string>("");
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false);
  const [showTodoCreateInputs, setShowTodoCreateInputs] =
    useState<boolean>(false);

  useEffect(() => {
    setTodos(apiData?.todos);
  }, [apiData]);

  const createTodo = async () => {
    setLoadingNewTodo(true);
    try {
      const todo: IAddTodo = {
        todo: newTodo,
        completed: newTodoCompleted,
        userId: state?.loggedUser?.id,
      };

      const { status, data }: AxiosResponse = await CreateTodosService(todo);

      if (status === 200) {
        setTodos((prevArr) => [...prevArr!, data]);
        setShowTodoCreateInputs((prevVal) => (prevVal = !prevVal));
        setNewTodo("");
      } else {
        setError(data?.message);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoadingNewTodo(false);
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
      {loadingNewTodo && !error && <Loader />}
      {!loading && error && (
        <StatusMessage status="error" message={error.message} />
      )}
      {showTodoCreateInputs && !loadingNewTodo && (
        <AddTodo
          setNewTodo={setNewTodo}
          newTodo={newTodo}
          newTodoCompleted={newTodoCompleted}
          setNewTodoCompleted={setNewTodoCompleted}
          createTodo={createTodo}
        />
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
