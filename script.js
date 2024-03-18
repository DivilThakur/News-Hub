const Apikey = "66877e95d44d415f9a6c601dbe1d26ad";
const Url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load",()=>FetchNews("india"));


function Reload()
{
    window.location.reload();
}

async function FetchNews(query)
{
    const res = await fetch(`${Url}${query}&apiKey=${Apikey}`);
    const data =await res.json();
    SetData(data.articles);
}



function SetData(articles)
{
    const CardsContainer = document.getElementById("Cards-Container");
    const NewsCard = document.getElementById("News-Cards");

    CardsContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return 0;
        if(!article.description) return;
        const CloneCards = NewsCard.content.cloneNode(true);
        FillData(CloneCards,article);
        CardsContainer.appendChild(CloneCards);
    });
}



function FillData(CloneCards,article)
{
    const Newsimg = CloneCards.getElementById("News-Img")
    const Newstitle = CloneCards.getElementById("News-Title")
    const Newssource = CloneCards.getElementById("News-Source")
    const Newsdesc = CloneCards.getElementById("News-Desc")

    Newsimg.src = article.urlToImage;
    Newstitle.innerText = article.title;
    Newsdesc.innerText = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    Newssource.innerText = `${article.source.name} • ${date}`;
    CloneCards.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}


let currselected = null
function navitem(id)
{
    FetchNews(id);
    const navItem = document.getElementById(id);
    currselected?.classList.remove("active");
    currselected = navItem;
    currselected.classList.add("active");
}



const Search = document.querySelector("#Search-Bar")
const Search_btn = document.querySelector("#Search-Btn")

Search_btn.addEventListener("click",()=>{
    const query = Search.value;
    if(!query) return;
    FetchNews(query);
    currselected?.classList.remove("active");
    currselected = null;

})