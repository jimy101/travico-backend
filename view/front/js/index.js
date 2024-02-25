// ********************************** travels **************************************
const travelsDiv = document.getElementById("travels-div");
async function showTravels() {
  const response = await fetch("http://localhost:5000/travels/show");
  const data = await response.json();
  console.log(data.travels);
  // travelsDiv.innerHTML = "";
  for (let i = 0; i < data.travels.length; i++) {
    travelsDiv.innerHTML += `
        <div class="item item-transition" >
          <div class="image">
            <img
              loading="lazy"
              src='../../back/uploads/${data.travels[i].imgUrl}'
              alt=""
              srcset=""
            />
          </div>
          <div class="content px-2 my-2">
            <h1>${data.travels[i].title}</h1>
            <p class="des">
              ${data.travels[i].body}
            </p>
            <div class="price d-flex justify-content-between my-2">
              <p class="display-6 fw-bold">${data.travels[i].price} $</p>
              <p
                data-bs-toggle="modal"
                data-bs-target="#contactForm"
                class="btn fs-5 btn-outline-success"
              >
                Contact Us
              </p>
            </div>
          </div>
        </div>
    `;
  }
  // animation
  const items = document.querySelectorAll(" .item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
      entry.target.classList.toggle("item-transition", entry.isIntersecting)
    );
  });

  items.forEach((card) => observer.observe(card));
}
window.addEventListener("load", showTravels);
// ********************************** Contact Form **************************************
const contactForm = document.getElementById("contactForm");
const whatsappPhone = +201279970553;
//
contactForm.addEventListener("submit", function (e) {
  e.preventDefault;
  // data-bs-dismiss="modal"

  let places = document.getElementsByName("places")[0];
  let visitorName = document.getElementsByName("visitorName")[0];
  let visitorEmail = document.getElementsByName("visitorEmail")[0];
  let nationality = document.getElementsByName("nationality")[0];
  let numberOfVisitors = document.getElementsByName("numberOfVisitors")[0];
  let visitorPhone = document.getElementsByName("visitorPhone")[0];
  let visitDate = document.getElementsByName("visitDate")[0];
  let days = document.getElementsByName("days")[0];
  // send 
  let url =
    "https://wa.me/" +
    whatsappPhone +
    "?text=" +
    "*Name:*" +
    visitorName.value +
    "%0a" +
    "*places:*" +
    places.value +
    "%0a" +
    "*visitor Email:*" +
    visitorEmail.value +
    "%0a" +
    "*nationality:*" +
    nationality.value +
    "%0a" +
    "*number Of Visitors:*" +
    numberOfVisitors.value +
    "%0a" +
    "*visitorPhone:*" +
    visitorPhone.value +
    "%0a" +
    "*visit Date:*" +
    visitDate.value +
    "%0a" +
    "*days to stay:*" +
    days.value +
    "%0a";
    window.open(url,'_blank').focus()
});

// ********************************** Comments **************************************
// show comments
const commentContainer = document.getElementsByClassName("comment-cards")[0];
// fetch all data
async function showComments() {
  const response = await fetch("http://localhost:5000/comments/get");
  const data = await response.json();
  console.log(data.comments);
  commentContainer.innerHTML = "";
  apppendData(data.comments);
}
// show it in table home page
function apppendData(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].showStatus == true) {
      commentContainer.innerHTML += `
            <div class="comment-card m-4 d-flex border border-1 rounded-3">
          <div class="image rounded-3">
            <img
              src="../assests/Profile-Icon-SVG-09856789-300x300.webp"
              alt=""
            />
          </div>
          <div class="content mx-4">
            <h3>${arr[i].author}</h3>
            <p>${arr[i].body}</p>
          </div>
        </div>
    `;
    }
  }
}
showComments();
//  comment form
const commentForm = document.getElementById("commentForm");
let author = document.getElementsByName("author")[0];
let commentBody = document.getElementsByName("commentBody")[0];
commentForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let body = JSON.stringify({
    author: author.value,
    body: commentBody.value,
  });
  console.log(body);
  const response = await fetch("http://localhost:5000/comments/add", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: body,
    redirect: "follow",
  }).then(() => {
    alert("thank You");
    author.value = "";
    commentBody.value = "";
  });
});
