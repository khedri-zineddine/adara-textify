<template>
  <div class="col-span-2 lg:col-span-10 relative get-started-gradient-border">
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
        <button v-if="!state.isRecording" @click="startRecording">
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
                  v-for="(volume, i) in state.volumesState"
                  :key="i"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <button @click="saveRecording" v-if="state.isRecording">
          <CheckMark width="20" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useState } from '#app'
  import Microphone from '@/assets/icons/Microphone.vue'
  import CheckMark from '~/assets/icons/CheckMark.vue'
  import CloseCircled from '~/assets/icons/CloseCircled.vue'
  import convertAudioToText from '@/services/AudioToText'
  import { useAudioStore } from '~/store/useAudioStore'

  const audioStore = useAudioStore()
  const { state, setIsRecording, setIsTranscribing, setTranscriptedText, setVolumesState } = audioStore

  let mediaRecorder: MediaRecorder | null = null
  let audioContext: AudioContext | null = null
  let audioVolumeTimeout: any | null = null
  let audioChunks: Blob[] = []
  let recordedAudio: Blob | null = null
  let onStopCallback: (() => void) | null = null

  const startVolumeUpdate = (stream: MediaStream) => {
    const context = new AudioContext()
    const source = context.createMediaStreamSource(stream)
    const analyzer = context.createAnalyser()
    analyzer.fftSize = 256
    source.connect(analyzer)

    const dataArray = new Uint8Array(analyzer.frequencyBinCount)

    const updateVolume = () => {
      analyzer.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      const volume = Math.min(100, (average / 128) * 100)
      setVolumesState([...state.volumesState, volume])
      if (state.isRecording) {
        audioVolumeTimeout = setTimeout(() => {
          requestAnimationFrame(updateVolume)
        }, 100)
      }
    }
    updateVolume()
    audioContext = context
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContext = new AudioContext()
      mediaRecorder = new MediaRecorder(stream)
      audioChunks = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        recordedAudio = audioBlob
        if (onStopCallback) onStopCallback()
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      startVolumeUpdate(stream)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const saveRecording = () => {
    const convertToText = async () => {
      try {
        setIsTranscribing(true)
        const text = await convertAudioToText(recordedAudio as Blob)
        setTranscriptedText(text)
      } catch (e) {
        console.log(e)
      } finally {
        setIsTranscribing(false)
      }
    }
    stopRecording().then(() => convertToText())
  }

  const cancelRecording = () => {
    stopRecording()
  }

  const stopRecording = async () => {
    return new Promise((resolve, reject) => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        if (audioVolumeTimeout) clearTimeout(audioVolumeTimeout)
        mediaRecorder.stop()
        setIsRecording(false)
        audioContext?.close()
        setVolumesState([])
        onStopCallback = () => {
          onStopCallback = null
          resolve(true)
        }
      } else reject()
    })
  }
</script>
