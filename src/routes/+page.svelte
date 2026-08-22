<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Education from '$lib/components/Education.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import TravelMap from '$lib/components/TravelMap.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';
</script>

<Hero />
<About />
<SectionRail seed="experience" />
<Experience />
<Skills />
<SectionRail seed="projects" />
<Projects />
<Education />
<TravelMap />
<SectionRail seed="contact" />
<Contact />
