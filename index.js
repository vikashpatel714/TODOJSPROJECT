let data = [];
let itemCount = 1;
const cards = document.getElementById("cards");
const cardDetail = document.getElementById("card-detail");
const cardDetailTitle = document.getElementById("card-m-title");

const m = () => {
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";

  for (const el of openEls) {
    el.addEventListener("click", function () {
      const mId = this.dataset.open;
      document.getElementById(mId).classList.add(isVisible);
    });
  }

  for (const el of closeEls) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(
        isVisible
      );
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".m.is-visible")) {
      document.querySelector(".m.is-visible").classList.remove(isVisible);
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape" && document.querySelector(".m.is-visible")) {
      document.querySelector(".m.is-visible").classList.remove(isVisible);
    }
  });
};

let acceptData = () => {
  let cardTitle = document.getElementById("list-title").value;
  cardTitle = (cardTitle[0].toUpperCase() + cardTitle.substring(1)).trim();
  data.push({
    id: Date.now(),
    name: cardTitle,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

  location.reload();
  location.reload();
  resetValue(cardTitle);
};

const resetValue = (param) => {
  param.value = "";
};

let createCards = () => {
  data.map((x, y) => {
    return (cards.innerHTML += `<div id=${y} class="card">
        <span class="card__title" data-open="card-m-list" onclick="viewCardDetail(this)">${x.name}</a></span>
          <hr class="card-hr" />
          <br />
          <ul class="items-list">
          </ul>
          <br /><br />
          <div class="add-item-button" data-open="m-list-2">
            <img src="./plus.png" alt="add">
          </div>
          <div class="delete-button" onclick="deleteCard(this)">
            <img src="./delete.png" alt="delete">
          </div>
      </div>`);
  });
  m();
};

const addItems = () => {
  let itemName = document.getElementById("list-item-title").value;
  let li = document.createElement("li");
  let ul = document.querySelector(".items-list");
  ul.appendChild(li);
  li.id = `item-${itemCount++}`;
  li.innerHTML = `${itemName}<button class="btn-done" onclick="itemChecked(this)">done</button>`;
};

let itemChecked = (e) => {
  e.parentElement.classList.add("checked");
  e.classList.add("hide");
};

let deleteCard = (e) => {
  e.parentElement.remove();

  data.splice(e.parentElement.id, 1);

  localStorage.setItem("data", JSON.stringify(data));

  location.reload();
  console.log(data);
};

const viewCardDetail = (e) => {
  cardDetailTitle.innerText = e.innerText;
  cardDetail.innerHTML = e.parentElement.innerHTML;
};

m();
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createCards();
})();