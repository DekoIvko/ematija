import { Dispatch, SetStateAction, createContext, useReducer } from "react";
import InitialStore from "./InitialStore";
import { IInitialStore } from "../interfaces/IInitialStore";
import { IActions, reducer } from "./reducers";

export interface IStateContext {
  state: IInitialStore;
  dispatch: Dispatch<SetStateAction<IActions>>;
}

type InitialContextProviderProps = {
  children: React.ReactNode;
};

export const StateContext = createContext(InitialStore);

export const InitialContextProvider = ({
  children,
}: InitialContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, InitialStore);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
