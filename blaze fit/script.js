// Cleaned-up project files with unnecessary code removed

// === CLEANED script.js ===
const text = "Transform Your Body. Train. Eat. Grow.";
let i = 0;
function typeEffect() {
  if (i < text.length) {
    document.getElementById("typing")?.insertAdjacentText("beforeend", text.charAt(i));
    i++;
    setTimeout(typeEffect, 100);
  }
}
document.addEventListener("DOMContentLoaded", typeEffect);

document.addEventListener("DOMContentLoaded", () => {
  // Typing effect in hero if present
  const el = document.getElementById("heroTyping");
  if (el) {
    const heroText = "Train. Eat. Grow. Build Your Best Physique.";
    let idx = 0;
    const step = () => {
      if (idx < heroText.length) {
        el.textContent += heroText[idx++];
        setTimeout(step, 60);
      }
    };
    step();
  }

  // Animation delay for feature and diet items
  document.querySelectorAll(".feature").forEach((n, i) => {
    n.style.animationDelay = 0.25 + i * 0.12 + "s";
  });
  document.querySelectorAll(".diet-right .food").forEach((n, i) => {
    n.style.animationDelay = 0.2 + i * 0.12 + "s";
  });

  // Navbar login/logout logic (only once)
  const nav = document.querySelector(".navbar ul");
  if (nav) {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      // Remove Login/Signup
      nav.querySelectorAll("li").forEach((li) => {
        const t = li.textContent.trim();
        if (t === "Login" || t === "Signup") li.remove();
      });

      // Welcome text + logout
      const welcomeItem = document.createElement("li");
      welcomeItem.innerHTML = `<span style="color:#fdd835;font-weight:bold;">Welcome, ${currentUser}</span>`;
      const logoutItem = document.createElement("li");
      const logoutLink = document.createElement("a");
      logoutLink.href = "#";
      logoutLink.textContent = "Logout";
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "main2.html";
      });
      logoutItem.appendChild(logoutLink);
      nav.appendChild(welcomeItem);
      nav.appendChild(logoutItem);
    }
  }

  // Autoplay bgVideo if present
  const video = document.getElementById("bgVideo");
  if (video) {
    video.play().catch((err) => console.warn("Autoplay blocked:", err));
  }

  // Load comments
  loadComments();
});

// Workout generator
const genBtn = document.getElementById("genBtn");
if (genBtn) {
  genBtn.addEventListener("click", () => {
    const goal = document.getElementById("wg-goal").value;
    const level = document.getElementById("wg-level").value;
    const out = document.getElementById("wg-output");
    let html = "<h3>Suggested 4-week pattern</h3><ul>";
    if (goal === "muscle") {
      if (level === "beginner") {
        html += "<li>Mon: Full body (compound focus)</li><li>Wed: Full body (accessory)</li><li>Fri: Full body (hypertrophy)</li>";
      } else if (level === "intermediate") {
        html += "<li>Mon: Chest/Triceps</li><li>Tue: Back/Biceps</li><li>Thu: Legs</li><li>Fri: Shoulders/Abs</li>";
      } else {
        html += "<li>Mon: Chest</li><li>Tue: Back</li><li>Wed: Legs</li><li>Thu: Arms</li><li>Fri: Shoulders</li>";
      }
    } else if (goal === "fatloss") {
      html += "<li>3x HIIT sessions + 2x full-body circuits per week</li>";
    } else if (goal === "strength") {
      html += "<li>Emphasis on Squat, Bench, Deadlift — low reps, heavy sets</li>";
    }
    html += "</ul>";
    out.innerHTML = html;
    out.scrollIntoView({ behavior: "smooth" });
  });
}

// Diet calculator
function calcDiet() {
  const w = parseFloat(document.getElementById("d-weight")?.value || 0);
  const activity = parseFloat(document.getElementById("d-activity")?.value || 1.375);
  const goal = document.getElementById("d-goal")?.value || "maintain";
  const out = document.getElementById("dietResult");
  if (!w || w <= 0) {
    alert("Enter your weight in kg");
    return;
  }
  let bmr = 24 * w;
  let maintenance = Math.round(bmr * activity);
  if (goal === "bulk") maintenance += 300;
  if (goal === "cut") maintenance -= 300;
  const protein = Math.round(w * 2);
  const fats = Math.round(w * 1);
  const carbs = Math.round((maintenance - (protein * 4 + fats * 9)) / 4);
  out.innerHTML = `<p><strong>Calories:</strong> ${maintenance} kcal</p>
                   <p><strong>Protein:</strong> ${protein} g</p>
                   <p><strong>Fats:</strong> ${fats} g</p>
                   <p><strong>Carbs:</strong> ${carbs} g</p>`;
}
window.calcDiet = calcDiet;

// Comments
function escapeHtml(s) {
  return String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function loadComments() {
  const list = document.getElementById("com-list");
  if (!list) return;
  const comments = JSON.parse(localStorage.getItem("bf_comments") || "[]");
  list.innerHTML = comments
    .map((c) => {
      const name = c.name ? `<strong>${escapeHtml(c.name)}</strong>` : "<strong>Member</strong>";
      const time = new Date(c.time).toLocaleString();
      return `<div class="comment-card"><div>${name} <span style="opacity:.6;font-size:.8rem">· ${time}</span></div><div style="margin-top:6px">${escapeHtml(c.text)}</div></div>`;
    })
    .join("");
}
function postComment() {
  const textEl = document.getElementById("com-input");
  const nameEl = document.getElementById("com-name");
  if (!textEl || textEl.value.trim() === "") {
    alert("Write something first");
    return;
  }
  const comments = JSON.parse(localStorage.getItem("bf_comments") || "[]");
  comments.unshift({ name: nameEl?.value?.trim() || "", text: textEl.value.trim(), time: Date.now() });
  localStorage.setItem("bf_comments", JSON.stringify(comments));
  textEl.value = "";
  if (nameEl) nameEl.value = "";
  loadComments();
}
window.postComment = postComment;
