let name = document.querySelector("#name");
let email = document.querySelector("#email");
let img = document.querySelector("#img");
let form = document.querySelector("form");
let btnCreate = document.querySelector("#btnCreate");
let btnCheck = document.querySelector("#btnCheck");
let newContact = document.querySelector(".newContact");
let list = document.querySelector(".contact_List");

let innput = document.querySelectorAll("input");
let count = 0;

createCont();
btnCheck.addEventListener("click", (a) => {
    a.preventDefault();
    count++;
    if (count % 2 == 0) {
        newContact.style.display = "none";
    } else {
        newContact.style.display = "block";
    }
});
btnCreate.addEventListener("click", (a) => {
    a.preventDefault();
    let cont = {
        name: name.value,
        email: email.value,
        img: img.value,
    };
    setContToStorage(cont);
    createCont();
    for (x of innput) {
        x.value = "";
    }
});

function createCont() {
    if (!localStorage.getItem("cont")) {
        localStorage.setItem("cont", JSON.stringify([]));
    }
    list.innerHTML = "";
    let contarr = JSON.parse(localStorage.getItem("cont"));

    contarr.forEach((element, index) => {
        
        //?createContact
        let contact = document.createElement("div");
        contact.classList.add("contact");
        let nameLi = document.createElement("p");
        let emailLi = document.createElement("p");
        let img = document.createElement("img");
        let imgdIv = document.createElement("div");
        let infoDiv = document.createElement("div");
        infoDiv.classList.add("infoDiv");
        imgdIv.classList.add("imgdIv");
        img.src = `${element.img}`;
        nameLi.innerText = `name: ${element.name}`;
        emailLi.innerText = `email: ${element.email}`;

        imgdIv.append(img);
        list.append(contact);
        contact.append(imgdIv);
        contact.append(infoDiv);
        infoDiv.append(nameLi);
        infoDiv.append(emailLi);

        //?del and Up
        let btnDelete = document.createElement("button");
        btnDelete.innerText = "Delete";
        let btndIv = document.createElement("div");
        btndIv.classList.add("btndIv");
        btndIv.append(btnDelete);
        contact.append(btndIv);

        btnDelete.addEventListener("click", () => {
            deleteCont(index);
        });

        let btnUpdate = document.createElement("button");
        btnUpdate.innerText = "Update";
        btnUpdate.addEventListener("click", () => {
            EditCont(index);
        });
        btndIv.append(btnUpdate);
    });
}

function setContToStorage(cont) {
    let contList = JSON.parse(localStorage.getItem("cont")) || [];
    contList.push(cont);
    localStorage.setItem("cont", JSON.stringify(contList));
}

function deleteCont(index) {
    let contList = JSON.parse(localStorage.getItem("cont")) || [];
    contList.splice(index, 1);
    localStorage.setItem("cont", JSON.stringify(contList));
    createCont();
}

let mM = document.querySelector(".main-modal");
let iEdName = document.querySelector(".iEdName");
let iEdMail = document.querySelector(".iEdMail");
let iEdImg = document.querySelector(".iEdImg");
let btnClose = document.querySelector(".btnClose");

function EditCont(index) {
    mM.style.display = "block";
    let contact = JSON.parse(localStorage.getItem("cont"));
    iEdName.setAttribute("id",index);
    iEdMail.setAttribute("id",index);
    iEdImg.setAttribute("id",index);

    iEdName.value = contact[index].name;
    iEdMail.value = contact[index].email;
    iEdImg.value = contact[index].img;
}

let btnSave = document.querySelector(".btnSave");

btnSave.addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
    form.style.display = "block";
    newContact.style.display = "block";
    let cont = JSON.parse(localStorage.getItem("cont"));
    console.log(cont);
    let nameId = iEdName.id;
    let mailId = iEdMail.id;
    let imgId = iEdImg.id;
    if (
        !iEdImg.value.trim() || !iEdMail.value.trim() || !iEdImg.value.trim()
    ) {
        alert("Заполните поля!");
        return;
    }

    let upContact = {
        name: iEdName.value,
        email: iEdMail.value,
        img: iEdImg.value,
    };
    cont.splice(nameId, 1, upContact);
    cont.splice(mailId, 1, upContact);
    cont.splice(imgId, 1, upContact);
    localStorage.setItem("cont", JSON.stringify(cont));
    mM.style.display = "none";
    createCont();
});

btnClose.addEventListener("click", () => {
    form.style.display = "block";
    newContact.style.display = "block";
    mM.style.display = "none";
});