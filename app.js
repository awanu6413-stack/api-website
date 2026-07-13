let div = document.getElementById('getdiv')

fetch('https://newsapi.org/v2/everything?q=fifa&from=2026-06-13&sortBy=publishedAt&apiKey=0b679f6c2e014681b301310e1fc5ea25')
.then(data => data.json())
.then(data => {

    for(i = 0 ; i < data.articles.length ; i++){
        div.innerHTML += `
      <div class="card">
    
<img src="${data.articles[i].urlToImage}">
<div class="card-body">
<h2 class="card-title">
${data.articles[i].title}
</h2>
<p class="card-text">
${data.articles[i].description || "No description available."}
</p>
<a class="btn-custom"
href="${data.articles[i].url}"
target="_blank">
Read More
</a>

</div>

</div>`
    }
}
 )
.catch(err => console.log(err))
