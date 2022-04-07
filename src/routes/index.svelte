<script lang="ts">

import { goto } from "$app/navigation";
import { modal } from "../stores";
import Modal from "./Modal.svelte";
import { db, type RosterEntry }  from "../db";

let game = "";
let scouting = "";

async function updateGame() {
  let result: Array<RosterEntry> = []
  let matches = game.split("\n");
  for (let i = 0; i < matches.length; i++) {
    let match = matches[i].split("\t");
    if (match.length == 7) {
      result = [...result, ({matchNum: parseInt(match[0]), blue1: parseInt(match[1]), blue2: parseInt(match[2]), blue3: parseInt(match[3]), red1: parseInt(match[4]), red2: parseInt(match[5]), red3: parseInt(match[6])})]
    }
  }

  await db.gameRoster.clear();
  await db.gameRoster.bulkAdd(result);

  modal.set("");
}
async function updateScouting() {
  let result: Array<RosterEntry> = []
  let matches = scouting.split("\n");
  for (let i = 0; i < matches.length; i++) {
    let match = matches[i].split("\t");
    if (match.length == 7) {
      result = [...result, ({matchNum: parseInt(match[0]), blue1: parseInt(match[1]), blue2: parseInt(match[2]), blue3: parseInt(match[3]), red1: parseInt(match[4]), red2: parseInt(match[5]), red3: parseInt(match[6])})]
    }
  }

  await db.scoutingRoster.clear();
  await db.scoutingRoster.bulkAdd(result);

  modal.set("");
}

</script>
{#if $modal == "game"}
<Modal>
  <h1 class="text-2xl mb-8 dark:text-white">Update Game Roster</h1>
  <div class="flex flex-col">
    <textarea class="h-32 p-2 resize-none rounded border-4 bg-gray-100 border-gray-300 dark:text-white dark:bg-slate-900 dark:border-slate-900 focus:outline-none focus:border-gray-500 focus:dark:border-black" bind:value={game}></textarea>
    <button class="px-2 py-1 mt-4 rounded bg-green-400 xl:hover:bg-green-500 active:bg-green-600" on:click={async () => {await updateGame()}}>Confirm</button>
  </div>
</Modal>
{/if}

{#if $modal == "scouting"}
<Modal>
  <h1 class="text-2xl mb-8 dark:text-white">Update Scouting Roster</h1>
  <div class="flex flex-col">
    <textarea class="h-32 p-2 resize-none rounded border-4 bg-gray-100 border-gray-300 dark:text-white dark:bg-slate-900 dark:border-slate-900 focus:outline-none focus:border-gray-500 focus:dark:border-black" bind:value={scouting}></textarea>
    <button class="px-2 py-1 mt-4 rounded bg-green-400 xl:hover:bg-green-500 active:bg-green-600" on:click={async () => {await updateScouting()}}>Confirm</button>
  </div>
</Modal>
{/if}

<div class="flex h-full flex-col items-center dark:bg-slate-700">
  <div class="w-full my-auto">
    <div class="flex flex-row w-full">
      <div class="w-6/12 flex items-center justify-center">
        <button class="w-3/4 h-64 rounded bg-yellow-300 border-4 border-yellow-500 xl:hover:bg-yellow-400 active:bg-yellow-500" on:click={() => goto("./import")}>
          <p class="text-2xl">Import Match Data</p>
        </button>
      </div>
      <div class="w-6/12 flex items-center justify-center">
        <button class="w-3/4 h-64 rounded bg-yellow-300 border-4 border-yellow-500 xl:hover:bg-yellow-400 active:bg-yellow-500" on:click={() => goto("./export")}>
          <p class="text-2xl">Export Assignments</p>
        </button>
      </div>
    </div>
    <div class="flex flex-row w-full mt-12">
      <div class="w-6/12 flex items-center justify-center">
        <button class="w-3/4 h-64 rounded bg-purple-300 border-4 border-purple-500 xl:hover:bg-purple-400 active:bg-purple-500" on:click={() => {game = "";modal.set("game")}}>
          <p class="text-2xl">Update Game Roster</p>
        </button>
      </div>
      <div class="w-6/12 flex items-center justify-center">
        <button class="w-3/4 h-64 rounded bg-purple-300 border-4 border-purple-500 xl:hover:bg-purple-400 active:bg-purple-500"  on:click={() => {scouting = "";modal.set("scouting")}}>
          <p class="text-2xl">Update Scouting Roster</p>
        </button>
      </div>
    </div>
  </div>
</div>