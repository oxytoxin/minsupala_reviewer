<script context="module">
	export async function load({ params, fetch, session, stuff }) {
		const url = `/items`;
		const res = await fetch(url);
		if (res.ok) {
			return {
				props: {
					items: await res.json()
				}
			};
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	export let items;
	let quizItems;
	let currentIndex = 0;
	let show = false;
	let questionsFirst = true;
	const shuffleArray = (array) => {
		let newArray = array;
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = newArray[i];
			newArray[i] = newArray[j];
			newArray[j] = temp;
		}
		return newArray;
	};

	const startQuiz = () => {
		quizItems = shuffleArray(items);
	};
	const nextQuestion = () => {
		show = false;
		if (currentIndex == quizItems.length - 1) {
			startQuiz();
		} else {
			currentIndex++;
		}
	};
</script>

<div class="bg-gray-300 select-none grid place-items-center h-screen w-screen">
	<button
		class="bg-green-500 p-2 text-gray-700 z-20 fixed bottom-4 right-4"
		on:click={() => (questionsFirst = !questionsFirst)}>REVERSE</button
	>
	{#if quizItems}
		<div class="max-w-xl flex w-full h-full flex-col mx-auto">
			<div class="flex-1 flex flex-col justify-center">
				{#if questionsFirst}
					<h1 class="font-semibold text-2xl text-center">{quizItems[currentIndex].question}</h1>
				{:else}
					<h1 class="font-bold text-4xl text-center">{quizItems[currentIndex].answer}</h1>
				{/if}
			</div>
			<div class="flex-1 flex flex-col justify-center">
				{#if show}
					{#if questionsFirst}
						<h1 class="font-bold text-4xl text-center">{quizItems[currentIndex].answer}</h1>
					{:else}
						<h1 class="font-semibold text-2xl text-center">{quizItems[currentIndex].question}</h1>
					{/if}
				{/if}
			</div>
		</div>
		{#if show}
			<div class="absolute inset-0" on:click={nextQuestion} />
		{:else}
			<div class="absolute inset-0" on:click={() => (show = true)} />
		{/if}
	{:else}
		<div on:click={startQuiz} class="absolute inset-0 grid place-items-center">
			<h1>Start Quiz</h1>
		</div>
	{/if}
</div>

<style>
</style>
