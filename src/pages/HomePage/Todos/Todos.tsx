import { useState } from "react";
import { IAddTodo } from "../../../interfaces/ITodos";
import { Lists, Loader, Pagination } from "../../../components";
import { useUserAuthContext } from "../../../context/UserAuthContext";

import { useFetchQuery } from "../../../hooks/useFetchQuery";
import {
  CreateTodosService,
  GetTodosService,
} from "../../../services/TodosService";
import withCommentsLogic from "../../../hooks/withCommentsLogic";
import AddTodo from "./AddTodo/AddTodo";

const Todos = ({ onClickComments }: any) => {
  const user = useUserAuthContext();

  const [loadingNewTodo, setLoadingNewTodo] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [newTodo, setNewTodo] = useState<string>("");
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false);
  const [showTodoCreateInputs, setShowTodoCreateInputs] =
    useState<boolean>(false);

  const { data, isError, error, isLoading } = useFetchQuery(
    () => GetTodosService(user.user.id.toString()),
    "todos"
  );

  if (isLoading) {
    <Loader />;
  }
  if (isError) {
    // showBoundary(error);
    console.log(error);
  }

  const createTodo = async () => {
    setLoadingNewTodo(true);
    try {
      const todo: IAddTodo = {
        todo: newTodo,
        completed: newTodoCompleted,
        userId: user?.user.id,
      };
      const responseNewTodo: any = await CreateTodosService(todo);
      if (responseNewTodo.status === 200) {
        // setTodos((prevArr) => [...prevArr!, responseNewTodo.data]);
        setShowTodoCreateInputs((prevVal) => (prevVal = !prevVal));
        setNewTodo("");
      } else {
        // setError(responseNewTodo?.data?.message);
      }
    } catch (error: any) {
      // setError(error);
    } finally {
      setLoadingNewTodo(false);
    }
  };

  return (
    <div className="todos flex flex-col">
      <div className="add-todo-btn flex w-full justify-center">
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

      {showTodoCreateInputs && !loadingNewTodo && (
        <AddTodo
          setNewTodo={setNewTodo}
          newTodo={newTodo}
          newTodoCompleted={newTodoCompleted}
          setNewTodoCompleted={setNewTodoCompleted}
          createTodo={createTodo}
        />
      )}

      {data ? (
        <>
          <Lists
            type="todo"
            data={data?.data}
            onClickItem={onClickComments}
            currentPage={currentPage}
          />
          <Pagination
            currentPage={currentPage}
            total={data?.data.length}
            limit={10}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
};

export default withCommentsLogic(Todos);
