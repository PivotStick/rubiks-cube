const moves = ['R', 'L', 'U', 'D', 'F', 'B'];

moves.push(...moves.map((n) => n + "'"), ...moves.map((n) => n + '2'));

export function generateScramble(size = 20) {
	/**
	 * @type {string[]}
	 */
	const scramble = [];

	for (let i = 0; i < size; i++) {
		const index = Math.floor(Math.random() * moves.length);
		scramble.push(moves[index]);
	}

	return scramble;
}
