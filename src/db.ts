// db.ts
import Dexie, { type Table } from 'dexie';
import { indexedDB, IDBKeyRange } from "fake-indexeddb";


export interface Match {
  matchNum: number;
  competition: number;
  teams: Array<number>;
  students: Array<number>;
  studentAssignments: Record<number, Assignment>;
  quantitativeData: Record<number, QuantitativeData>;
  qualitativeData: Record<number, QualitativeData>;
}

export interface QuantitativeData {
  alliance: 'b' | 'r';
  autoLeave: boolean;
  autoLow: number;
  autoHigh: number;
  teleopLow: number;
  teleopHigh: number;
  rung: -1 | 0 | 1 | 2 | 3 | 4;
  fouls: number;
  techFouls: number;
  incap: number;
}


export interface QualitativeData {
  alliance: 'b' | 'r';
  driverSkill: number;
  sturdiness: number;
  compatibility: number;
  notes: string;
}

export interface Assignment {
  student: number;
  team: number;
  team2?: number;
  team3?: number;
  matchNum: number;
  alliance: 'b' | 'r';
  type: 'quant' | 'qual';
}

export interface Result {
  type: 'quant' | 'qual';
  id: number;
  matchNum: number;
  team: number;
  data: QuantitativeData;
}

export interface Student {
  id: number;
  name: string;
}

export interface RosterEntry {
  matchNum: number;
  blue1: number;
  blue2: number;
  blue3: number;
  red1: number;
  red2: number;
  red3: number;
}

export class Database extends Dexie {
  assignments!: Table<Assignment>;
  results!: Table<Result>;
  gameRoster!: Table<RosterEntry>;
  scoutingRoster!: Table<RosterEntry>;

  constructor() {
    super('servdb');
    this.version(1).stores({
      gameRoster: 'matchNum',
      scoutingRoster: 'matchNum'
    });
  }
}

export const db = new Database();