const welcomeName = document.getElementById("welcome-user");
const homeSection = document.getElementById("home");

// ==========================
// Home Hero Image Slidshow
// ==========================
const backgrounds = [
	"assets/2149142870.jpg",
	"assets/2149142873.jpg",
	"assets/25605.jpg",
];

let currentIndex = 0;
function changeBackground() {
	homeSection.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
	currentIndex = (currentIndex + 1) % backgrounds.length;
}
changeBackground();
setInterval(changeBackground, 5000);
// ===========================================

// ==========================
// Welcoming Speech
// ==========================
welcomeUser();
function welcomeUser() {
	if (sessionStorage.getItem("name") === null) {
		let popup = "";
		while (popup === null || popup.trim() === "") {
			popup = prompt("Please enter your name: ");
		}
		sessionStorage.setItem("name", popup);
		welcomeName.textContent = sessionStorage.getItem("name");
	} else {
		welcomeName.textContent = sessionStorage.getItem("name");
	}
}
// ===========================================

// ==========================
// Smooth Scroll dengan durasi custom + offset navbar
// ==========================
function smoothScroll(targetId, duration, offset = 0) {
	const target = document.querySelector(targetId);
	if (!target) return;

	const startPosition = window.scrollY;
	// Tambahkan offset supaya tidak ketutupan navbar
	const targetPosition = target.getBoundingClientRect().top - offset;
	const startTime = performance.now();

	function animationScroll(currentTime) {
		const elapsedTime = currentTime - startTime;
		const progress = Math.min(elapsedTime / duration, 1);

		// EaseInOutQuad
		const ease =
			progress < 0.5
				? 2 * progress * progress
				: -1 + (4 - 2 * progress) * progress;

		window.scrollTo(0, startPosition + targetPosition * ease);

		if (elapsedTime < duration) {
			requestAnimationFrame(animationScroll);
		}
	}

	requestAnimationFrame(animationScroll);
}
// ===========================================

// ==========================
// Event Listener untuk semua link #section
// ==========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();

		// Tutup menu mobile terlebih dahulu
		const mobileMenu = document.getElementById("mobile-menu");
		if (!mobileMenu.classList.contains("hidden")) {
			mobileMenu.classList.add("hidden");
			// Hitung tinggi navbar untuk offset
			const navbar = document.querySelector("nav");
			const navbarHeight = navbar ? navbar.offsetHeight : 0;

			// Scroll ke target dengan offset
			const targetId = this.getAttribute("href");
			smoothScroll(targetId, 800, navbarHeight);
		} else {
			// Scroll ke target dengan offset
			const targetId = this.getAttribute("href");
			smoothScroll(targetId, 800, 0);
		}
	});
});
// ===========================================

// ==========================
// Send Message function
// ==========================
function sendMessage(event) {
	event.preventDefault();

	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const gender = document.querySelector('input[name="gender"]:checked').value;
	const message = document.getElementById("message").value.trim();

	if (!name || !email || !gender || !message) {
		alert("Please fill out all fields.");
		return;
	}
	const newMessage = document.createElement("div");
	newMessage.className =
		"bg-gray-100 max-h-40 overflow-y-auto border-y-2 p-2 rounded break-words";
	newMessage.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;
	document.getElementById("no-message").classList.add("hidden");

	document.getElementById("pesan-anda").appendChild(newMessage);
	document.getElementById("message-form").reset();
}
// ===========================================

// ==========================
// Show Mobile Menu
// ==========================
document.getElementById("menu-btn").addEventListener("click", () => {
	const menu = document.getElementById("mobile-menu");
	menu.classList.toggle("hidden");
});
// ===========================================
