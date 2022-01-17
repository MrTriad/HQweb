var getSidebar = document.getElementById('navbar');

var getToggle = document.getElementsByClassName("toggle");

if (typeof getToggle[0] != 'undefined'){
	getToggle[0].addEventListener("click", function () {
		getSidebar.classList.toggle("active");
		});
}

if (typeof getToggle[1] !== 'undefined'){
	getToggle[1].addEventListener("click", function () {
		getSidebar.classList.toggle("active");
		});
}


