export const url = "http://localhost:8080/user";

export const setHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { "x-access-token": user.token};
  } else {
    return {};
  }
};

// export const setHeaders = () => {
//   const headers = {
//     headers: {
//       "x-auth-token": localStorage.getItem("token"),
//     },
//   };

//   return headers;
// };
