import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { getPosts } from "../api.js";
import { renderAllPosts } from "./post-component.js";

export async function renderPostsUserPageComponent({ appEl, posts }) {
  const postHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                  <ul class="posts">
                  </ul>
              </div>
              `;

  appEl.innerHTML = postHtml;
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
  renderAllPosts({
    posts,
    element: document.querySelector(".posts"),
  });

  // function timing(date) {
  //   const now = formatDistanceToNow(new Date());
  //   const secondAgo = Math.floor((now - date) / 1000);
  //   if (secondAgo < 60) {
  //     return `${secondAgo} секунд${secondAgo === 1 ? "у" : "ы"} назад`;
  //   } else if (secondAgo < 3600) {
  //     const minutesAgo = Math.floor(secondAgo / 60);
  //     return `${minutesAgo} минут${minutesAgo === 1 ? "у" : "ы"} назад`;
  //   } else if (secondAgo < 86400) {
  //     const hoursAgo = Math.floor(secondAgo / 3600);
  //     return `${hoursAgo} час${hoursAgo === 1 ? "а" : "ов"} назад`;
  //   } else {
  //     const daysAgo = Math.floor(secondAgo / 86400);
  //     return `${daysAgo} дн${daysAgo === 1 ? "ь" : "ей"} назад`;
  //   }
  // }

  async function userHeaderListener() {
    const userHeaders = document.querySelectorAll(".post-header");
    userHeaders.forEach((userEl) => {
      userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, {
          userId: userEl.dataset.userId,
        });
      });
    });
  }
}
