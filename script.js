const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const signupFields = document.querySelector("#signupFields");

document.querySelector("#showSignup").addEventListener("click", () => {
  signupFields.hidden = !signupFields.hidden;
  document.querySelector("#showSignup").textContent = signupFields.hidden ? "Create demo account" : "Hide sign up";
});

document.querySelector("#signupButton").addEventListener("click", () => {
  const name = document.querySelector("#signupName").value.trim();
  const email = document.querySelector("#signupEmail").value.trim().toLowerCase();
  const password = document.querySelector("#signupPassword").value;
  if (!name || !email || password.length < 4) {
    loginMessage.style.color = "#ff9aa9";
    loginMessage.textContent = "Enter a name, valid email and password of at least 4 characters.";
    return;
  }
  const accounts = JSON.parse(localStorage.getItem("portfolioDemoAccounts") || "{}");
  if (accounts[email]) {
    loginMessage.style.color = "#ff9aa9";
    loginMessage.textContent = "A demo account with this email already exists.";
    return;
  }
  accounts[email] = { name, password };
  localStorage.setItem("portfolioDemoAccounts", JSON.stringify(accounts));
  document.querySelector("#email").value = email;
  document.querySelector("#password").value = "";
  signupFields.hidden = true;
  loginMessage.style.color = "#70e4bc";
  loginMessage.textContent = "Demo account created in this browser. Sign in to test the demo.";
});

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim().toLowerCase();
  const password = document.querySelector("#password").value;
  const accounts = JSON.parse(localStorage.getItem("portfolioDemoAccounts") || "{}");
  const account = accounts[email];
  if (account && account.password === password) {
    loginMessage.style.color = "#70e4bc";
    loginMessage.textContent = `Welcome, ${account.name}! Demo sign-in successful.`;
  } else {
    loginMessage.style.color = "#ff9aa9";
    loginMessage.textContent = "No matching demo account. Create one above to try the demo.";
  }
});

// Highlight the current section as the page scrolls.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));


// Admin login is intentionally a front-end demonstration only.
// Credentials are visible in this file, so never use this for real access control.
const adminForm = document.querySelector("#adminForm");
const adminMessage = document.querySelector("#adminMessage");
const adminDashboard = document.querySelector("#adminDashboard");
const adminCard = document.querySelector(".admin-card");

adminForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.querySelector("#adminEmail").value.trim().toLowerCase();
  const password = document.querySelector("#adminPassword").value;
  if (email === "admin@example.com" && password === "AdminDemo123!") {
    adminMessage.style.color = "#70e4bc";
    adminMessage.textContent = "Demo sign-in successful.";
    adminCard.hidden = true;
    adminDashboard.hidden = false;
  } else {
    adminMessage.style.color = "#ff9aa9";
    adminMessage.textContent = "Incorrect admin email or password.";
  }
});

document.querySelector("#adminLogout").addEventListener("click", () => {
  adminDashboard.hidden = true;
  adminCard.hidden = false;
  adminForm.reset();
  adminMessage.textContent = "";
});
