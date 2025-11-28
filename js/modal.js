let modal = document.getElementById("myModal")

let buttons = document.querySelectorAll('.team-page-highlight')
buttons.forEach(el => {
  el.addEventListener('click', (e) => {
    document.getElementById('video').src = e.target.value
    modal.style.display = "block"
  })
})

document.getElementsByClassName("close")[0].addEventListener('click', (e) => {
  modal.style.display = "none"
  document.getElementById('video').src = ""
})

window.addEventListener('click', (e) => {
  if (e.target == modal) {
  modal.style.display = "none"
    document.getElementById('video').src = ""
  }  
})