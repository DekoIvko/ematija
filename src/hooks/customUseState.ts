// close example of useState hook of React

export const customUseState = (() => {
  let state: any;
  let index = 0;
  const customState = (initialValue: any) => {
    const localIndex = index;
    index++;

    if (state[localIndex] === undefined) state[localIndex] = initialValue;

    const setState = (prevVal: any) => {
      state[localIndex] = prevVal;
    };
    return [state[localIndex], setState];
  };

  const resetIndex = () => {
    index = 0;
  };

  return {
    customState,
    resetIndex,
  };
})();

// close example of useEffect hook of React
export const customUseEffect = (callback: Function, dependencyArray: []) => {
  let hasChange = true;
  let hooks: any = [];
  let index = 0;
  const oldDependencies = hooks[index];

  if (oldDependencies) {
    hasChange = false;

    dependencyArray.forEach((dependency, index) => {
      const oldDependency = oldDependencies[index];
      const areTheSame = Object.is(dependency, oldDependency);
      if (!areTheSame) {
        hasChange = true;
      }
    });
  }

  if (hasChange) {
    callback();
  }

  hooks[index] = dependencyArray;
  index++;
};
