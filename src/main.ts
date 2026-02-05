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

// Horizontal scroll fallback for browsers without working CSS scroll-driven animations (Firefox)
;(() => {
	const container = document.getElementById('scroll-container')
	const wrapper = document.getElementById('scroll-wrapper')
	if (!container || !wrapper) return

	const xl = window.matchMedia('(min-width: 80rem)')
	let active = false

	function onScroll() {
		const top = container!.getBoundingClientRect().top
		const scrollable = container!.offsetHeight - window.innerHeight
		if (scrollable <= 0) return
		const t = Math.min(1, Math.max(0, -top / scrollable))
		wrapper!.style.transform = `translateX(${-700 * t}vw)`
		for (const el of wrapper!.querySelectorAll<HTMLElement>('.parallax-slow')) el.style.transform = `translateX(${15 - 30 * t}vw)`
		for (const el of wrapper!.querySelectorAll<HTMLElement>('.parallax-fast')) el.style.transform = `translateX(${-15 + 30 * t}vw)`
		for (const el of wrapper!.querySelectorAll<HTMLElement>('.parallax-bg')) el.style.transform = `translateX(${8 - 16 * t}vw)`
		for (const el of wrapper!.querySelectorAll<HTMLElement>('.parallax-text')) el.style.transform = `translateX(${6 - 12 * t}vw)`
	}

	function activate() {
		if (active) return
		active = true
		container!.style.height = '800vw'
		Object.assign(wrapper!.style, {
			position: 'sticky',
			top: '0',
			display: 'grid',
			width: '800vw',
			gridTemplateColumns: 'repeat(8, 1fr)',
			willChange: 'transform',
			animation: 'none',
			transition: 'transform 0.15s ease-out',
		})
		for (const el of wrapper!.querySelectorAll<HTMLElement>('.parallax-slow, .parallax-fast, .parallax-bg, .parallax-text')) {
			el.style.animation = 'none'
			el.style.transition = 'transform 0.15s ease-out'
		}
		window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true })
		onScroll()
	}

	function check() {
		if (!xl.matches || active) return
		try {
			if (!wrapper!.getAnimations().some((a) => a.timeline && !(a.timeline instanceof DocumentTimeline))) activate()
		} catch {
			activate()
		}
	}

	requestAnimationFrame(() => requestAnimationFrame(check))
	xl.addEventListener('change', () => requestAnimationFrame(() => requestAnimationFrame(check)))
})()
