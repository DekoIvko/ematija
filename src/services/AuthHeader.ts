export const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem("ematija-user")!);
  if (user) {
    return { Authorization: user?.accessToken };
  } else {
    return {};
  }
};
