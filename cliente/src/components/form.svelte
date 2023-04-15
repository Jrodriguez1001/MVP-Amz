<script>
  import * as yup from "yup";
  import { Form, Message, isInvalid } from "svelte-yup";
  let schema = yup.object().shape({
    username: yup
      .string()
      .min(4, "El nombre de usuario, no es correcto")
      .required()
      .label("username"),
    password: yup
      .string()
      .min(8, "La contraseña no parece ser correcta")
      .required()
      .label("password"),
  });
  let fields = { username: "", password: "" };
  let submitted = false;
  let isValid;
  let responseMessage;
  //creamos una funcion asincrona para enviar los datos al servidor
  async function sendData(formData) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (data.message == "Error") {
      responseMessage = "El usuario o la contraseña no son correctos";
      console.log(responseMessage);
    } else {
      window.location.href = "/dashboard";
    }
  }

  function formSubmit(e) {
    submitted = true;
    isValid = schema.isValidSync(fields);
    if (isValid) {
      const formData = new FormData(e.currentTarget);
      formData.append("username", fields.username);
      formData.append("password", fields.password);
      sendData(formData);
      //   const response = await fetch("/api/login", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   console.log(response);

      //   window.location.href = "/dashboard";
      //   responseMessage = data.message;
    }
  }

  $: invalid = (name) => {
    if (submitted) {
      return isInvalid(schema, name, fields);
    }
    return false;
  };
</script>

{#if responseMessage}
  <p>{responseMessage}</p>
{/if}
<Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted}>
  <div class="form-group">
    <label for="username"> Username o Email </label>
    <input
      type="text"
      id="username"
      name="username"
      bind:value={fields.username}
      class:invalid={invalid("username")}
    />
    <Message name="username" />
  </div>

  <div class="form-group">
    <label for="password"> Password </label>
    <input
      type="password"
      id="password"
      name="password"
      bind:value={fields.password}
      class:invalid={invalid("password")}
    />
    <Message name="password" />
  </div>

  <button type="submit">Send</button>
</Form>

<style>
  .invalid {
    border-color: red !important;
  }
</style>
