/** @format */

const sideLinks = document.querySelectorAll(
  ".sidebar .side-menu li a:not(.logout)"
);

sideLinks.forEach((item) => {
  // Check if the link's href matches the current URL
  if (item.getAttribute("href") === window.location.pathname) {
    item.parentElement.classList.add("active");
  }
});

const menuBar = document.querySelector(".content nav .bx.bx-menu");
const sideBar = document.querySelector(".sidebar");

// Check if the sidebar state is stored in localStorage and set the initial state
const isSidebarClosed = localStorage.getItem("sidebarClosed") === "true";
if (isSidebarClosed) {
  sideBar.classList.add("close");
}

menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("close");

  // Store the current sidebar state in localStorage
  const isClosed = sideBar.classList.contains("close");
  localStorage.setItem("sidebarClosed", isClosed.toString());
});

const searchBtn = document.querySelector(
  ".content nav form .form-input button"
);
const searchBtnIcon = document.querySelector(
  ".content nav form .form-input button .bx"
);
const searchForm = document.querySelector(".content nav form");

searchBtn.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault;
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchBtnIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchBtnIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sideBar.classList.add("close");
  } else {
    sideBar.classList.remove("close");
  }
  if (window.innerWidth > 576) {
    searchBtnIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});
