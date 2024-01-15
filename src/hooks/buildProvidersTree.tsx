type ProvidersType = [React.ElementType, Record<string, unknown>];
type ChildrenType = {
  children: Array<React.ElementType>;
};

const buildProvidersTree = (componentsWithProps: Array<any>) => {
  const initialComponent = ({ children }: ChildrenType) => <>{children}</>;
  return componentsWithProps.reduce(
    (
      AccumulatedComponents: React.ElementType,
      [Provider, props = {}]: ProvidersType
    ) => {
      return ({ children }: ChildrenType) => {
        return (
          <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent
  );
};

export default buildProvidersTree;
