document.getElementById('addTeam').addEventListener('click', (e) => {
    document.querySelector('.team-form-section').classList.remove('hidden')
    e.target.classList.add('hidden')
})

document.getElementById('submitTeam').addEventListener('click', (e) => {
    document.querySelector('.team-form-section').classList.add('hidden')
    document.getElementById('addTeam').classList.remove('hidden')
})

function isValidYouTubeEmbedLink(link) {
  if (!link.trim()) {
    return false
  } 
  const youtubeEmbedRegex = /^https:\/\/www\.youtube\.com\/embed\/[^?\/]+(.*)?$/
  return youtubeEmbedRegex.test(link.trim())
}

document.getElementById("teamForm").addEventListener("submit", function (event) {
    event.preventDefault()
    const youtubeErrors = [
      "highlight1Error",
      "highlight2Error",
      "highlight3Error",
    ]
    youtubeErrors.forEach((id) => {
      document.getElementById(id).textContent = ""
    })
    let isValid = true

    const youtubeInputs = document.querySelectorAll(".form-hightlight-input");
    youtubeInputs.forEach((input, index) => {
      const errorElement = document.getElementById(
        `highlight${index + 1}Error`
      );
      const link = input.value.trim();

      if (!link) {
        errorElement.textContent = "YouTube embed link is required";
        isValid = false;
      } else if (!isValidYouTubeEmbedLink(link)) {
        errorElement.textContent = "Must be YouTube embed link format";
        isValid = false;
      }
    });

    if (isValid) {
      console.log("All YouTube links valid - proceeding with save");
      if (typeof saveTeamData === "function") {
        saveTeamData();
      }
    } else {
      console.log("YouTube validation failed");
    }
});
