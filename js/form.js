// all RegEx created using ChatGPT, I can't be assed with RegEx
const regExImageUrl = /^https?:\/\//
const regExName = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/
const regExYoutubeEmbed = /^https:\/\/www\.youtube\.com\/embed\/[^?\/]+(.*)?$/

document.getElementById('addTeam').addEventListener('click', (e) => {
    document.querySelector('.team-form-section').classList.remove('hidden')
    e.target.classList.add('hidden')
})

document.getElementById('submitForm').addEventListener('click', (e) => {
  e.preventDefault()
  validateForm()
})

/* document.getElementById("teamForm").addEventListener("submit", function (e) {
    e.preventDefault()
    const youtubeErrors = [
      "highlight1Error",
      "highlight2Error",
      "highlight3Error",
    ]
    youtubeErrors.forEach((id) => {
      document.getElementById(id).textContent = ""
    })
    let isValid = true

    const youtubeInputs = document.querySelectorAll(".form-hightlight-input")
    youtubeInputs.forEach((input, index) => {
      const errorElement = document.getElementById(
        `highlight${index + 1}Error`
      )
      const link = input.value.trim()

      if (!link) {
        errorElement.textContent = "YouTube embed link is required"
        isValid = false
      } else if (!validateEmbedLink(link)) {
        errorElement.textContent = "Must be YouTube embed link format"
        isValid = false
      }
    })

    if (isValid) {
      console.log("All YouTube links valid - proceeding with save")
      if (typeof saveTeamData === "function") {
        saveTeamData()
      }
    } else {
      console.log("YouTube validation failed")
    }
}) */

document.querySelector('.form-team-input-image').addEventListener('change', (e) => 
  {swapImage(e.target.value.trim(), document.getElementById('formTeamImage'))
})
document.querySelectorAll('.player-image').forEach(player => {
  player.addEventListener('change', (e) => {swapImage(e.target.value.trim(), e.target.parentElement.querySelector('img'))})
})

function swapImage(link, image) {
  image.onerror = () => {image.src = '/images/placeholder.png'}
  if (!link || !regExImageUrl.test(link)) {
    image.src = '/images/placeholder.png'
    return
  }
  image.src = link
}

function validateForm() {
  isValid = true

  // Name checks
  isValid = validateName(document.querySelector('.form-team-input-name').value)
  document.querySelectorAll('.player-name').forEach(player => {
    isValid = validateName(player.value)
  })

  // Description check

  // Image checks

  // Number checks
  document.querySelectorAll('.player-height').forEach(height => {
    isValid = validateNumberInput(height.value)
  })
  document.querySelectorAll('.player-ppg').forEach(ppg => {
    isValid = validateNumberInput(ppg.value)
  })
  document.querySelectorAll('.player-ft').forEach(ft => {
    isValid = validateNumberInput(ft.value)
  })

  // Embed checks

  console.log('Form is:' + isValid + '!')
  if (isValid) {
    //                                       Add everything to localStorage ----- unfinished
    document.querySelector('.team-form-section').classList.add('hidden')
    document.getElementById('addTeam').classList.remove('hidden')
  }
}

function validateName(valueUntrimmed) {
  const value = valueUntrimmed.trim()

  if (value && regExName.test(value)) {
    console.log('Name "' + value + '" passed')
    return true
  } else {
    console.log('Name did not pass');
    return false
  }
}

function validateNumberInput(value) {
  if (value.length !== 0) {
    console.log('Number value: ' + value + ' passed')
    return true
  } else {
    console.log('Number value did not pass')
    return false
  }
}

function validateEmbedLink(link) {
  if (!link.trim()) {
    return false
  } 
  return regExYoutubeEmbed.test(link.trim())
}


