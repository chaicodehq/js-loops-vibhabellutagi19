/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here

  if (!Array.isArray(matches)) {
    return [];
  }

  const scoreTable = matches.reduce(
    (matchTable, { team1, team2, winner, result }) => {
      matchTable[team1] ??= {
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
      matchTable[team2] ??= {
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };

      matchTable[team1].played++;
      matchTable[team2].played++;

      if (result == 'tie') {
        matchTable[team1].tied++;
        matchTable[team2].tied++;

        matchTable[team1].points++;
        matchTable[team2].points++;
      } else if (result == 'no_result') {
        matchTable[team1].noResult++;
        matchTable[team2].noResult++;

        matchTable[team1].points++;
        matchTable[team2].points++;
      } else if (winner) {
        const loser = winner === team1 ? team2 : team1;
        matchTable[winner].won++;
        matchTable[winner].points += 2;
        matchTable[loser].lost++;
      }

      return matchTable;
    },
    {},
  );

  return Object.entries(scoreTable)
    .sort((a, b) => {
      if (a[1].points != b[1].points) {
        return b[1].points - a[1].points;
      } else {
        return a[0].localeCompare(b[0]);
      }
    })
    .map(([team, stats]) => ({ team, ...stats }));
}
