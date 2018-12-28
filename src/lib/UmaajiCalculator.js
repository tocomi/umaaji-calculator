export default class {

  calculateOneRace(race) {
    let score = 0

    score = this._calculateDiff(score, Number(race.diff))
    score = this._calculateGrade(score, race.grade)

    return Math.round(score * 10) / 10
  }

  _calculateDiff(score, diff) {
    if (diff < -0.5) {
      score += 20
    }
    if (diff < -0.2 && diff >= -0.5) {
      score += 17
    }
    if (diff < 0 && diff >= -0.2) {
      score += 15
    }
    if (diff < 0.2 && diff >= 0) {
      score += 13
    }
    if (diff < 0.5 && diff >= 0.2) {
      score += 10
    }
    if (diff < 0.7 && diff >= 0.5) {
      score += 8
    }
    if (diff < 1 && diff >= 0.7) {
      score += 5
    }
    return score
  }

  _calculateGrade(score, grade) {
    if (grade === 'G1') {
      return score *= 2
    }
    if (grade === 'G2') {
      return score *= 1.7
    }
    if (grade === 'G3') {
      return score *= 1.4
    }
    if (grade === 'OP') {
      return score *= 1.2
    }
    return score
  }
}