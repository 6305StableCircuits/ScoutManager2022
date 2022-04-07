<script lang="ts">
import { modal } from "../stores";

import { db, type Result } from "../db";
import Modal from "./Modal.svelte";
import { compressAssignment } from "../compressor";

import QRCode from "qrcode";
import { onMount } from "svelte";
import { goto } from "$app/navigation";

let scoutAssignment: string = "";

onMount(async () => {
	if (typeof window !== 'undefined') {
		let canvas = document.getElementById("output");
	  let roster = await db.scoutingRoster.toArray();
		for (let i = 0; i < roster.length; i++) {
			let matchRoster = await db.gameRoster.get(roster[i].matchNum);
			scoutAssignment += compressAssignment(roster[i], matchRoster) + "|"
		}
  	scoutAssignment = scoutAssignment.substring(0,scoutAssignment.length-1);
		QRCode.toCanvas(canvas, scoutAssignment, {scale:5});
	}
})
</script>

<div class="w-full h-full flex flex-col">
	<div class="w-full flex flex-row h-16 bg-blue-500 items-center">
		<a
			href="./"
			class="absolute translate-x-3 p-2 rounded text-white text-2xl hover:bg-blue-600">Back</a
		>
		<h1 class="mx-auto text-white text-2xl">Export Data</h1>
	</div>
	<div class="h-full flex flex-col items-center justify-center">
    <canvas id="output" class="w-32 h-32 my-auto"></canvas>
	</div>
</div>