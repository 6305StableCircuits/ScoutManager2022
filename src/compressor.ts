
// FORMAT:
// "student.match.team1.alliance" OR "student.match.team1.team2.team3.alliance"
// ie: "student.match.team1.alliance|student2.match.team2.alliance|student3.match.team1.team2.team3.alliance"

import type { RosterEntry } from "./db";


// "student.match.team1.alliance" OR "student.match.team1.team2.team3.alliance"

export function compressAssignment(assignment: RosterEntry, matchRoster: RosterEntry) {
  return `${assignment.blue1}.${assignment.matchNum}.${matchRoster.blue1}.b|${assignment.blue2}.${assignment.matchNum}.${matchRoster.blue2}.b|${assignment.blue3}.${assignment.matchNum}.${matchRoster.blue3}.b|${assignment.red1}.${assignment.matchNum}.${matchRoster.red1}.r|${assignment.red2}.${assignment.matchNum}.${matchRoster.red2}.r|${assignment.red3}.${assignment.matchNum}.${matchRoster.red3}.r`;
}