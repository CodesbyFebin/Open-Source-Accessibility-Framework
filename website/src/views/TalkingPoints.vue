<script setup lang="ts">
import MarkdownPage from "../components/MarkdownPage.vue";
import talkingPointsMarkdown from "../../../framework/supporting/talking-points.md?raw";
</script>

<template>
  <MarkdownPage
    :markdown="talkingPointsMarkdown"
    source-path="framework/supporting/talking-points.md"
  />
</template>
