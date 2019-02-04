export default class {

  calculateOneRace(race) {
    let score = 0

    score = this._calculateDiff(score, Number(race.diff))
    score = this._calculateGrade(score, race.grade)

    return Math.round(score * 10) / 10
  }

  _calculateDiff(score, diff) {
    const baseScore = 50
    const calculatedScore = baseScore - (diff * 10 * 2)
    return calculatedScore > 0 ? calculatedScore : 0
  }

  _calculateGrade(score, grade) {
    if (grade === 'G1') {
      return score * 1.7
    }
    if (grade === 'G2') {
      return score * 1.5
    }
    if (grade === 'G3') {
      return score * 1.3
    }
    if (grade === 'OP') {
      return score * 1.1
    }
    if (grade === '1600') {
      return score
    }
    if (grade === '1000') {
      return score * 0.9
    }
    if (grade === '500') {
      return score * 0.7
    }
    return score * 0.5
  }
}