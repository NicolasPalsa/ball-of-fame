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
      p.value = results[result].toString().replaceAll(" ", "_")
      div.append(p)
    }
  }

  // clicking on result function
  document.querySelectorAll('.search-result').forEach(result => {
    result.addEventListener('click', (e) => {

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

// clicking on team function
document.querySelectorAll('.team-section-box').forEach(team => {
    team.addEventListener('click', () => {
        document.querySelectorAll('.team-page').forEach(teamPage => {
            if (teamPage.id === team.id) {
                teamPage.classList.remove('hidden')
                document.getElementById('everythingWrap').classList.add('hidden')
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                teamPage.classList.add('hidden')
            }
        })
    })
})