import readline from 'readline';

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

reader.on('line', (line) => {
	console.log(line.split('').reverse().join(''))
})