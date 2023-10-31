import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

interface IProps {
  setNewTodo: Function;
  newTodo: string;
  newTodoCompleted: boolean;
  setNewTodoCompleted: Function;
  createTodo: MouseEventHandler<HTMLButtonElement>;
}

const AddTodo = ({
  setNewTodo,
  newTodo,
  newTodoCompleted,
  setNewTodoCompleted,
  createTodo,
}: IProps) => {
  return (
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
              setNewTodoCompleted((prevVal: any) => (prevVal = !prevVal))
            }
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Completed
          </label>
        </div>
        <div className="button-add">
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={createTodo}
          >
            Add todo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
