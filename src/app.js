const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

// define paths for exress config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

const app = express()

const port = process.env.PORT || 3000

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


// setup stativ dir to serve
app.use(express.static(publicDirPath))


// app.get('', (req, res) => {

//     res.send('<h1>Hello Express</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Weather app by Sumit'
    })
})

app.get('/help', (req, res) => {
    // res.send(app.use(express.static(publicDirPath+'/help')))
    res.render('help',{
        title: 'Help',
        helpText:'This Blog is goung to be very helpful',
        name:'Created By Sumit'
    })
})

app.get('/about', (req, res) => {
    // res.send('<h2>About page rendering</h2>') // static html page
    res.render('about',{
        title: 'About Me',
        name: 'Created By Sumit'
    })
})

app.get('/weather', (req, res) => {

    const addressToPass = req.query.address

    if (!addressToPass) {
        return res.send(
            {
                error:'Address must be provided'
            }
        )
    }

    console.log(addressToPass)
    // comment added

    // geocode(addressToPass, (error, data) => { // for data directly without parsed

    geocode(addressToPass, (error, {latitude=0.0, longitude=0.0, locationName=''}={}) => {

        console.log(error)
        // console.log(data)
        if (error) {
            return res.send({error:error})
        }
    
        // const {
        //     latitude, longitude, locationName} = data
    
        forecast(latitude, longitude, (error, foreCastdata) => {
            console.log('Error', error)
    
            if (error) {
                return res.send({error:error})
            }
    
        
            // console.log(foreCastdata.daily.data[0].summary + ' Its currently ' + (foreCastdata.currently.temperature) + ' degrees outside. There is ' + foreCastdata.currently.precipProbability + ' % of chance to rain')

            res.send({
                location: locationName,
                foreCastdata:foreCastdata.daily.data[0].summary + ' Its currently ' + (foreCastdata.currently.temperature) + ' degrees outside. There is ' + foreCastdata.currently.precipProbability + ' % of chance to rain'
                +' and wind speed would be '+(foreCastdata.currently.windSpeed),
                
                address:addressToPass
            })
        })
    
    })


    
})

app.get('/help/*',(req, res)=>{

    // res.send('Help article not found')
    res.render('notfound',{
        title: 'Help article not found',
        name: 'Created By Sumit'
    })
})

app.get('*',(req, res)=>{

//    res.send('My 404 Page')
   res.render('notfound',{
    title: 'Page not found',
    name: 'Created By Sumit'
})
})


app.listen(port, () => {
    console.log('server is up on port '+ port)
})