// all RegEx created using ChatGPT, I can't be assed with RegEx
const regExImageUrl = /^https?:\/\//
const regExName = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/
const regExYoutubeEmbed = /^https:\/\/www\.youtube\.com\/embed\/[^?\/]+(.*)?$/

document.getElementById('addTeam').addEventListener('click', (e) => {
  e.target.classList.add('button-shrink')
  setTimeout(() => {
    e.target.classList.add('hidden')  

    document.querySelector('.team-form-section').classList.remove('hidden')
    document.querySelector('.team-section').classList.add('hidden')
    document.querySelector('.search-bar').classList.add('hidden')
    window.scrollTo({ top: 500, behavior: 'smooth'}) // ChatGPT code snippet

  }, 1000)
})

document.getElementById('submitForm').addEventListener('click', (e) => {
  e.preventDefault()
  if (validateForm()) {
    saveTeamData()
  }
})

document.querySelector('.form-team-input-image').addEventListener('change', (e) => {
  swapImage(e.target.value.trim(), document.getElementById('formTeamImage'))
})
document.querySelectorAll('.player-image').forEach(player => {
  player.addEventListener('change', (e) => {swapImage(e.target.value.trim(), e.target.parentElement.querySelector('img'))})
})

// get rid of error elements
document.querySelector('form').querySelectorAll('input').forEach(input => {
  if (input.classList.contains('player-height') || input.classList.contains('player-ppg') || input.classList.contains('player-ft')) {
    input.addEventListener('input', (e) => {
      e.target.parentElement.parentElement.querySelector('span').classList.add('hidden')
      e.target.style.borderColor = '#4a2f0e'
    })  
  } else {
    input.addEventListener('input', (e) => {
      e.target.parentElement.querySelector('span').classList.add('hidden')
      e.target.style.borderColor = '#4a2f0e'
    })
  }
})
document.querySelector('.form-team-input-description').addEventListener('input', (e) => {
  e.target.parentElement.querySelector('span').classList.add('hidden')
  e.target.style.borderColor = '#4a2f0e'
})


/// FUNCTIONS

function swapImage(link, image) {
  image.onerror = () => {image.src = './images/placeholder.png'}
  if (!link || !regExImageUrl.test(link)) {
    image.src = './images/placeholder.png'
    return
  }
  image.src = link
}

function validateForm() {
  console.log(' ')
  console.log('~~~~~~~~~~~~~~~~~~~~~~')
  let isValid = true

  // Name checks
  if (!validateName(document.querySelector('.form-team-input-name'))) {
    isValid = false
  }
  
  document.querySelectorAll('.player-name').forEach(player => {
    if (!validateName(player)) {
      isValid = false
    }
  })
  

  // Description check
  if (!document.querySelector('.form-team-input-description').value.length) {
    isValid = false
    document.querySelector('.form-team-input-description').parentElement.querySelector('span').classList.remove('hidden')
    document.querySelector('.form-team-input-description').style.borderColor = 'red'
    console.log('Description did not pass')
  } else {
    console.log('Description passed')
  }

  // Image checks
  if (!validateImage(document.querySelector('.form-team-input-image'))) {
    isValid = false
  }
  
  document.querySelectorAll('.player-image').forEach(link => {
    if (!validateImage(link)) {
      isValid = false
    }
  })
  

  // Number checks
  document.querySelectorAll('.player-height').forEach(height => {
    if (!validateNumberInput(height)) {
      isValid = false
    }
  })
  
  document.querySelectorAll('.player-ppg').forEach(ppg => {
    if (!validateNumberInput(ppg)) {
      isValid = false
    }  
  })
  
  document.querySelectorAll('.player-ft').forEach(ft => {
    if (!validateNumberInput(ft)) {
      isValid = false
    }  
  })
  

  // Embed checks
  if (!validateYouTubeEmbeds()) {
    isValid = false
  }
  

  // Finish
  console.log('Form is: ' + isValid + '!')
  if (isValid) {
    document.querySelector('.team-form-section').classList.add('hidden')
    document.getElementById('addTeam').classList.remove('hidden')
  }

  console.log('~~~~~~~~~~~~~~~~~~~~~~')
  return isValid
}

function validateName(value) {
  const valueTrimmed = value.value.trim()

  if (valueTrimmed && regExName.test(valueTrimmed)) {
    console.log('Name passed')
    return true
  } else {
    console.log('Name did not pass');
    value.parentElement.querySelector('span').classList.remove('hidden')
    value.style.borderColor = 'red'
    return false
  }
}

function validateImage(value) {
  if (!value.value || !regExImageUrl.test(value.value)) {
    value.parentElement.querySelector('span').classList.remove('hidden')
    value.style.borderColor = 'red'
    return false
  } else {
    return true
  }
}

function validateNumberInput(value) {

  if (value.value.length !== 0 && value.value <= Number(value.max) && value.value >= Number(value.min)) {
    value.parentElement.parentElement.querySelector('span').classList.add('hidden')
    console.log('Number value passed')
    return true
  } else {
    console.log('Number value did not pass')
    value.parentElement.parentElement.querySelector('span').classList.remove('hidden')
    value.style.borderColor = 'red'
    return false
  }
}

function validateYouTubeEmbeds() {
  let allValid = true
  document.querySelectorAll(".form-highlight-input").forEach((input) => {
    const errorElement = input.parentElement.querySelector('span')
    const link = input.value.trim()

    if (!link || link.length === 0 || !regExYoutubeEmbed.test(link.trim())) {
      errorElement.classList.remove('hidden')
      console.log('Embed did not pass!')
      input.style.borderColor = 'red'
      allValid = false
    } else {
      console.log('Embed passed!')
    }

  })
  if (allValid) {
    return true
  } else {
    return false
  }
}

function saveTeamData() {
  const players = []

  document.querySelectorAll('.player').forEach(player => {
    players.push(
      {
      player_image: player.querySelector('.player-image').value,
      player_name: player.querySelector('.player-name').value,
      height: player.querySelector('.player-height').value,
      best_ppg: player.querySelector('.player-ppg').value,
      freethrow_percentage: `${player.querySelector('.player-ft').value}%`,    
      }
    )
  })

  const newTeam = {
    ID: teams.teams.length + 1,
    team_image: document.querySelector('.form-team-input-image').value,
    team_name: document.querySelector('.form-team-input-name').value,
    description: document.querySelector('.form-team-input-description').value,
    added_to_ball_of_fame: new Date().toISOString(),
    highlight_1: document.querySelectorAll('.form-highlight-input')[0].value,
    highlight_2: document.querySelectorAll('.form-highlight-input')[1].value,
    highlight_3: document.querySelectorAll('.form-highlight-input')[2].value,
    players: players,
  }

  teams.teams.push(newTeam)
  localStorage.setItem('teams', JSON.stringify(teams))
  location.reload()
}