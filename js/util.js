
function minesRandomIdx() {
     return {

        i: getRandomInt(0, gLevel.SIZE),
        j: getRandomInt(0, gLevel.SIZE)

    }
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}