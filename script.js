//alert("hello")

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const page = body.dataset.page;
    switch (page) {
        case 'overview':
            getData();
            break;
        case 'index':
            getCategories()
            break;
        case 'detail':
            getDetail()
            break;
    }
})

function getUrlVars() {
    const vars = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

const capitalize = (str) => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const lowercase = (str) => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toLowerCase() + str.slice(1)
}

function getDetail() {
    const url = 'http://saravlckova.com/wordpress/wp-json/wp/v2/events';
    fetch(url)
    .then(response => response.json())
    .then(showDetail)
}

function getCategories() {
    const url = 'http://saravlckova.com/wordpress/wp-json/wp/v2/categories';
    fetch(url)
    .then(response => response.json())
    .then(handleCategories);
}

function getData(category) {
    const url = 'http://saravlckova.com/wordpress/wp-json/wp/v2/events';
    fetch(url)
    .then(response => response.json())
    .then(handleData)
}

function showDetail(data) {
    const filter = getUrlParam('id', '');

    data.forEach((event) => {
        if (event.id != filter) {
            return;
        }
        console.log(event);
        const detail = document.querySelector('.detail_container');

        // Clone template
        const template = document.querySelector('#eventDetail').content;
        const clone = template.cloneNode(true);

        // Select child nodes 
        const article = clone.querySelector('article');
        const title = clone.querySelector('h3')
        const img  = clone.querySelector('.detail-img')
        const text = clone.querySelector('p')
        const time = clone.querySelector('.detail-time')
        const price = clone.querySelector('.detail-price')

        article.setAttribute('data-id', `${event.id}`)
        const imgNode  = document.createRange().createContextualFragment(event.image)
        // console.log(event.image)
        // Insert data from json
        title.textContent = event.title.rendered;
        img.appendChild(imgNode);
       // content.textContent = event.text;
        time.textContent = event.time;
        price.textContent = event.price + ' kr';

        // Append clone
        detail.appendChild(clone)
        
    })
}

function handleCategories(categories) {
    const select = document.querySelector('#categoriesSelect');
    categories.forEach((cat) => {
        if (cat.slug === 'uncategorized' || cat.count <= 0) {
            return;
        }
        const option = document.createElement('OPTION');
        option.setAttribute('value', `${cat.id}`)
        const value = document.createTextNode(`${capitalize(cat.name)}`)
        option.appendChild(value);
        select.appendChild(option)
    })
}

function handleData(myData){
    const filter = getUrlParam('categories', '');
    // console.log(filter);
    
    myData.forEach((event) => {
        // console.log(event.categories[0]);
        
        if (event.categories[0] != filter) {
            return
        }
    
        // Select parent
        const parent = document.querySelector('.event_container');

        // Clone template
        const template = document.querySelector('#eventTemplate').content;
        const clone = template.cloneNode(true);

        // Select child nodes 
        const article = clone.querySelector('article');
        const title = clone.querySelector('h3')
        const img  = clone.querySelector('.event-img')
        const content = clone.querySelector('p')
        const time = clone.querySelector('.event-time')
        const price = clone.querySelector('.event-price')

        article.setAttribute('data-id', `${event.id}`)
        const imgNode  = document.createRange().createContextualFragment(event.image)
        // console.log(event.image)
        // Insert data from json
        title.textContent = event.title.rendered;
        img.appendChild(imgNode)
       // content.textContent = event.text;
        time.textContent = event.time;
        price.textContent = event.price + ' kr';

        // Append clone
        parent.appendChild(clone);
    });
}
    
    
    
const button = document.getElementById('burger');

button.addEventListener('click', () => {
    const div = document.getElementById('drop-nav');
    if (div.style.display === 'none' || div.style.display === '') {
        div.style.display = 'block'
    } else {
        div.style.display = 'none'
    }
});

function seeDetail(target) {
    const article = target.parentElement.parentElement
    console.log(article.dataset.id);
    window.history.pushState({}, document.title, "/" + `detail.html?id=${article.dataset.id}`)
    window.location.reload()
}

function goBack() {
    window.history.back()
    setTimeout(() => {
        window.location.reload()
    }, 300)
}
    


 /*const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;

//3. textcontent & innerHTML
const h1 = postCopy.querySelector("h1");
h1.textContent=post.title.rendered;

const img = postCopy.querySelector("img.cover");

img.setAttribute("src", imgPath)
img.setAttribute("alt", "Cover of the book " + post.title.rendered)

const a = postCopy.querySelector("a");
a.href="sub.html?id="+post.id

const content = postCopy.querySelector("section");
content.innerHTML=post.content.rendered;

const publisher = postCopy.querySelector(".publisher");
publisher.innerHTML=post.publisher;

//4 append
document.querySelector("#posts").appendChild(postCopy)*/

/*function getNavigation(){
  fetch("http://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/categories?per_page=100")
    .then(res=>res.json())
    .then(data=>{
      //console.log(data)
      data.forEach(addLink)
    })
}*/