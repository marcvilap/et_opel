const revealsObserver = new IntersectionObserver(entries => {
	entries.forEach(({ isIntersecting, target }) => {
		target.classList.toggle('reveal', !isIntersecting)
		target.classList.toggle('revealed', isIntersecting)
	})
})

document.querySelectorAll('.reveal').forEach(element => revealsObserver.observe(element))

const buttonsTab = document.querySelectorAll<HTMLButtonElement>('[data-tab]')
const tabs = document.querySelectorAll<HTMLDivElement>('[id^="tab-"]')

buttonsTab.forEach(button => {
	button.addEventListener('click', () => {
		buttonsTab.forEach(item => item.classList.replace('bg-stone-200', 'bg-stone-100'))
		button.classList.replace('bg-stone-100', 'bg-stone-200')
		tabs.forEach(item => item.classList.add('hidden'))
		document.querySelector(button.dataset.tab!)?.classList.remove('hidden')
	})
})
