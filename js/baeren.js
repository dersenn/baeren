const docTable = document.querySelector('.table')
const docResult = document.getElementsByClassName('result')

let result

const loecher = document.querySelector('.loecher')
const baeren = document.querySelector('.baeren')
const fische = document.querySelector('.fische')

const button = document.getElementById('rollbutton')

class Dice {
  constructor(val, parent) {
    this.val = val
    this.parent = parent

    this.draw()
  }
  draw() {
    let dice = document.createElement('div')
    dice.classList.add('dice')
    dice.setAttribute('data-val', this.val)
    this.parent.append(dice)

    this.p = this.pattern(this.val)
    console.log(this.p)
    for (let i = 0; i < 9; i++) {
      let dot = document.createElement('div')
      dot.classList.add('dot')

      if (this.p[i]) dot.classList.add('show')
      
      dice.append(dot)
    }
  }
  pattern(val) {
    let pattern
    switch (val) {
      case 1:
        pattern = [
          false, false, false,
          false, true, false,
          false, false, false
        ]
        break
      case 2:
        pattern = [
          false, false, true,
          false, false, false,
          true, false, false
        ]
        break
      case 3:
        pattern = [
          false, false, true,
          false, true, false,
          true, false, false
        ]
        break
      case 4:
        pattern = [
          true, false, true,
          false, false, false,
          true, false, true
        ]
        break
      case 5:
        pattern = [
          true, false, true,
          false, true, false,
          true, false, true
        ]
        break      
      case 6:
        pattern = [
          true, false, true,
          true, false, true,
          true, false, true
        ]
        break
      default:
        pattern = [
          false, true, false,
          true, true, true,
          false, true, false
        ]
    }
    return pattern
  }
}

rollDice(6)

function rollDice(nDice) {

  let res = {
    loecher: 0,
    baeren: 0,
    fische: 0
  }
  for (let i = 0; i < nDice; i++) {
    let val = randInt(1, 6)

    if (val%2 != 0) {
      res.loecher++
      res.baeren += val - 1
    }
    res.fische += 7 - val

    new Dice(val, docTable)
    // docTable.append(dice)
  }

  result = res

  // Add Results
  for (let i = 0; i < docResult.length; i++) {
    const result = docResult[i];

    if (result.classList.contains('loecher')) {
      result.querySelector('.res-label').innerHTML = 'L?'
      result.querySelector('.res-value').innerHTML = '???'
    }
    if (result.classList.contains('baeren')) {
      result.querySelector('.res-label').innerHTML = 'B?'
      result.querySelector('.res-value').innerHTML = '???'
    }
    if (result.classList.contains('fische')) {
      result.querySelector('.res-label').innerHTML = '?'
      result.querySelector('.res-value').innerHTML = '???'
    }
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}



loecher.addEventListener('click', (event) => {
  loecher.querySelector('.res-label').innerHTML = 'Löcher'
  loecher.querySelector('.res-value').innerHTML = result.loecher
});

baeren.addEventListener('click', (event) => {
  baeren.querySelector('.res-label').innerHTML = 'Bären'
  baeren.querySelector('.res-value').innerHTML = result.baeren
});

fische.addEventListener('click', (event) => {
  fische.querySelector('.res-label').innerHTML = 'Fische'
  fische.querySelector('.res-value').innerHTML = result.fische
});

button.addEventListener('click', (event) => {
  docTable.innerHTML = ''
  rollDice(6)
});