// ============ NAV BURGER ============
const burger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");
if (burger) {
    burger.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
}

// ============ COPY YEAR ============
document.getElementById("copyYear").textContent = new Date().getFullYear();

// ============ REVEAL ON SCROLL ============
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ============ STAT COUNTER ============
const counters = document.querySelectorAll(".stat-number[data-target]");
const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const numEl = el.querySelector(".num");
            const target = parseInt(el.dataset.target, 10);
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                numEl.textContent = Math.floor(eased * target);
                if (t < 1) requestAnimationFrame(tick);
                else numEl.textContent = target;
            }
            requestAnimationFrame(tick);
            counterIO.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// ============ FORM VALIDATION + TOAST ============
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

const validators = {
    firstName: v => v.trim().length >= 2 || "Please enter your first name.",
    lastName: v => v.trim().length >= 2 || "Please enter your last name.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    phone: v => v.trim().replace(/\D/g, "").length >= 7 || "Enter a valid phone number.",
    company: v => v.trim().length >= 2 || "Please enter your company name."
};

function showError(input, message) {
    const field = input.closest(".field");
    field.classList.add("error");
    const err = field.querySelector(".err-msg");
    if (err) err.textContent = message;
}
function clearError(input) {
    const field = input.closest(".field");
    field.classList.remove("error");
    const err = field.querySelector(".err-msg");
    if (err) err.textContent = "";
}

// live clear
form.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", () => clearError(input));
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    Object.keys(validators).forEach(name => {
        const input = form.elements[name];
        if (!input) return;
        const res = validators[name](input.value);
        if (res !== true) {
            showError(input, res);
            valid = false;
        } else {
            clearError(input);
        }
    });
    if (!valid) {
        const firstErr = form.querySelector(".field.error input, .field.error textarea");
        if (firstErr) firstErr.focus();
        return;
    }
    // success
    toast.classList.add("show");
    form.reset();
    setTimeout(() => toast.classList.remove("show"), 4200);
});
