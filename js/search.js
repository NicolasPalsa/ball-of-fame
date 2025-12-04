// search function
document.getElementById("search").addEventListener("input", (e) => {
  const value = document.getElementById("search").value
  results = []
  const div = document.getElementById("result")
  div.innerHTML = ""

  var searchArray = []
  teams.teams.forEach((team) => {
    searchArray.push(team.team_name)
    team.players.forEach((player) => {
      searchArray.push(player.player_name)
    })
  })

  search(searchArray, value)

  for (result in results) {
    if (result >= 5) {
      break
    } else {
      const p = document.createElement("p")
      p.innerHTML = results[result]
      p.classList.add('search-result')
      p.value = results[result].toString()
      div.append(p)
    }
  }

  // clicking on result function
  document.querySelectorAll('.search-result').forEach(result => {
    result.addEventListener('click', (e) => {
      const value = e.target.value
      for (team of teams.teams) {
        if (team.team_name === value) {
          navigateToTeamPage(team.ID.toString())
        } else {
          for (let player of team.players) {
            if (player.player_name === value) {
              navigateToTeamPage(team.ID.toString())
            }
          }
        }
      }
    })
  })
})

function search(searchList, searchTerm) {
  if (!searchTerm) {
    console.log("Nothing searched")
  } else {
    for (i of searchList) {
      if (
        i.slice(0, searchTerm.length).toLowerCase() === searchTerm.toLowerCase()
      ) {
        results.push(i)
      }
    }
    results.sort()
  }
}

document.querySelectorAll('.team-section-box').forEach(team => {
  team.addEventListener('click', () => {
    navigateToTeamPage(team.id)
  })
})

function navigateToTeamPage(id) {
  document.querySelectorAll('.team-page').forEach(teamPage => {
    if (teamPage.id === id) {
      teamPage.classList.remove('hidden')
      document.getElementById('everythingWrap').classList.add('hidden')
      document.getElementById('logo').src = '/images/bof.png'
      window.scrollTo({ top: 0, behavior: 'smooth'}) // ChatGPT code snippet, it looked weird when clicking on a team because it opened at the bottom of the page
    } else {
      teamPage.classList.add('hidden')
    }
  })
}