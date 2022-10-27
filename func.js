

const createCard = (data, parent, arr, api) => {
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
    card.addEventListener("click", function(e) {


        pickedCard = e.currentTarget;
        console.log(pickedCard)
        showPopup(arr, "card", data.age, data.img_link, data.name, data.description, pickedCard, api);
    });
    parent.append(card);
    
    
}
var catId

// ---------------------------------------------------------------------- ПОПАП ---------------------------------------------------------------------------

const showPopup = (list, type, catAge, catPic, catName, content, pickedCard) => {
    let el = list.filter(el => el.dataset.type === type)[0];
    // console.log(id)
    if (type === "card") {
        catId = pickedCard.getAttribute("data-id");
        el.classList.add("main")
        console.log(pickedCard)
       
        
        let card = document.createElement("div")
        card.classList.add("main");
        el.append(card)

        let descr = document.createElement("div")
        descr.innerText = content

        let name = document.createElement("div")
        name.innerText =  catName

        let age = document.createElement("div")
        age.innerText =  catAge

        let rate = document.createElement("div")
        rate.innerHTML =  "<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>";

        let pic = document.createElement("div")
        pic.style.backgroundImage = `url(${catPic})`;
        pic.style.width = "200px"
        pic.style.height = "200px"

        card.append(pic, age, rate, name, descr)

        // let btnUpd = document.querySelector(".btnUpd");
        
        // btnUpd.addEventListener("click", (e) => {
        //         let catsList = localStorage.getItem("cats");
        //         if (catsList) {
        //             catsList = JSON.parse(catsList);
        //         }
        //         let el = list.filter(el => el.dataset.type === type)[0];
        //         let updForm = document.forms.upd;
        //         updForm.classList.add("formActive");
        //         el.lastElementChild.remove();
        //         console.log(catId)
                
                // updForm.addEventListener("submit", (e) => {
                    
                //     e.preventDefault();
                //    console.log(e.target)
                //     let body = {}
                //     let index;
                //     let newCat;
                //     console.log()
                //     for (let i = 0; i < e.target.elements.length; i++) {
                //         let el = e.target.elements[i]; // e.target - this сама форма, el это инпуты, form.elements хранит инпутыи др важные элементы формы для обработки без дивов 
                //         // console.log(el);
                //         if (el.name) {
                //             if (el.type === "checkbox") {
                //                 body[el.name] = el.checked;
                //             } else if (el.value) {
                //                 body[el.name] = el.value;
                //             }
                //         }
                //         console.log(body, catsList);
                //     }

                //     for (let j =0; j < catsList.length; j++) {
                //         if (catsList[j].id === +catId) {
                //             index = catsList.indexOf(catsList[j]);
                //             newCat = {...catsList[j], ...body}
                //             // console.log(newCat);
                        
                //         }
                        
                //     }
                //     console.log(newCat, +catId);

                //     api.updCat(+catId, body)
                //         .then(res => res.json())
                //         .then(data => {
                //             console.log(data.message);
                //             location.reload();
                //             if (data.message === "ok") {
                //                 catsList.splice(index, 1, newCat);
                //                 console.log(catsList);
                //                 localStorage.setItem("cats", JSON.stringify(catsList));
                //                 location.reload();
                //             }
                //     })

                    
                // })
            // });
            
            
      
        // console.log(btnUpd)
        
       
    }
    
    el.classList.add("active");
    el.parentElement.classList.add("active");
   
}

// ---------------------------------------------------------------------------- ИЗМЕНЕНИЕ КОТА -----------------------------------------------------------------------------

const updCat = (list, api, type, catId, catsList) => {
                // console.log(list)
                let el = list.filter(el => el.dataset.type === type)[0];
                let updForm = document.forms.upd;
                updForm.classList.add("formActive");
                el.lastElementChild.remove();
                // console.log(catId)

                updForm.addEventListener("submit", (e) => {
                        
                e.preventDefault();
                console.log(e.target, "xxxx")
                let body = {}
                let index;
                let newCat;
                // console.log()
                for (let i = 0; i < e.target.elements.length; i++) {
                    let el = e.target.elements[i]; // e.target - this сама форма, el это инпуты, form.elements хранит инпутыи др важные элементы формы для обработки без дивов 
                    // console.log(el);
                    if (el.name) {
                        if (el.type === "checkbox") {
                            body[el.name] = el.checked;
                        } else if (el.value) {
                            body[el.name] = el.value;
                        }
                    }
                    // console.log(body, catsList);
                }

                for (let j =0; j < catsList.length; j++) {
                    if (catsList[j].id === +catId) {
                        console.log(typeof(catsList[j].id), typeof(+catId))
                        index = catsList.indexOf(catsList[j]);
                        // console.log(index)
                        newCat = {...catsList[j], ...body}
                        // console.log(newCat);
                    
                    }
                    
                }
                console.log(newCat, +catId);

                api.updCat(+catId, body)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data.message, index);
                    
                        if (data.message === "ok") {
                            catsList.splice(index, 1, newCat);
                            console.log(catsList);
                            localStorage.setItem("cats", JSON.stringify(catsList));
                            location.reload();
                        }
                })

                
            })
}

// ---------------------------------------------------------- ДОБАВЛЕНИЕ КОТА ------------------------------------------------------------------

const addCat = (e, api, popupList, store) => {
    e.preventDefault();
    let body = {}; // хранит тело запроса {name: "Vasya"\, id: 1, ...}
    for (let i = 0; i < e.target.elements.length; i++) {
        let el = e.target.elements[i]; // e.target - this сама форма, el это инпуты, form.elements хранит инпутыи др важные элементы формы для обработки без дивов 
        // console.log(el);
        if (el.name) {
            if (el.type === "checkbox") {
                body[el.name] = el.checked;
            } else if (el.value) {
                body[el.name] = el.value;
            }
        }
    }
    // console.log(body, "xxxxxxxxxxxxx");
    api.addCat(body)
        .then(res => res.json())
        .then(data => {
            // console.log(data.message);
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

// ------------------------------------------------- УДАЛЕНИЕ КОТА --------------------------------------------------------------------

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
    
// const updCat = (e) => {
//     // console.log(e);
//     let body = {};
//     let updBlock = document.querySelector(".change");
//     updBlock.classList.add("active");
//     document.querySelector(".content").innerText = updBlock.value;
    
//     // catsList.forEach(cat => {
//     //     cat.description = updBlock.value
//     // });
// }

const filterCat = (e, catsList) => {

    catsList.filter(a-b)
}