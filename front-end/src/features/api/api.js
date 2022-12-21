export const url = "http://localhost:8080/user";

export  const setHeaders = () => {
  const user = localStorage.getItem("userToken");

  // console.log(user);
  if (user) {
    return { "x-access-token": user};
  } else {
    return {};
  }
};