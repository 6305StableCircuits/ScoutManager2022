<script lang="ts">
	import QrScanner from 'qr-scanner';
  import Modal from './Modal.svelte';
  import { onMount } from 'svelte';
  import { db } from '../db';
import { goto } from '$app/navigation';


  let qrScanner: QrScanner

	onMount(() => {
    const videoElem = document.getElementById('scan');
		const overlay = document.getElementById('scanOverlay');
		qrScanner = new QrScanner(
			videoElem as HTMLVideoElement,
			(result) => {qrScanner.stop();navigator.clipboard.writeText(result.data)},
			{ highlightScanRegion: true, highlightCodeOutline: true, returnDetailedScanResult: true }
		);
		qrScanner.start();
  });

</script>

<div class="w-full h-full flex flex-col">
	<div class="w-full flex flex-row h-16 bg-blue-500 items-center">
		<button
			on:click={() => {qrScanner.stop(); goto('./');}}
			class="absolute translate-x-3 p-2 rounded text-white text-2xl hover:bg-blue-600">Back</button>
		<h1 class="mx-auto text-white text-2xl">Import Data</h1>
	</div>
	<!-- svelte-ignore a11y-media-has-caption -->
	<div class="h-full flex flex-col items-center justify-center">
		<div id="scanContainer" class="w-1/2 max-h-full">
			<video id="scan" />
		</div>
		<div class="mx-auto mt-10">
			<button on:click={() => {qrScanner.start();}} class="p-2 w-40 rounded text-white text-2xl bg-blue-400 hover:bg-blue-500">Scan</button>
		</div>
	</div>
</div>