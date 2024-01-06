<script lang="ts">
import { defineComponent, toRaw } from 'vue';
import { entityPos, selectedEntity, selectedTile, tiles, levels, selectedLevel, Vector2 } from '../tiles'
import { TILE_SIZE } from '../compile';

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
            selectedTile,
            tiles,
            TILE_SIZE
        }
    },
    methods: {
        updateId(tileId: number) {
            /* if (
                this.$.vnode.key == entityPos[selectedLevel.index].box.x + entityPos[selectedLevel.index].box.y * 15 ||
                this.$.vnode.key == entityPos[selectedLevel.index].player.x + entityPos[selectedLevel.index].player.y * 15
            ) return; */

            let oldPos: Vector2| null = null;
            if (selectedEntity.player == true) {
                oldPos = structuredClone(toRaw(entityPos[selectedLevel.index].player));

                entityPos[selectedLevel.index].player.x = (this.$.vnode.key as number) % 15;
                entityPos[selectedLevel.index].player.y = Math.floor((this.$.vnode.key as number) / 15);
            } else if (selectedEntity.box == true) {
                oldPos = structuredClone(toRaw(entityPos[selectedLevel.index].box));

                entityPos[selectedLevel.index].box.x = (this.$.vnode.key as number) % 15;
                entityPos[selectedLevel.index].box.y = Math.floor((this.$.vnode.key as number) / 15);
            }

            if (this.$.vnode.key == entityPos[selectedLevel.index].player.x + entityPos[selectedLevel.index].player.y * 15) {
                if (oldPos == null) oldPos = entityPos[selectedLevel.index].player;

                // Reset Old Player Position
                (this.$parent?.$refs.tile as any[])[oldPos.x + oldPos.y * 15].localId = 0;
                (this.$parent?.$refs.tile as any[])[oldPos.x + oldPos.y * 15].update();

                // Set Tile Type
                this.localId = 0;

                // Set Styles
                (this.$refs.item as HTMLDivElement).style.opacity = "1";
                (this.$refs.item as HTMLDivElement).style.background = "#0079f1";
                
                return;
            }
            if (this.$.vnode.key == entityPos[selectedLevel.index].box.x + entityPos[selectedLevel.index].box.y * 15) {
                if (oldPos == null) oldPos = entityPos[selectedLevel.index].box;

                // Reset Old Box Position
                (this.$parent?.$refs.tile as any[])[oldPos.x + oldPos.y * 15].localId = 0;
                (this.$parent?.$refs.tile as any[])[oldPos.x + oldPos.y * 15].update();

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
            (this.$refs.item as HTMLDivElement).style.background = tiles[this.localId].color;
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
        ref="item"
        @mousedown="updateId(selectedTile.tileId);"
        @mouseenter="onEnter"
        :style="{
            width: `${tiles[localId].size.x * 100}%`,
            height: `${tiles[localId].size.y * 100}%`,
            position: 'relative',
            left: `${tiles[localId].offset.x * 100}%`,
            top: `${tiles[localId].offset.y * 100}%`
        }" />
</template>