import { getToken, goToPage } from "../index.js";
import { deletePost } from "../api.js";
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderLikeButton } from "./post-like-button.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

function escapeHtml(str) {
  if (!str) return str;
  return str.replace(
    /[&<>'"]/g,
    (match) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&apos;",
        '"': "&quot;",
      })[match]
  );
}

export function renderAllPosts({ posts, element }) {
  posts.forEach((post) => {
    let postHtml = `
      <li class="post">
        <div class="post-header" data-user-id=${post.user.id}>
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${escapeHtml(post.user.name)}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          
        </div>
        <p class="post-text">
          <span class="user-name">${escapeHtml(post.user.name)}</span>
          ${escapeHtml(post.description)}
        </p>
        <p class="post-date">
            ${formatDistanceToNow(new Date(post.createdAt), { locale: ru })} назад
        </p>
    <button data-post-id="${post.id}" class="delete-button">
      Удалить
    </button>
     </li>
      `;

    element.innerHTML += postHtml;
  });
  buttonsDeletePost();
  buttonsLikePost({ posts });
  buttonUserPosts();
}

function buttonUserPosts() {
  const postsHeaders = document.querySelectorAll(".post-header");
  postsHeaders.forEach((postHeader) => {
    postHeader.addEventListener("click", () => {
      const id = postHeader.dataset.userId;
      goToPage(USER_POSTS_PAGE, id);
    });
  });
}

function buttonsDeletePost() {
  const buttons = document.querySelectorAll(".delete-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.postId;
      deletePost({ token: getToken(), id })
        .then(() => {
          goToPage(POSTS_PAGE);
        })
        .catch((error) => {
          console.error("Ошибка удаления поста:", error);
        });
      if (post.user.id === currentUserId) {
        postHtml += `
    <button data-post-id="${post.id}" class="delete-button">
      Удалить
    </button>
  `;
      } else {
        postHtml += `
 </li>
`;
      }
    });
  });
}

function buttonsLikePost({ posts }) {
  const postsAll = document.querySelectorAll(".post");

  postsAll.forEach((post, index) => {
    renderLikeButton({
      element: post.querySelector(".post-likes"),
      post,
      id: posts[index].id,
      length: posts[index].likes.length,
      isLiked: posts[index].isLiked,
    });
  });
}
