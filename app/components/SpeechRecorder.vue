<template>
  <div
    class="col-span-2 lg:col-span-10 relative get-started-gradient-border w-[694px]"
  >
    <div
      class="get-started-gradient-left pointer-events-none absolute left-0 inset-y-0 w-[20%] bg-gradient-to-r to-transparent from-green-400 rounded-xl z-1 transition-opacity duration-300"
    ></div>
    <div
      class="get-started-gradient-right pointer-events-none absolute right-0 inset-y-0 w-[20%] bg-gradient-to-l to-transparent from-blue-400 rounded-xl z-1 transition-opacity duration-300"
    ></div>
    <div
      class="flex flex-col rounded-xl items-center gap-y-4 px-4 sm:px-28 py-6 z-10"
    >
      <h2 class="font-semibold text-2xl text-black dark:text-white">
        Record speech to get started
      </h2>
      <div class="flex items-center gap-4">
        <button v-if="!audioStore.isRecording" @click="startRecording">
          <Microphone width="20" />
        </button>
        <button v-else @click="cancelRecording">
          <CloseCircled width="20" />
        </button>
        <div
          class="relative w-[432px] bg-gray-100 pl-4 rounded-xl h-[40px] overflow-hidden"
        >
          <div
            class="relative flex items-center w-[400px] h-full overflow-hidden"
          >
            <div
              class="absolute right-0 flex items-center gap-[3px] flex-nowrap"
            >
              <div class="contents">
                <div
                  class="min-w-[3px] h-[6px] rounded-[1px] bg-gray-300"
                  v-for="i in 100"
                  :key="i"
                ></div>
              </div>
              <div class="contents">
                <div
                  class="min-w-[3px] rounded-[1px] bg-gray-900"
                  :style="{ height: `${Math.min(Math.max(6, volume), 25)}px` }"
                  v-for="(volume, i) in audioStore.volumesState"
                  :key="i"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <button @click="saveRecording" v-if="audioStore.isRecording">
          <CheckMark width="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Microphone from '@/assets/icons/Microphone.vue'
  import CheckMark from '~/assets/icons/CheckMark.vue'
  import CloseCircled from '~/assets/icons/CloseCircled.vue'
  import { useAudioStore } from '~/stores/useAudioStore'
  import { useAudioRecorder } from '~/composables/useAudioRecorder'

  const audioStore = useAudioStore()
  const { startRecording, stopRecording, cancelRecording, recordedAudio } =
    useAudioRecorder()

  const saveRecording = () => {
    const convertToText = async () => {
      try {
        const blob = recordedAudio()
        if (blob) {
          await audioStore.convertAudioToText(blob)
        }
      } catch (e) {
        console.error('Error converting audio to text:', e)
      }
    }
    stopRecording().then(() => convertToText())
  }
</script>
