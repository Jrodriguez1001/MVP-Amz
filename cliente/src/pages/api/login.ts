import type { APIRoute } from "astro";
import { login } from "../../utils/strapi.js";

export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");
  const { isLogged, jwt } = await login(username, password);
  if (isLogged) {
    const response = new Response(
      JSON.stringify({
        message: "Success",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${jwt}; HttpOnly; Path=/; Max-Age=3600`,
        },
      }
    );

    return response;
  } else {
    return new Response(
      JSON.stringify({
        message: "Error",
      }),
      { status: 400 }
    );
  }
};
