console.log("AttachLink site loaded.");

// ============ NAVIGATION ============= //
function toggleMenu() {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("show");
}

// ============ FORM HANDLING ============= //
// Hide all forms
function hideAllForms() {
  document.querySelectorAll(".feature-card").forEach((card) => {
    const content = card.querySelector(".card-content");
    const form = card.querySelector(".form-section");
    if (content) content.style.display = "block";
    if (form) form.style.display = "none";
  });
}

// Show specific form
function showForm(formId, cardId) {
  hideAllForms();
  const card = document.getElementById(cardId);
  if (card) {
    const content = card.querySelector(".card-content");
    const form = card.querySelector(".form-section");
    if (content) content.style.display = "none";
    if (form) form.style.display = "block";
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Hide form and show card content
function hideForm(cardId) {
  const card = document.getElementById(cardId);
  if (card) {
    const content = card.querySelector(".card-content");
    const form = card.querySelector(".form-section");
    if (content) content.style.display = "block";
    if (form) form.style.display = "none";
  }
}

// ============ STUDENT FORM ============= //
document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentProfileForm");
  if (studentForm) {
    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // collect student data
      const formData = new FormData(studentForm);
      const student = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        skill: formData.get("skill"),
      };

      // save to localStorage
      localStorage.setItem("studentProfile", JSON.stringify(student));

      alert("✅ Student profile saved! Now browse opportunities.");
      studentForm.reset();
      hideForm("student-card");
    });
  }
});

// ============ COMPANY FORM ============= //
document.addEventListener("DOMContentLoaded", () => {
  const companyForm = document.getElementById("companyProfileForm");
  if (companyForm) {
    companyForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(companyForm);
      const company = {
        companyName: formData.get("companyName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        skills: formData.get("skills"),
        duration: formData.get("duration"),
        location: formData.get("location"),
      };

      localStorage.setItem("companyProfile", JSON.stringify(company));

      alert("✅ Company profile saved! Redirecting to dashboard...");
      window.location.href = "company-dashboard.html";
    });
  }
});

// ============ COMPANY DASHBOARD ============= //
document.addEventListener("DOMContentLoaded", () => {
  const oppForm = document.getElementById("opportunityForm");
  if (oppForm) {
    oppForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(oppForm);
      const opportunity = {
        title: formData.get("title"),
        skill: formData.get("skill"),
        description: formData.get("description"),
        duration: formData.get("duration"),
        location: formData.get("location"),
      };

      // save to localStorage
      let opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
      opportunities.push(opportunity);
      localStorage.setItem("opportunities", JSON.stringify(opportunities));

      renderCompanyOpportunities();
      oppForm.reset();
    });

    renderCompanyOpportunities();
  }
});

function renderCompanyOpportunities() {
  const container = document.getElementById("companyOpportunities");
  if (!container) return;

  container.innerHTML = "<h2>Your Posted Opportunities</h2>";
  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];

  if (opportunities.length === 0) {
    container.innerHTML += "<p>No opportunities posted yet.</p>";
    return;
  }

  opportunities.forEach((opp) => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    card.innerHTML = `
      <h3>${opp.title}</h3>
      <p><strong>Skill Required:</strong> ${opp.skill}</p>
      <p><strong>Description:</strong> ${opp.description}</p>
      <p><strong>Duration:</strong> ${opp.duration}</p>
      <p><strong>Location:</strong> ${opp.location}</p>
    `;
    container.appendChild(card);
  });
}

// ============ OPPORTUNITIES PAGE ============= //
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("opportunitiesList");
  if (container) {
    const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
    const student = JSON.parse(localStorage.getItem("studentProfile"));

    container.innerHTML = "";

    if (!student) {
      container.innerHTML = "<p>⚠️ Please create a student profile first.</p>";
      return;
    }

    // filter by student skill
    const matched = opportunities.filter((opp) =>
      opp.skill.toLowerCase().includes(student.skill.toLowerCase())
    );

    if (matched.length === 0) {
      container.innerHTML = `<p>😔 No opportunities found for your skill: <strong>${student.skill}</strong>.</p>`;
      return;
    }

    matched.forEach((opp) => {
      const card = document.createElement("div");
      card.className = "opportunity-card";
      card.innerHTML = `
        <h3>${opp.title}</h3>
        <p><strong>Skill Required:</strong> ${opp.skill}</p>
        <p><strong>Description:</strong> ${opp.description}</p>
        <p><strong>Duration:</strong> ${opp.duration}</p>
        <p><strong>Location:</strong> ${opp.location}</p>
      `;
      container.appendChild(card);
    });
  }
});

// ============ BROWSE OPPORTUNITIES BUTTON ============= //
function goToOpportunities() {
  const student = JSON.parse(localStorage.getItem("studentProfile"));
  if (!student) {
    alert("⚠️ Please create your student profile first before browsing opportunities.");
    return;
  }
  window.location.href = "opportunities.html";
}
