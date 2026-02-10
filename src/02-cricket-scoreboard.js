/**
 * 🏏 Gully Cricket Scoreboard
 *
 * Mohalle ke bacche gully cricket khel rahe hain. Tu scorekeeper hai bhai!
 * Har ball ka outcome ek array mein diya gaya hai. Tujhe scoreboard banana hai.
 *
 * Ball outcomes:
 *   - 0 = dot ball (no run)
 *   - 1 to 6 = runs scored on that ball
 *   - -1 = WICKET! Batsman out ho gaya
 *
 * Rules:
 *   - Loop through each ball in the array using a for loop
 *   - Track: totalRuns, totalBalls (all balls including wickets),
 *     wickets, fours (ball === 4), sixes (ball === 6)
 *   - IMPORTANT: Agar 10 wickets ho gaye, toh STOP! (use break)
 *     Innings khatam. Remaining balls are not counted.
 *
 * Validation:
 *   - Agar balls ek array nahi hai ya empty array hai,
 *     return karo: { totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0 }
 *
 * @param {number[]} balls - Array of ball outcomes
 * @returns {{ totalRuns: number, totalBalls: number, wickets: number, fours: number, sixes: number }}
 *
 * @example
 *   cricketScoreboard([4, 0, 6, -1, 2, 1])
 *   // => { totalRuns: 13, totalBalls: 6, wickets: 1, fours: 1, sixes: 1 }
 *
 *   cricketScoreboard([])
 *   // => { totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0 }
 */
export function cricketScoreboard(balls) {
  let result = {totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0}

  if (!Array.isArray(balls) || !balls.every(Number.isFinite)) {
  return result;
}
  for (let ball = 0; ball < balls.length; ball++) {
    let current_ball = balls[ball]

    if(result.wickets >= 10){ 
      break;
    }
    switch (current_ball) {
      case -1:
        result.wickets++ ? result.wickets <= 10 : 10;
        break;
      case 6:
        result.totalRuns += 6;
        result.sixes++;
        break;
      case 4:
        result.totalRuns += 4
        result.fours++;
      case 0:
        break;
      default:
        result.totalRuns += current_ball;
        break;
    }
    result.totalBalls++;
  }

  return result;
}

cricketScoreboard([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 4])