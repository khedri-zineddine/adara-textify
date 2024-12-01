<template>
  <div class="flex flex-col gap-4 w-[694px]">
    <div class="relative flex flex-col gap-2">
      <div
        class="min-h-[200px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <div
          v-if="audioStore.isTranscribing"
          class="flex items-center justify-center h-full"
        >
          <div class="animate-pulse text-gray-500">Transcribing...</div>
        </div>
        <div
          v-else-if="audioStore.transcriptedText"
          class="whitespace-pre-wrap"
        >
          {{ audioStore.transcriptedText }}
        </div>
        <div
          v-else
          class="flex items-center justify-center h-full text-gray-500"
        >
          Record audio to see transcription
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAudioStore } from '~/stores/useAudioStore'
  const audioStore = useAudioStore()
</script>
