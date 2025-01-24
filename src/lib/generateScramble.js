const moves = ['R', 'L', 'U', 'D', 'F', 'B'];

moves.push(...moves.map((n) => n + "'"), ...moves.map((n) => n + '2'));

/**
 * @param {any[]} [arr=[]]
 */
function rand(arr = []) {
	return Math.floor(Math.random() * arr.length);
}

export function generateScramble(size = 20) {
	/**
	 * @type {string[]}
	 */
	const scramble = [];

	for (let i = 0; i < size; i++) {
		const previous = scramble[scramble.length - 1];
		const filtered = moves.filter((m) => m[0] !== previous?.[0]);
		const move = filtered[rand(filtered)];

		scramble.push(move);
	}

	return scramble;
}
