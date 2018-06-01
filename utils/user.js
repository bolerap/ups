const RANK = require('../constants/rank');
const SCORE = require('../constants/score');

module.exports = {
	getScore: function (ansArr) {
		let scores = 0;
		for (ans of ansArr) {
			const validType = Object.keys(SCORE).indexOf(ans.question);
			const validChoice = Object.keys(SCORE[ans.question]).indexOf(ans.choice.toString());
			if (ans.question && ans.choice && validType !== -1 && validChoice !== -1) {
				scores += SCORE[ans.question][ans.choice];
			}
			else {
				return false;
			}
		}
		return scores;
	},
	getRank: function (score) {
		let rank = '';
		switch (true) {
			case score >= 8:
				rank = RANK.A;
				break;
			case score >= 6:
				rank = RANK.B;
				break;
			case score >= 4:
				rank = RANK.C;
				break;
			case score >= 2:
				rank = RANK.C;
				break;
		}

		if (rank === '') {
			return false;
		}
		return rank;
	}
}
