import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const isRecording = ref(false)
  const isTranscribing = ref(false)
  const transcriptedText = ref<string | null>(null)
  const volumesState = ref<number[]>([])

  const setIsRecording = (value: boolean) => {
    isRecording.value = value
  }

  const setIsTranscribing = (value: boolean) => {
    isTranscribing.value = value
  }

  const setTranscriptedText = (text: string) => {
    transcriptedText.value = text
  }

  const setVolumesState = (volumes: number[]) => {
    volumesState.value = volumes
  }

  const convertAudioToText = async (audioBlob: Blob) => {
    try {
      isTranscribing.value = true
      const formData = new FormData()
      formData.append('audio', audioBlob)

      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to transcribe audio')
      }

      const data = await response.json()
      transcriptedText.value = data.transcriptedText
    } catch (error) {
      console.error('Error transcribing audio:', error)
      throw error
    } finally {
      isTranscribing.value = false
    }
  }

  const reset = () => {
    isRecording.value = false
    isTranscribing.value = false
    transcriptedText.value = null
    volumesState.value = []
  }

  return {
    isRecording,
    isTranscribing,
    transcriptedText,
    volumesState,
    setIsRecording,
    setIsTranscribing,
    setTranscriptedText,
    setVolumesState,
    convertAudioToText,
    reset,
  }
})
