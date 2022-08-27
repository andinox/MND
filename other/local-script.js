//global variable
let data;


window.addEventListener('load', async function() {
    await getText();
    const url = new URLSearchParams(window.location.search);
    start(url.get("poll"))
})


const search = document.getElementById('addbottom');
search.addEventListener('click', function() {
    let input = document.getElementById('tagsearch');
    let value = input.value;
    if (value == '') {
        return;
    }
    croix = `${value} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
    input.value = "";
    div = document.createElement('div');
    div.setAttribute('id','tag');
    div.innerHTML = croix;
    div.addEventListener('click', function() {
        deltags(this)
    })
    bar = document.getElementById('allbar');
    bar.appendChild(div);



})


function deltags(event) {
    event.remove();
}


function start(classtype) {    
    const header = document.getElementById('head');
    let h1 =  document.createElement('h1');
    h1.innerHTML = classtype.toUpperCase();
    header.appendChild(h1)
    switch(classtype) {
        case 'Video':
            video();
            break;
        case 'Collaborators':
            colab();
            break;
        case 'Publications':
            publication();
            break;
        default:
            location.href = './error404.html'
            
    }
}

function colab() {
    //pass
}


function publication() {
    const cobal = data['Collaborators'];
    console.log(cobal)
    main = document.getElementById('main');
    for (let i = 0; i < cobal.length; i++) {
        let element = document.createElement('div');
        element.classList.add('element');

        let titre = document.createElement('h1');
        titre.innerHTML = cobal[i]["title"];

        let lore = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('src',cobal[i].localname);
        let p = document.createElement('p');
        p.innerHTML = cobal[i].desciption;
        lore.appendChild(img);
        lore.appendChild(p);

        let section = document.createElement('section');
        section.classList.add('tags');

        for (let o = 0; o < cobal[i].lore.length; o++) {
            let divtag = document.createElement('div');
            divtag.innerHTML = cobal[i].lore[o];
            section.appendChild(divtag);
        }

        element.appendChild(titre);
        element.appendChild(lore);
        element.appendChild(section);
        
        main.appendChild(element);
    }
}


function video() {
    const video = data["Video"];
    console.log(video)
    for (let i = 0; i < video.length; i++) {
        let elementvideo = document.createElement('div'); //<-- main
        elementvideo.classList.add('elementvideo')

        let lore = document.createElement('div'); //lore container
        let h1 = document.createElement('h1'); //title
        h1.classList.add('title');
        h1.innerHTML = data["Video"][i].title;
        let p = document.createElement('p'); //description
        p.innerHTML = data["Video"][i].desciption; 

        let video = document.createElement('video'); //video
        video.setAttribute('id','videoembed');
        video.setAttribute('controls',"");

        let source = document.createElement('source');
        source.setAttribute('src', data["Video"][i]["localname"])
        source.setAttribute('type', "video/mp4")
        source.innerHTML = "Sorry, your browser doesn't support embedded videos. "

        lore.appendChild(h1);
        lore.appendChild(p);

        video.appendChild(source);

        elementvideo.appendChild(lore);
        elementvideo.appendChild(video);

        main.appendChild(elementvideo);
    }
}



async function getText() {
    await fetch("./data.json")
    .then(response => response.json())
    .then(response => data = response)
    .catch(error => alert("Erreur : " + error));
}

