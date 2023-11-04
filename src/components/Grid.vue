<script lang="ts">
import { defineComponent } from 'vue';
import GridItem from './GridItem.vue';
import { selectedTile, levels, selectedLevel } from '../tiles';
import styles from '../styles/Grid.module.css';

export default defineComponent({
    data() {
        return {
            styles,
            selectedTile,
            levels,
            selectedLevel
        }
    },
    methods: {
        edited() {
            window.addEventListener('beforeunload', e => {
                e.preventDefault();
                return (e.returnValue = "");
            });
        }
    },
    components: { GridItem }
});
</script>
<template>
    <div :class="styles.grid" @mousedown="edited">
        <GridItem
            v-for="(tile, i) in levels[selectedLevel.index]"
            :key="i"
            :id="tile"
            ref="tile"
        />
    </div>
</template>