import { type Writable, writable } from "svelte/store";
import type { Assignment, Competition, Match, Student } from "./db";

export const page: Writable<string> = writable("");
export const modal: Writable<string> = writable("");