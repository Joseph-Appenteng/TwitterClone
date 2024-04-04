// This function fetches the main.json file, parses it as JSON,
// and then calls the buildPosts function with the parsed data.
function loadAndBuildPosts() {
    fetch('js/main.json')
        .then(response => response.json())
        .then(postsData => buildPosts(postsData))
        .catch(error => console.error('Error loading posts:', error));
}

// This function builds HTML elements for each post using the provided data
function buildPosts(postsData) {
    const postContainer = document.querySelector('.post__container');
    postsData.forEach(postData => {
        const post = document.createElement('div');
        post.className = 'post';

        // Extracting data from postData object
        const { avatar, name, username, description, image } = postData;

        // Creating HTML structure for a single post
        post.innerHTML = `
            <div class="post__avatar">
                <img src="${avatar}" alt="">
            </div>
            <div class="post__body">
                <div class="post__header">
                    <div class="post__headerText">
                        <h3>${name}<span class="post__headerSpecial"><i class="fa-solid fa-check-circle"></i><span>@${username}</span></span></h3>
                        <div class="post__headerDescription">
                            <p>${description}</p>
                        </div>
                    </div>
                </div>
                <img src="${image}" alt="">
                <div class="post__footer">
                    <i class="fa-regular fa-comment"></i>
                    <i class="fa-solid fa-repeat"></i>
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-upload"></i>
                </div>
            </div>
        `;

        // Appending the post to the post container
        postContainer.appendChild(post);
    });
}

// This function is called when the sentinel element is intersected
function loadMorePosts(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadAndBuildPosts(); // Load more posts
        }
    });
}

// Options for IntersectionObserver
const options = {
    root: null, // viewport
    rootMargin: '0px', // no margin
    threshold: 0.5 // 50% visibility needed to trigger intersection
};

// Creating an IntersectionObserver to observe the sentinel
const observer = new IntersectionObserver(loadMorePosts, options);

// Creating a sentinel element and appending it to the body
const sentinel = document.createElement('div');
sentinel.style.height = '10px'; // Minimal height, just to make it visible
document.body.appendChild(sentinel);

// Observing the sentinel
observer.observe(sentinel);

// Initial load of posts
loadAndBuildPosts();
