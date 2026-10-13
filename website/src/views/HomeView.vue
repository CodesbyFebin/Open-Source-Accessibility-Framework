<script setup lang="ts">
import MarkdownPage from "../components/MarkdownPage.vue";
import readmeMarkdown from "../../../README.md?raw";
</script>

<template>
  <MarkdownPage
    :markdown="readmeMarkdown"
    source-path="README.md"
    class="readme"
  />
</template>

<style scoped>
.readme .markdown-page__content table {
  display: flex;
  overflow-x: auto;
  border-block: var(--line-hairline) solid var(--color-line);
  margin-top: var(--space-m);
}

.readme .markdown-page__content thead {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.readme .markdown-page__content tbody {
  display: flex;
  width: 100%;
}

.readme .markdown-page__content tr {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: var(--space-2xs);
  padding: var(--space-m);
  border-inline-start: var(--line-hairline) solid var(--color-line);
}

.readme .markdown-page__content tr:first-child {
  border-inline-start: none;
}

.readme .markdown-page__content th,
.readme .markdown-page__content td {
  padding: var(--space-2xs) var(--space-s);
  border-bottom: var(--line-hairline) solid var(--color-line);
  text-align: left;
  vertical-align: top;
}

.readme .markdown-page__content td {
  padding: 0;
  border-bottom: none;
}

.readme .markdown-page__content td:first-child strong {
  display: block;
  color: var(--color-ink);
  font-size: var(--size-subhead);
}

.readme .markdown-page__content td:first-child strong a {
  text-decoration: underline;
  text-decoration-color: var(--color-signal);
  text-decoration-thickness: var(--line-rule);
  text-underline-offset: 0.1875rem;
}

.readme .markdown-page__content td:last-child {
  color: var(--color-ink-muted);
}

.readme :deep(.markdown-page__content p:has(> img[src*="/sponsors/"])) {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-l);
  margin-top: var(--space-m);
}

.readme :deep(.markdown-page__content img[src*="/sponsors/github-mark"]) {
  width: 5rem;
  height: auto;
}

.readme :deep(.markdown-page__content img[src*="/sponsors/microsoft-"]) {
  width: min(14rem, 100%);
  height: auto;
}

.readme :deep(.markdown-page__content img[src$="#gh-dark-mode-only"]) {
  display: none;
}

@media (prefers-color-scheme: dark) {
  .readme :deep(.markdown-page__content img[src$="#gh-light-mode-only"]) {
    display: none;
  }

  .readme :deep(.markdown-page__content img[src$="#gh-dark-mode-only"]) {
    display: block;
  }
}
</style>
