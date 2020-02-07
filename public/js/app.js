console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



function fetchWeather(location, callback) {

    // fetch('http://localhost:3000/weather?address=' + location) // for local only
    fetch('/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    callback(data)
                } else {

                    callback(data)


                }

            })
        })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent =''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetchWeather(location, (data) => {
        // 
        // console.log(data.location)
        // console.log(data.foreCastdata)
        if (data.error) {
            console.log(data.error)
            messageOne.textContent = ''
        messageTwo.textContent = data.error
        } else {
            messageOne.textContent = data.location
        messageTwo.textContent = data.foreCastdata
        }
        
    })

    console.log('Submit= ' + location)
})