// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = ":veronika-milya";
const baseHost = "https://webdev-hw-api.vercel.app";
// const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
// https://wedev-api.sky.pro/api/v1/prod/instapro

export async function getPostsUser(id) {
  const response = await fetch(
    "https://wedev-api.sky.pro/api/v1/prod/instapro/user-posts/" + id
  );
  const data = await response.json();
  return data.posts;
}

export async function getPosts({ token }) {
  const response = await fetch(
    "https://wedev-api.sky.pro/api/v1/prod/instapro",
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  if (response.status === 401) {
    throw new Error("Нет авторизации");
  }
  const data = await response.json();
  return data.posts;
}

export async function createPost({ token, imageUrl, description }) {
  const response = await fetch(
    "https://wedev-api.sky.pro/api/v1/prod/instapro",
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        description,
        imageUrl,
      }),
    }
  );
  if (response.status != 201) {
    throw new Error("Не удалось добавить пост");
  }
  return await response.json();
}

export async function registerUser({ login, password, name, imageUrl }) {
  const response = await fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  });
  if (response.status === 400) {
    throw new Error("Такой пользователь уже существует");
  }
  return await response.json();
}

export async function loginUser({ login, password }) {
  const response = await fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });
  if (response.status === 400) {
    throw new Error("Неверный логин или пароль");
  }
  return await response.json();
}

// Загружает картинку в облако, возвращает url загруженной картинки
export async function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  const response = await fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  });
  return await response.json();
}
