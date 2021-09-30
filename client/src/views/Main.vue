<template>
<div>
    <navigation-bar/>
    <garden-slide/>
</div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import GardenSlide from '../components/GardenSlide.vue'

export default {
    name: 'main',
    components: {
        NavigationBar,
        GardenSlide
    }
}
</script>
