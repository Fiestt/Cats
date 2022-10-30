import Api from "./api.js"; // ./ - указатель на текущую папку, ../ - выход на 2 уровня вверх

let user = document.cookie;
// console.log("u", user);
if (!user) {
    user = prompt("Пользователь не найден, укажите имя пользователя", "Fiestt2");
    document.cookie = `user=${user}`;
} else {
    user = user.split("=")[1];
}

const api = new Api(user);

// "user = Fiestt2; goods=apple,orange; data = 2022-10-11" -- неудобно, много вычлинять сплитом, малое количество информации (примерно 20 слов)
// localstorage то же что и кука, но лучше, хранит до 5Мбайт, не особо безопасен от хакерских атак,



const container = document.querySelector(".container");
const btnAdd = document.querySelector(".btnAdd");
const popupList = document.querySelectorAll(".popup");
const popBox = document.querySelector(".popup-wrapper");

const btnDel = document.querySelector(".btnDel");
const btnUpd = document.querySelector(".btnUpd");
const btnFilt = document.querySelector(".btnFilter");
let updForm = document.forms.upd;

let catsList = localStorage.getItem("cats");
if (catsList) {
    catsList = JSON.parse(catsList);
}
// console.log(catsList);

const addForm = document.forms.add; //document.forms. -- массив с формамиб .add - айди

addForm.addEventListener("submit", function(e) {
    addCat(e, api, Array.from(popupList), catsList);
});

btnDel.addEventListener("click", function (e) {
    delCat(catsList, api);
})



if (!catsList) {
    api.getCats()
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.message === "ok") {
                localStorage.setItem("cats", JSON.stringify(data.data));
                data.data.forEach(cat => {
                    createCard(cat, container, Array.from(popupList), api);
                });
            } else {
                showPopup(Array.from(popupList), "info", data.message);
            }
            // showPopup(Array.from(popupList), "info", data.message);
        });

} else {
    catsList.forEach(cat => {
        createCard(cat, container, Array.from(popupList));
    });
}


popupList.forEach(p => {
    p.firstElementChild.addEventListener("click", e => {
        p.classList.remove("active");
        p.removeAttribute("style")
        popBox.classList.remove("active");
        p.classList.remove("main");
        p.lastElementChild.classList.remove("formActive");
        p.firstElementChild.nextElementSibling.classList.remove("upd")
        document.querySelector(".pickedCard").remove()
    });
});

btnAdd.addEventListener("click", e => {
    showPopup(Array.from(popupList), "add");
});

popBox.addEventListener("click", function(e) {
    if (e.target === this) {
        popBox.classList.remove("active");
        popupList.forEach(p => {
            if (p.classList.contains("active") && p.classList.contains("main") ) {
                p.classList.remove("active");
                p.classList.remove("main");
                p.removeAttribute("style")
                p.firstElementChild.nextElementSibling.classList.remove("upd")
                p.lastElementChild.classList.remove("formActive");
                document.querySelector(".pickedCard").remove()
            } else {
                p.classList.remove("active")
            }
        })
    }
});

window.addEventListener ("click", function(e) {
    let classList = document.querySelectorAll(".card");
    // console.log(classList, e.target) 
    Array.from(classList).forEach(card => {
        if (card.classList.contains("anim") && e.target != btnDel) {
            card.classList.remove("anim");
            card.classList.remove("delCard");
            card.classList.add("effects");
            let closeBtn = document.querySelectorAll(".closeBtn");
            closeBtn.forEach(btn => btn.remove())

        }
    })
})


let pickedCard;
        
btnUpd.addEventListener("click", function() {
    // alert(catId)
    updCat(Array.from(popupList), api, "card", catId, catsList);
})