

//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");

//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
}

const chicken = document.querySelector('a[href="#chicken"]');
const laksa = document.querySelector('a[href="#laksa"]');
const crab = document.querySelector('a[href="#crab"]');
const kaya = document.querySelector('a[href="#kaya"]');
const roti = document.querySelector('a[href="#roti"]');
const kachang = document.querySelector('a[href="#kachang"]');
const malay = document.querySelector('a[href="#malay"]');
const chinese = document.querySelector('a[href="#chinese"]');
const indian = document.querySelector('a[href="#indian"]');


function showAndScroll(pgno, sectionId) {
    hideall();

    show(pgno);
    
    // Scroll to the specific section
    let section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView();
    }
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {show(1);});
page2btn.addEventListener("click", function () {show(2);});
page3btn.addEventListener("click", function () {show(3);});

// Event listeners for dropdown links
chicken.addEventListener("click", function() {showAndScroll(1, "#chicken");});
laksa.addEventListener("click", function() {showAndScroll(1, "#laksa");});
crab.addEventListener("click", function() {showAndScroll(1, "#crab");});
kaya.addEventListener("click", function(e) {showAndScroll(2, "#kaya");});
roti.addEventListener("click", function(e) {showAndScroll(2, "#roti");});
kachang.addEventListener("click", function(e) {showAndScroll(2, "#kachang");});
malay.addEventListener("click", function(e) {showAndScroll(3, "#malay");});
chinese.addEventListener("click", function(e) {showAndScroll(3, "#chinese");});
indian.addEventListener("click", function(e) {showAndScroll(3, "#indian");});

hideall();

show(1);

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);

function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Open Menu"; //change button text open menu
    }
}