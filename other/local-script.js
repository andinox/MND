//global variable
let data;
let temps_tags = [];

document.getElementById('up').addEventListener("click", function() {
    main = document.getElementById('main');
    main.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
})

String.prototype.allspace = function() {
    let nb = 0;
    for (let i = 0; i < this.length; i++) nb+= this[i] == ' ' ? 1 : 0;
    return nb == this.length;
}

Array.prototype.combine = function() {
    let all = "";
    for (let i = 0; i < this.length; i++) all += String(this[i]).toUpperCase() +" ";
    return all;
}

window.addEventListener('load', async function() {
    await getText();
    const url = new URLSearchParams(window.location.search);
    start(url.get("poll"))
})


String.prototype.splice = function(idx, rem, str) {
    if (this.length < 4) {
        return this;
    }
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const search = document.getElementById('addbottom');
search.addEventListener('click', function() {
    let input = document.getElementById('tagsearch');
    let value = input.value;
    if (value == '') {
        return;
    } else if (value.allspace()) {
        return;
    }
    updatetags("add",value);
    croix = `${value} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
    input.value = "";
    div = document.createElement('div');
    div.setAttribute('id','tag');
    div.innerHTML = croix;
    div.setAttribute("data-name",value);
    div.addEventListener('click', function() {
        deltags(this);
        updatetags("del",this.dataset.name);
    })
    bar = document.getElementById('allbar');
    bar.appendChild(div);

})




function updatetags(type,name) {
    name = name.toUpperCase();
    switch (type) {
        case "del":
            elements = document.querySelectorAll(`.element:not([data-tags*="${name}"])`);
            elements.forEach(element => {
                element.classList.remove("none");
            });
            break;
        case "add":
            elements = document.querySelectorAll(`.element:not([data-tags*="${name}"])`);
            elements.forEach(element => {
                element.classList.add("none");
            });        
    }
    updatedate();
}

function updatedate() {
    let allinmain = document.querySelectorAll('.main > *');
    for (let i = 0; i < allinmain.length; i++) {
        console.log(allinmain[i].getAttribute("id"));
        if (allinmain[i].getAttribute("id") == "date") {
            a = i+1;
            while(allinmain[a].classList.contains('none') && allinmain[a+1] != undefined) {
                a++;
            }
            if (allinmain[a].getAttribute("id") == "date" || a+1 == allinmain.length) {
                allinmain[i].style.display = "none";
            } else {
                allinmain[i].style.display = "flex";
            }
        }
    }
}

function deltags(event) {
    event.remove();
}


function short(data)  {
    let copy_data = data;
    let len = copy_data.length;
    let temp_data = [];
    let final_data = [];
    for (let i = 0; i < data.length; i++) {
        max = {"lore" : [0]};
        len = copy_data.length;
        for (let u = 0; u < len ; u++) {
            if (max.lore[0] < copy_data[u].lore[0]) {
                temp_data.push(max)
                max = copy_data[u];
            } else {
                temp_data.push(copy_data[u])
            }
        }
        final_data.push(max);
        copy_data = temp_data;
        temp_data = [];
    }
    return final_data;
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
    const cobal = short(data['Publications']);
    main = document.getElementById('main');
    let temp_date = null;
    for (let i = 0; i < cobal.length; i++) {
        if (temp_date != cobal[i].lore[0]) {
           let dib = document.createElement('div');
           dib.setAttribute('id','date');

           let pdate = document.createElement('h1');
           pdate.innerHTML = cobal[i].lore[0];
           dib.appendChild(pdate);
           main.appendChild(dib);
           temp_date = cobal[i].lore[0];
        } 
        let element = document.createElement('div');
        element.classList.add('element');
        element.setAttribute('data-tags',cobal[i].lore.combine());

        let titre = document.createElement('h1');
        titre.innerHTML = cobal[i]["title"];

        let lore = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('src',cobal[i].localname);
        let p = document.createElement('p');
        if  (cobal[i].more != "") {
            p.innerHTML =  `${cobal[i].desciption} <i id="info" onclick="location.href='${cobal[i].more}'" class="bi bi-info-square-fill"></i>`;
        } else {
            p.innerHTML = cobal[i].desciption;
        }
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

