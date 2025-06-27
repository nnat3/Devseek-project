/* Declare jobs globally for easy manipulation */
let allJobs = []

/* Job cards display function */
function renderJobs(jobs) {
      const jobList = document.querySelector(".jobs-list");
      jobList.innerHTML = ""

 jobs.forEach((job)=> {

  const jobCard = document.createElement("div")/* div to display job cards */
  jobCard.classList.add("job-card");
  jobCard.innerHTML = `<h3>${job.title} <span class="type">${job.type}</span> <p>${job.description}</p>
         <div class="job-info">
         <span>${job.location}</span>
         <span>${job.salary}</span>
         </div>
         <button class="apply-btn" data-title="${job.title}">Apply</button>`;

         jobList.appendChild(jobCard)
        });

         setApplyButton();
      }

/* Fetch job data from json file */
function loadJobs() {
      fetch("jobs.json")
      .then((res) => res.json())
      .then((data) =>{
            /*console.log("Loaded jobs:", jobs); */
            allJobs = data.jobs;
            renderJobs(allJobs)
      })
}

/* Filter jobs by location & job title */
function setupFilter() {
      const inputTitle = document.getElementById("filter-title")
      const selectLocation = document.getElementById("filter-location")

      inputTitle.addEventListener("input", applyFilters)
      selectLocation.addEventListener("change", applyFilters)
}

function applyFilters() {
      const title = document.getElementById("filter-title").value.toLowerCase()
      const location = document.getElementById("filter-location").value
      const filteredResult = allJobs.filter((job) => {
        const titleMatches = job.title.toLowerCase().includes(title)
        const locationMatches = location === "all" || job.location === location;
        return titleMatches && locationMatches
      })
      renderJobs(filteredResult)
}
 
document.addEventListener("DOMContentLoaded", () => {
      loadJobs();
      setupFilter();
})

function setApplyButton() {
      const applyButtons = document.querySelectorAll(".apply-btn")
      const applyPopUp = document.getElementById("apply-popup")
      const form = document.getElementById("apply-form");
      const nameInput = document.getElementById("applicant-name");
      const emailInput = document.getElementById("applicant-email");
      const closePopupBtn = document.getElementById("close-popup");

  applyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyPopUp.classList.remove("hidden");
      form.setAttribute("data-job-title", btn.dataset.title);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const jobTitle = form.getAttribute("data-job-title");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name && email) {
      alert(`Application submitted for "${jobTitle}" by ${name} (${email})`);
      form.reset();
      applyPopUp.classList.add("hidden");
    }
  });

  closePopupBtn.addEventListener("click", () => {
    applyPopUp.classList.add("hidden");
  });
}


