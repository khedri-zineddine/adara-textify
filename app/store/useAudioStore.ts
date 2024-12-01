import { reactive } from 'vue'

interface AudioState {
  transcriptedText: string
  isTranscribing: boolean
  isRecording: boolean
  volumesState: number[]
}

const state = reactive<AudioState>({
  transcriptedText: '',
  isTranscribing: false,
  isRecording: false,
  volumesState: [],
})

export const useAudioStore = () => {
  const setTranscriptedText = (text: string) => {
    state.transcriptedText = text
  }

  const setIsTranscribing = (value: boolean) => {
    state.isTranscribing = value
  }

  const setIsRecording = (value: boolean) => {
    state.isRecording = value
  }

  const setVolumesState = (volumes: number[]) => {
    state.volumesState = volumes
  }

  return {
    state,
    setTranscriptedText,
    setIsTranscribing,
    setIsRecording,
    setVolumesState,
  }
}
