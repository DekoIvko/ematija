import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { IAddTodo, ITodos } from "../../../interfaces/ITodos";
import { Lists, Loader, Pagination, StatusMessage } from "../../../components";

import { CreateTodosService } from "../../../services/TodosService";
import withCommentsLogic from "../../../hooks/withCommentsLogic";
import { useFetchGet } from "../../../hooks/useFetchGet";
import { appConfig } from "../../../appConfig";
import AddTodo from "./AddTodo/AddTodo";
import { useAppSelector } from "../../../store/hooks";
import "./Todos.scss";

// example with CUSTOM HOOK FETCH DATA ------->>
const Todos = ({ onClickComments }: any) => {
  const user = useAppSelector((state) => state.user.user);
  const [todos, setTodos] = useState<ITodos[]>();
  const [error, setError] = useState<Error>();
  const [loadingNewTodo, setLoadingNewTodo] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, apiError, apiData } = useFetchGet(
    // custom hook
    `${appConfig?.baseApiURL}/todos/user/${user?.id}`
  );
  const [newTodo, setNewTodo] = useState<string>("");
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false);
  const [showTodoCreateInputs, setShowTodoCreateInputs] =
    useState<boolean>(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    setTodos(apiData?.todos);
  }, [apiData]);

  const createTodo = async () => {
    setLoadingNewTodo(true);
    try {
      const todo: IAddTodo = {
        todo: newTodo,
        completed: newTodoCompleted,
        userId: user?.id,
      };
      const responseNewTodo: AxiosResponse = await CreateTodosService(todo);
      if (responseNewTodo.status === 200) {
        setTodos((prevArr) => [...prevArr!, responseNewTodo.data]);
        setShowTodoCreateInputs((prevVal) => (prevVal = !prevVal));
        setNewTodo("");
      } else {
        setError(responseNewTodo?.data?.message);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoadingNewTodo(false);
    }
  };

  return (
    <div className="todos flex flex-col">
      <div className="add-todo-btn flex w-100 justify-content-center">
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
        <StatusMessage
          from="add-new-todos"
          status="error"
          message={error.message}
        />
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
        <StatusMessage from="todos" status="error" message={apiError.message} />
      )}
      {!loading && !apiError && todos ? (
        <>
          <Lists
            type="todo"
            data={todos}
            onClickItem={onClickComments}
            currentPage={currentPage}
          />
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
