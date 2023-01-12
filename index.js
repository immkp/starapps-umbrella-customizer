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

const BLUE = 'blue'
const PINK = 'pink'
const YELLOW = 'yellow'

// store the current umbrella color to avoid the loading of same image
let currentUmbrellaColor = BLUE

// used to provide loading effect when umbrella color is changed or logo is applied
const showLoader = () => {
  if (logoImage.getAttribute('src') !== '#') logoImage.classList.add('hide')
  loader.classList.remove('hide')
  setTimeout(() => {
    loader.classList.add('hide')
    umbrella.classList.remove('hide')
    if (logoImage.getAttribute('src') !== '#')
      logoImage.classList.remove('hide')
  }, 2000)
}

// changes the visible umbrella to pink colored umbrella
pinkButton.addEventListener('click', () => {
  if (currentUmbrellaColor === PINK) return
  currentUmbrellaColor = PINK

  umbrella.classList.add('hide')
  showLoader()
  umbrella.setAttribute('src', 'images/Pink%20umbrella.png')
  favIcon.setAttribute('href', 'images/Pink%20umbrella.png')

  body.style.backgroundColor = 'rgba(225, 0, 255, 0.141)'
})

// changes the visible umbrella to yellow colored umbrella
blueButton.addEventListener('click', () => {
  if (currentUmbrellaColor === BLUE) return
  currentUmbrellaColor = BLUE

  umbrella.classList.add('hide')
  showLoader()
  umbrella.setAttribute('src', 'images/Blue%20umbrella.png')
  favIcon.setAttribute('href', 'images/Blue%20umbrella.png')

  body.style.backgroundColor = 'rgba(0, 0, 255, 0.123)'
})

// changes the visible umbrella to yellow colored umbrella
yellowButton.addEventListener('click', () => {
  if (currentUmbrellaColor === YELLOW) return
  currentUmbrellaColor = YELLOW

  umbrella.classList.add('hide')
  showLoader()
  umbrella.setAttribute('src', 'images/Yellow%20umbrella.png')
  favIcon.setAttribute('href', 'images/Yellow%20umbrella.png')

  body.style.backgroundColor = '#ffffe3'
})

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
  console.log('Event triggered')
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
  //creating a fake url for logo
  const url = URL.createObjectURL(file)
  umbrella.classList.add('hide')

  showLoader()

  logoImage.setAttribute('src', url)
  logoImage.classList.remove('hide')
  showDeleteButton(event.target.value)
}

logoFile.addEventListener('change', uploadHandler)

// this uploader element is used since styling of input[type='file'] is not supported across all browsers
// hence we have a button which on click, calls the change event of file type input.
document.getElementById('uploader').addEventListener('click', () => {
  logoFile.click()
})
