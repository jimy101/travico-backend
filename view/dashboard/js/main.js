if (localStorage.getItem("token")) {
  var token = localStorage.getItem("token");
} else {
  location.assign("./travel/login.html");
}
// vars
const editForm = document.getElementById("editForm");
let newtitle = document.getElementsByName("title")[0];
let newbody = document.getElementsByName("travelBody")[0];
let newprice = document.getElementsByName("price")[0];
let newcategory = document.getElementsByName("category")[0];
let newImg = document.getElementsByName("image")[0];
let deitedId;
const tBody = document.getElementById("mainTable");
let travelsArr = [];
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
// *****************************  travels table ************************************
// fetch all data
async function getAll() {
  const response = await fetch("http://localhost:5000/travels/show");
  const data = await response.json();
  travelsArr = [...data.travels];
  console.log(data.travels);
  tBody.innerHTML = "";
  apppendData(data.travels);
}
// show it in table home page
function apppendData(arr) {
  for (let i = 0; i < arr.length; i++) {
    tBody.innerHTML += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${arr[i].title}</td>
                <td>${arr[i].body}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].cat}</td>
                <td>
                  <a
                    id="${arr[i]._id}"
                    onclick='editTravel(this.id)'
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    class="btn btn-success btn-sm"
                    href="./travel/edit.html"
                    data-bs-toggle="tooltip"
                    data-bs-title="edit user"
                  >
                    <i class="bi bi-pencil"></i>
                  </a>
                  <button
                    id="${arr[i]._id}"
                    onclick='deleteTravel(this.id)'
                    class="btn btn-danger btn-sm"
                    data-bs-toggle="tooltip"
                    data-bs-title="delet user"
                  >
                    <i class="bi bi-trash" ></i>
                  </button>
                </td>
              </tr>
      `;
  }
}
// delete one
async function deleteTravel(id) {
  const response = await fetch(`http://localhost:5000/travels/${id}`, {
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
async function editTravel(id) {
  for (let i = 0; i < travelsArr.length; i++) {
    if (travelsArr[i]._id == id) {
      newtitle.value = travelsArr[i].title;
      newbody.value = travelsArr[i].body;
      newprice.value = travelsArr[i].price;
      newcategory.value = travelsArr[i].cat;
      return (deitedId = travelsArr[i]._id);
    }
  }
}

// modal form submition
// editForm.addEventListener("submit", async function (event) {
//   event.preventDefault();
//   let body = JSON.stringify({
//     title: newtitle.value,
//     body: newbody.value,
//     price: newprice.value,
//     cat: newcategory.value,
//   });
//   console.log(body);
//   const response = await fetch(`http://localhost:5000/travels/${deitedId}`, {
//     method: "PATCH",
//     headers: {
//       Accept: "application.json",
//       "Content-Type": "application/json",
//       Authorization: `${token}`,
//     },
//     body: body,
//     redirect: "follow",
//   });

//   console.log(response.body);
// });
//

editForm.addEventListener("submit", editModal);
async function editModal(event) {
  event.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);
  myHeaders.append("Cookie", "Cookie_1=value");

  var formdata = new FormData();
  formdata.append("title", newtitle.value);
  formdata.append("body", newbody.value);
  formdata.append("price", newprice.value);
  formdata.append("cat", newcategory.value);
  formdata.append("imgUrl", newImg.files[0]);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`http://localhost:5000/travels/${deitedId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// logOut
function signout() {
  location.assign("./travel/login.html");
  localStorage.removeItem("token");
}
// calling
getAll();
sideBar();
// *****************************  comments table ************************************
