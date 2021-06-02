import Swal from 'sweetalert2';

// Let's set some stuff up...
let container: HTMLElement = document.getElementById('container');
let btnGenerate: HTMLElement = document.getElementById('btnGenerate');
let btnRoll: HTMLElement = document.getElementById('btnRoll');
let btnSum: HTMLElement = document.getElementById('btnSum');
let dice: Die[] = []
let counter: number = 1;

// Let's make them buttons do thangs
btnGenerate.addEventListener('click', () => dice.push(new Die()));
btnRoll.addEventListener('click', () => dice.forEach(die => die.roll()));
btnSum.addEventListener('click', () => {
    if (dice.length != 0) { // Check to make sure some dice have been rolled
        let sum = 0;
        dice.forEach(die => sum += die.value);
        Swal.fire(`Dice Sum: ${sum}`);
    } else {
        Swal.fire(`Please generate some dice.`);
    }
});

class Die {
    value: number;
    div: HTMLElement;
    id: number;

    constructor() {
        this.div = document.createElement('div');
        this.id = counter;
        this.div.classList.add('die');
        this.roll();
        this.div.id = counter.toString();
        this.div.addEventListener('click', () => this.roll());
        this.div.addEventListener('dblclick', () => {
            this.div.remove();  // Remove die html container
            removeDie(this.id); // Remove die from global array
        });
        container.appendChild(this.div);
        counter++;
    }
    
    roll() {
        this.div.classList.remove(`v${this.value}`);
        this.value = Math.floor(Math.random() * 6) + 1;
        this.div.classList.add(`v${this.value}`);    
    }
}

function removeDie(id: number): void { // Remove die from global array
    dice = dice.filter(die => die.id != id);
}