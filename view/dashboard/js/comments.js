if (localStorage.getItem("token")) {
  var token = localStorage.getItem("token");
} else {
  location.assign("../travel/login.html");
}
// vars
const editForm = document.getElementById("editForm");
let newtitle = document.getElementsByName("title")[0];
let newbody = document.getElementsByName("travelBody")[0];
let newprice = document.getElementsByName("price")[0];
let newcategory = document.getElementsByName("category")[0];
let deitedId;
const tBody = document.getElementById("mainTable");
let commentsArr = [];
///////////////////////////////////
// small sidebar
const toggleSidebar = () => {
  if (localStorage.getItem("isSmall") === "yes") {
    localStorage.setItem("isSmall", "no");
    sidebarId.classList.remove("small-sidebar");
  } else {
    localStorage.setItem("isSmall", "yes");
    sidebarId.classList.add("small-sidebar");
  }
};
function sideBar() {
  if (localStorage.getItem("isSmall") === "yes") {
    sidebarId.classList.add("small-sidebar");
  } else {
    sidebarId.classList.remove("small-sidebar");
  }
}
// *****************************  comments table ************************************
// fetch all data
async function getAll() {
  const response = await fetch("http://localhost:5000/comments/get");
  const data = await response.json();
  commentsArr = [...data.comments];
  console.log(data.comments);
  tBody.innerHTML = "";
  apppendData(data.comments);
}
// show it in table home page
function apppendData(arr) {
  for (let i = 0; i < arr.length; i++) {
    tBody.innerHTML += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${arr[i].author}</td>
                <td>${arr[i].body}</td>
                <td>
                  <a
                    id="${arr[i]._id}"
                    onclick='sendComment(this.id)'
                    class="btn btn-success btn-sm"
                    data-bs-toggle="tooltip"
                    data-bs-title="save comment"
                  >
                    <i class="bi bi-plus-circle-fill"></i>
                  </a>
                  <button
                    id="${arr[i]._id}"
                    onclick='deleteComment(this.id)'
                    class="btn btn-danger btn-sm"
                    data-bs-toggle="tooltip"
                    data-bs-title="delet comment"
                  >
                    <i class="bi bi-trash" ></i>
                  </button>
                </td>
              </tr>
      `;
  }
}
// delete one
async function deleteComment(id) {
  const response = await fetch(`http://localhost:5000/comments/${id}`, {
    method: "DELETE",
    redirect: "follow",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  await location.reload();
}
// Edit
async function sendComment(id) {
  let body = JSON.stringify({
    showStatus: true,
  });
  const response = await fetch(`http://localhost:5000/comments/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: body,
    redirect: "follow",
  });
  await alert("Comment added");
}

// logOut
function signout() {
  location.assign("../travel/login.html");
  localStorage.removeItem("token");
}
// calling
getAll();
sideBar();
