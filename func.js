
const createCard = (data, parent, arr) => {
    const card = document.createElement("div");
    card.className = "card";
    // card.setAttribute("data-id", data.id);
    card.dataset.id = data.id;

    const age = document.createElement("div");
    age.className = "age";
    age.innerText = data.age || "Возраст не известен";

    const rate = document.createElement("div");
    rate.className = "rate";
    rate.innerHTML = "<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>";

    const pic = document.createElement("div");
    pic.className = "pic";
    pic.style.backgroundImage = `url(${data.img_link || "sun.png"})`;

    const name = document.createElement("div");
    name.className = "name";
    name.innerText = data.name;

    card.append(pic, age, rate, name);
    card.addEventListener("click", function() {
        showPopup(arr, "card", data.description);
    });
    parent.append(card);
}

const showPopup = (list, type, content) => {
    let el = list.filter(el => el.dataset.type === type)[0];
    // switch (type) {
    //     case "card": 
    //     case "info":
    //     case "form":
    // }
    el.classList.add("active");
    el.parentElement.classList.add("active");
    if (type === "card") {el.lastElementChild.innerText = content};
   
}

const addCat = (e, api, popupList, store) => {
    e.preventDefault();
    let body = {}; // хранит тело запроса {name: "Vasya"\, id: 1, ...}
    for (let i = 0; i < e.target.elements.length; i++) {
        let el = e.target.elements[i]; // e.target - this сама форма, el это инпуты, form.elements хранит инпутыи др важные элементы формы для обработки без дивов 
        console.log(el);
        if (el.name) {
            if (el.type === "checkbox") {
                body[el.name] = el.checked;
            } else if (el.value) {
                body[el.name] = el.value;
            }
        }
    }
    console.log(body, "xxxxxxxxxxxxx");
    api.addCat(body)
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            if (data.message === "ok") {
                // localStorage.setItem("cat",JSON.stringify(body))
                createCard(body, document.querySelector(".container"));
                store.push(body);
                localStorage.setItem("cats", JSON.stringify(store));
                e.target.reset();
                document.querySelector(".popup-wrapper").classList.remove("active");
                location.reload();
            }
            // showPopup(popupList, "info", data.message);
        })
}

// ------------- Также рабочий вариант удаления---------------
// const delCat = (catsList, api) => {
//     let id;
//     let index;

//     let catName = prompt ("Какого кота убрать?");
//     catsList.forEach(cat => {
//         if (cat.name === catName) {
//             index = catsList.indexOf(cat);
//             id = cat.id;
//             console.log(id, index);
//         }
//     });

//     api.delCat(id)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data.message);
//             if (data.message === "ok") {
//                  catsList.splice(index, 1);
//                  console.log(catsList);
//                 localStorage.setItem("cats", JSON.stringify(catsList));
//                 location.reload();
//             }
//         })

// }

const delCat = (catsList, api) => {
    let catId;
    let index;

    let cardList = document.querySelectorAll(".card");
    for (let i =0; i < cardList.length; i++) {
    
        cardList[i].classList.add("anim");
        let closeBtn = document.createElement("button");
        closeBtn.innerText = "🗙";
        closeBtn.classList.add("closeBtn");
        closeBtn.setAttribute("type", "button");
        let main = document.querySelector("main");
        cardList[i].append(closeBtn);

        closeBtn.addEventListener ("click", (e) => {
            e.stopPropagation()
            // console.log (e.target);
            catId = e.target.parentElement.getAttribute("data-id");
            // console.log(catId);
            let catsList = localStorage.getItem("cats");
            if (catsList) {
                catsList = JSON.parse(catsList);
            };
            // console.log(catsList)
            
            for (let j =0; j < catsList.length; j++) {
                if (catsList[j].id === +catId) {
                    index = catsList.indexOf(catsList[j]);;
                }
            }
            
            api.delCat(catId)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.message);
                    if (data.message === "ok") {
                        catsList.splice(index, 1);
                        console.log(catsList);
                        localStorage.setItem("cats", JSON.stringify(catsList));
                        location.reload();
                    }
            })
           
        })
        
    }
    
}
    
const updCat = (e) => {
    console.log(e);
    let body = {};
    let updBlock = document.querySelector(".change");
    updBlock.classList.add("active");
    document.querySelector(".content").innerText = updBlock.value;
    
    // catsList.forEach(cat => {
    //     cat.description = updBlock.value
    // });
}

const filterCat = (e, catsList) => {

    catsList.filter(a-b)
}