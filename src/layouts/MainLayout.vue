<template>
    <div>
        <TopNav class="mb-5"/>

        <router-view/>
    </div>
</template>

<script>

// Top Nav
import TopNav from '../components/header/index.vue';

export default {
    name: 'MainLayout',

    components: {
        TopNav,
    },
}
</script>
