export default class {
  execute(races) {
    let score = 0
    let count = 0
    for(const race of races) {
      const diff = Number(race.diff)
      if (diff < -0.5) {
        score += 20
      }
      if (diff < -0.2 && diff >= -0.5) {
        score += 10
      }
      if (diff < 0 && diff >= -0.2) {
        score += 5
      }
    }
    console.log(score)
    return score
  }
}