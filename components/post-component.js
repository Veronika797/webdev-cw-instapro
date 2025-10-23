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
                      <button data-post-id="${post.id}" class="like-button">
                        <img src="${
                          post.isLiked
                            ? "./assets/image/like-active.svg"
                            : "./assets/images/like-not-active.svg"
                        }">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                     ${post.description}
                    </p>
                    <p class="post-date">
                      ${post.createdAt}
                    </p>
                  </li>
                 `;

    element.innerHTML += postHtml;
  });
}
