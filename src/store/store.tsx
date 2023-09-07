import {
  Dispatch,
  SetStateAction,
  createContext,
  useReducer,
} from "react";
import InitialStore from "./InitialStore";
import { IInitialStore } from "../interfaces/IInitialStore";
import { reducer } from "./reducers";

export interface IStateContext {
  state: IInitialStore;
  disptach: Dispatch<SetStateAction<IInitialStore>>;
}

type InititalContextProviderProps = {
  children: React.ReactNode;
};

export const StateContext = createContext(InitialStore);
// export const AuthContext = createContext(null); later for auth context

export const InititalContextProvider = ({
  children,
}: InititalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, InitialStore);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
