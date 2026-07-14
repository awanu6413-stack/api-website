let div = document.getElementById('getdiv');
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');

const API_KEY = '0b679f6c2e014681b301310e1fc5ea25';

// Inline SVG placeholder - no network request needed, so it can never fail
const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250">
<rect width="100%" height="100%" fill="#cccccc"/>
<text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666666" text-anchor="middle" dominant-baseline="middle">No Image</text>
</svg>
`);

function getNews(query){

    div.innerHTML = `<p style="padding:20px;">Loading...</p>`;

    fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=popularity&apiKey=${API_KEY}`)
    .then(data => data.json())
    .then(data => {

        div.innerHTML = "";

        if(!data.articles || data.articles.length === 0){
            div.innerHTML = `<p style="padding:20px;">No news found for "${query}".</p>`;
            return;
        }

        for(let i = 0; i < data.articles.length; i++){

            let article = data.articles[i];

            div.innerHTML += `
            <div class="card">
                <img src="${article.urlToImage || PLACEHOLDER_IMG}" onerror="this.src='${PLACEHOLDER_IMG}'">
                <div class="card-body">
                    <h2 class="card-title">
                    ${article.title}
                    </h2>
                    <p class="card-text">
                    ${article.description || "No description available."}
                    </p>
                    <a class="btn-custom"
                    href="${article.url}"
                    target="_blank">
                    Read More
                    </a>
                </div>
            </div>`;
        }
    })
    .catch(err => {
        console.log(err);
        div.innerHTML = `<p style="padding:20px;">Something went wrong. Please try again.</p>`;
    });
}

// Load default FIFA news on page load
getNews('fifa');

// Search button click
searchBtn.addEventListener('click', () => {
    let query = searchInput.value.trim();
    getNews(query || 'fifa');
});

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        let query = searchInput.value.trim();
        getNews(query || 'fifa');
    }
});
