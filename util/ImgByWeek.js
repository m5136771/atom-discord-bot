const weekNumber = require('./FindWeek');
const fs = require('node:fs');
const path = require('node:path');

function weeklyImage() {
    var currentWeek = weekNumber;
    var imageNames = fs.readdirSync(path.join(__dirname, '..', 'assets/facepalms'));
    
    function myCleaner(name) {
        return name.replace(/\.[^/.]+$/, "");
    }
    var imageNamesCleaned = imageNames.map(myCleaner);

    var position = imageNamesCleaned.indexOf(currentWeek.toString()) + 1;
    var img = imageNames[position];

    var chosenImagePath = path.join('./assets/facepalms', img);
    return chosenImagePath;
}

module.exports = weeklyImage();