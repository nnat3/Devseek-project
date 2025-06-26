/* Declare jobs globally for easy manipulation */
let allJobs = []

function loadJobs() {
      fetch("jobs.json")
      .then((res) => res.json())
      .then((jobs) =>{
            allJobs = jobs;
            renderJobs(jobs)
      })
}



/* Fetch job data from json file */
document.addEventListener ("DOMContentLoaded", () => {
      fetch("jobs.json")
       .then((res) => res.json())
        .then((jobs => {
        const jobList = document.querySelector(".jobs-list")
        
        jobs.forEach((job)=> {

         const jobCard = document.createElement("div")/* div to display job cards */
        jobCard.classList.add("job-card");
        jobCard.innerHTML = `<h3>${job.title} <span class="type">${job.type}</span> <p>${job.description}</p>
         <div class="job-info">
         <span>${job.location}</span>
         <span>${job.salary}</span>
         </div>`;

         jobList.appendChild(jobCard)
        });
}))
});

/* Filter jobs by location & job title */
function setupFilter() {
      const inputTitle = document.getElementById("filter-title")
      const selectLocation = document.getElementById("filter-location")

      inputTitle.addEventListener("input", applyFilters)
      selectLocation.addEventListener("change", applyFilters)
}

function applyFilters() {
      const title = document.getElementById("filter-title").toLowerCase().value
      const location = document.getElementById("filter-location").value
      const filteredResult = allJobs.filter((jobs) => {
        const titleMatches = job.title.includes(title)
        const locationMatches = location === "all" || job.location === location;
        return titleMatches && locationMatches
      })
      renderJobs(filteredResult)
}
 



