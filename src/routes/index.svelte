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
	let showAnswer = false;
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
		showAnswer = false;
		if (currentIndex == quizItems.length - 1) {
			startQuiz();
		} else {
			currentIndex++;
		}
	};
</script>

<div class="bg-gray-300 select-none grid place-items-center h-screen w-screen">
	{#if quizItems}
		{#if showAnswer}
			<div class="max-w-xl mx-auto">
				<h1 class="font-bold text-4xl text-center">{quizItems[currentIndex].answer}</h1>
				<div class="absolute inset-0" on:click={nextQuestion} />
			</div>
		{:else}
			<div class="max-w-xl mx-auto">
				<h1 class="font-semibold text-2xl text-center">{quizItems[currentIndex].question}</h1>
				<div class="absolute inset-0" on:click={() => (showAnswer = true)} />
			</div>
		{/if}
	{:else}
		<div on:click={startQuiz} class="absolute inset-0 grid place-items-center">
			<h1>Start Quiz</h1>
		</div>
	{/if}
</div>

<style>
</style>
