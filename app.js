const express = require('express');
const app = express();
const ejs = require('ejs');
const { type } = require('jquery');
const mongoose = require('mongoose');
const dateDiff = require(__dirname+'/date.js');

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

let months = {
            "Siječanj":31,
            "Veljača":28,
            "Ožujak":31,
            "Travanj":30,
            "Svibanj":31,
            "Lipanj":30,
            "Srpanj":31,
            "Kolovoz":31,
            "Rujan":30,
            "Listopad":31,
            "Studeni":30,
            "Prosinac":31
}

var getDates = function(startDate, endDate) {
    var dates =  [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate);
    }
    return dates;
  };

const roomSchema = new mongoose.Schema({
    room_type: Number,
    room_name: String,
    isReserved: Boolean,
    reservedDates: []
});

const Room = mongoose.model('Room', roomSchema);

const casualRoom = new Room({
    room_type: 1,
    room_name: 'Casual',
    isReserved: false,
    reservedDates: []
});

const superiorRoom = new Room({
    room_type: 2,
    room_name: 'Superior',
    isReserved: false,
    reservedDates: []
});

const luxuryRoom = new Room({
    room_type: 3,
    room_name: 'Luxury',
    isReserved: false,
    reservedDates: []
});


app.get('/', (req,res) => {
    res.render(__dirname + '/views/index.ejs');
});

app.post('/hotel', (req, res)=>{
    const searchedDates= req.body.dates;
    const searchedAdults= req.body.adults;
    const searchedChildren= req.body.children;

    const firstDateString = searchedDates.slice(0, 10);
    const secondDateString = searchedDates.slice(10, searchedDates.length);

    const firstDateFormat = new Date(firstDateString + 'Z');
    const secondDateFormat = new Date(secondDateString + 'Z');

    var rangeOfDates = getDates(firstDateFormat, secondDateFormat);
    let stringdate = rangeOfDates.toString();
    console.log(stringdate);
    console.log(casualRoom.reservedDates);

    let cassualRoomAvailability = '';
    casualRoom.reservedDates.forEach(e => {
        if(rangeOfDates.includes(e)){
            cassualRoomAvailability = 'Nije raspoloživo!';
        } else {
            cassualRoomAvailability = 'Raspoloživo!';
        }
    });
    
    let superiorRoomAvailability = 'Raspoloživo!';
    superiorRoom.reservedDates.forEach(e => {
        if(firstDateFormat == e || secondDateFormat == e){
            superiorRoomAvailability = 'Nije raspoloživo!';
        } else {
            superiorRoomAvailability = 'Raspoloživo!';
        }
    });
    let luxuryRoomAvailability = 'Raspoloživo!';
    luxuryRoom.reservedDates.forEach(e => {
        if(firstDateFormat == e || secondDateFormat == e){
            luxuryRoomAvailability = 'Nije raspoloživo!';
        } else {
            luxuryRoomAvailability = 'Raspoloživo!';
        }
    });
    let nightString = 'noćenja';
    let daysDiff = dateDiff.calculateDaysBetweenDates(searchedDates);

    if (daysDiff ===  0 || daysDiff === 21){
        nightString = 'noćenje';
    };

    res.render(__dirname + '/views/hotel.ejs', {
        dates: searchedDates,
        adults:searchedAdults,
        children:searchedChildren,
        daysDiff: daysDiff,
        cassualRoomAvailability: cassualRoomAvailability,
        superiorRoomAvailability: superiorRoomAvailability,
        luxuryRoomAvailability: luxuryRoomAvailability,
        nightString: nightString
    });
    
    app.post('/complete', (req,res) =>{
        if(req.body.cassual){
            rangeOfDates.forEach(e => {
                casualRoom.reservedDates.push(e);
                
            });
        }
        res.render(__dirname + '/views/partials/complete.ejs', {
            dates: searchedDates,
            adults:searchedAdults,
            children:searchedChildren,
            daysDiff: daysDiff,
        });
    });
});

app.listen(3000, () => {
    console.log('Server is up and running!')
});