const pinkButton = document.getElementById('pink-button')
const blueButton = document.getElementById('blue-button')
const yellowButton = document.getElementById('yellow-button')
const deleteButton = document.getElementById('delete-button')
const logoFile = document.getElementById('logo-file')
const umbrella = document.getElementById('umbrella')
const logoImage = document.getElementById('logo')
const loader = document.getElementById('loader')
const body = document.getElementById('body')
const fileNameLabel = document.getElementById('file-name')
const favIcon = document.querySelector("link[rel*='icon']")

let currentUmbrellaColor = 'blue'

const showLoader = () => {
  if (logoImage.getAttribute('src') !== '#') logoImage.classList.add('hide')
  loader.classList.remove('hide')
  setTimeout(() => {
    loader.classList.add('hide')
    umbrella.classList.remove('hide')
    if (logoImage.getAttribute('src') !== '#')
      logoImage.classList.remove('hide')
  }, 100)
}

const fetchData = async () => {
  await fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      data.map((details) => {
        let button = eval(details['button'])
        button.addEventListener('click', () => {
          if (currentUmbrellaColor === details['color']) return
          currentUmbrellaColor = details['color']

          umbrella.classList.add('hide')
          showLoader()

          umbrella.setAttribute('src', details['imageLink'])
          favIcon.setAttribute('href', details['imageLink'])

          body.style.backgroundColor = details['backgroundColor']
        })
      })
    })
    .catch((error) => console.error(error))
}

fetchData()


// this function is used to show delete button if logo is applied
const showDeleteButton = (file) => {
  logoFile.classList.add('hide')
  deleteButton.classList.remove('hide')
  fileNameLabel.innerText = file.split('\\')[2].toUpperCase()
}

deleteButton.addEventListener('click', () => {
  logoImage.setAttribute('src', '#')
  logoImage.classList.add('hide')
  deleteButton.classList.add('hide')
  fileNameLabel.innerText = 'Upload Logo'
  logoFile.value = null
})

// when logo file is uploaded, this function handles the visibility of every element related to the file
const uploadHandler = (event) => {
  const file = event.target.files[0]
  if (!file) {
    console.log('Choose one file!')
    return
  }
  const fileSize = Math.round(file.size / (1024 * 1024)) // In MB
  if (fileSize > 5) {
    console.error('File size Exceed the limit !!', `File Size: ${fileSize}`)
    return
  }
  const url = URL.createObjectURL(file)
  umbrella.classList.add('hide')

  showLoader()

  logoImage.setAttribute('src', url)
  logoImage.classList.remove('hide')
  showDeleteButton(event.target.value)
}

logoFile.addEventListener('change', uploadHandler)

document.getElementById('uploader').addEventListener('click', () => {
  logoFile.click()
})
