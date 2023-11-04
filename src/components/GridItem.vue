<script lang="ts">
import { defineComponent } from 'vue';
import { entityPos, selectedEntity, selectedTile, tileColors, levels, selectedLevel } from '../tiles'
import styles from '../styles/GridItem.module.css'

export default defineComponent({
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            localId: this.id,
            styles,
            selectedTile
        }
    },
    methods: {
        updateId(tileId: number) {
            /* if (
                this.$.vnode.key == entityPos[selectedLevel.index].box.x + entityPos[selectedLevel.index].box.y * 15 ||
                this.$.vnode.key == entityPos[selectedLevel.index].player.x + entityPos[selectedLevel.index].player.y * 15
            ) return; */

            if (selectedEntity.player == true) {
                entityPos[selectedLevel.index].player.x = (this.$.vnode.key as number) % 15;
                entityPos[selectedLevel.index].player.y = Math.floor((this.$.vnode.key as number) / 15);
            } else if (selectedEntity.box == true) {
                entityPos[selectedLevel.index].box.x = (this.$.vnode.key as number) % 15;
                entityPos[selectedLevel.index].box.y = Math.floor((this.$.vnode.key as number) / 15);
            }

            if (this.$.vnode.key == entityPos[selectedLevel.index].player.x + entityPos[selectedLevel.index].player.y * 15) {
                // Reset Old Player Position
                (this.$parent?.$refs.tile as any[])[entityPos[selectedLevel.index].player.x + entityPos[selectedLevel.index].player.y * 15].localId = 0;
                (this.$parent?.$refs.tile as any[])[entityPos[selectedLevel.index].player.x + entityPos[selectedLevel.index].player.y * 15].update();

                // Set Tile Type
                this.localId = 0;

                // Set Styles
                (this.$refs.item as HTMLDivElement).style.opacity = "1";
                (this.$refs.item as HTMLDivElement).style.background = "#0079f1";
                
                return;
            }
            if (this.$.vnode.key == entityPos[selectedLevel.index].box.x + entityPos[selectedLevel.index].box.y * 15) {
                // Reset Old Box Position
                (this.$parent?.$refs.tile as any[])[entityPos[selectedLevel.index].box.x + entityPos[selectedLevel.index].box.y * 15].localId = 0;
                (this.$parent?.$refs.tile as any[])[entityPos[selectedLevel.index].box.x + entityPos[selectedLevel.index].box.y * 15].update();

                // Set Tile Type
                this.localId = 0;

                // Set Styles
                (this.$refs.item as HTMLDivElement).style.opacity = "1";
                (this.$refs.item as HTMLDivElement).style.background = "#d3b083";
                
                return;
            }
            this.localId = tileId;
            this.update();
        },
        update() {
            levels[selectedLevel.index][this.$.vnode.key as number] = this.localId;

            if (this.localId == 0) {
                (this.$refs.item as HTMLDivElement).style.opacity = "0";
                return;
            }
            (this.$refs.item as HTMLDivElement).style.opacity = "1";
            (this.$refs.item as HTMLDivElement).style.background = tileColors[this.localId];
        },
        onEnter() {
            if (selectedTile.drawing) this.updateId(selectedTile.tileId);
        }
    },
    mounted() {
        if (this.$.vnode.key == entityPos[selectedLevel.index].player.x + entityPos[selectedLevel.index].player.y * 15) {
            (this.$refs.item as HTMLDivElement).style.background = "#0079f1";

            return;
        }
        if (this.$.vnode.key == entityPos[selectedLevel.index].box.x + entityPos[selectedLevel.index].box.y * 15) {
            (this.$refs.item as HTMLDivElement).style.background = "#d3b083";

            return;
        }
        this.update();
    }
});
</script>
<template>
    <div
        :class="styles.item"
        ref="item"
        @mousedown="updateId(selectedTile.tileId);"
        @mouseenter="onEnter" />
</template>