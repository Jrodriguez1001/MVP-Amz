export const login = async (username, password) => {
  const response = await fetch(`http://127.0.0.1:1337/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: username,
      password,
    }),
  });
  const data = await response.json();
  const jwt = data.jwt;
  const isLogged = data.jwt ? true : false;
  return {
    isLogged,
    jwt,
  };
};

export const getMe = async (jwt) => {
  try {
    const res = await fetch("http://127.0.0.1:1337/api/users/me?populate=*", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = await res.json();
    const statusCode = res.status;
    
    if (statusCode !== 200) {
        return null;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};
