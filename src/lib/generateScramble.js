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
		const previouses = scramble.slice(-2).map((s) => s[0]);
		const filtered = moves.filter((m) => !previouses.includes(m[0]));
		const move = filtered[rand(filtered)];

		scramble.push(move);
	}

	return scramble;
}
