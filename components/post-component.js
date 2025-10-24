// import { formatDistanceToNow } from "date-fns";
// import { ru } from "date-fns/locale";
import { getToken, goToPage } from "../index.js";
import { deletePost, addLike, disLike } from "../api.js";
import { renderPostsPageComponent } from "./posts-page-component.js";
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderLikeButton } from "./post-like-button.js";

export function renderAllPosts({ posts, element }) {
  posts.forEach((post) => {
    const postHtml = `
                  <li class="post">
                    <div class="post-header" data-user-id=${post.user.id}>
                        <img src="${
                          post.user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                     
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                     ${post.description}
                    </p>
                    <p class="post-date">
                       ${post.createdAt} назад
                    </p>
                    <button data-post-id="${post.id}" class="delete-button">Удалить</button>
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
      deletePost({ token: getToken(), id });
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
