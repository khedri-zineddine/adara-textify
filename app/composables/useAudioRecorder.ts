import { useAudioStore } from '~/stores/useAudioStore'

export const useAudioRecorder = () => {
  const audioStore = useAudioStore()

  let mediaRecorder: MediaRecorder | null = null
  let audioContext: AudioContext | null = null
  let audioVolumeTimeout: any | null = null
  let audioChunks: Blob[] = []
  let recordedAudio: Blob | null = null
  let onStopCallback: (() => void) | null = null

  const startVolumeUpdate = (stream: MediaStream) => {
    const context = new AudioContext()
    audioContext = context
    const source = context.createMediaStreamSource(stream)
    const analyzer = context.createAnalyser()
    analyzer.fftSize = 256
    source.connect(analyzer)

    const updateVolume = () => {
      const dataArray = new Uint8Array(analyzer.frequencyBinCount)
      analyzer.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      const volume = Math.min(100, (average / 128) * 100)
      audioStore.setVolumesState([...audioStore.volumesState, volume])
      if (audioStore.isRecording) {
        audioVolumeTimeout = setTimeout(() => {
          requestAnimationFrame(updateVolume)
        }, 100)
      }
    }
    updateVolume()
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
      audioStore.setIsRecording(true)
      startVolumeUpdate(stream)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = async () => {
    return new Promise((resolve, reject) => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        if (audioVolumeTimeout) clearTimeout(audioVolumeTimeout)
        mediaRecorder.stop()
        audioStore.setIsRecording(false)
        audioContext?.close()
        audioStore.setVolumesState([])
        onStopCallback = () => {
          onStopCallback = null
          resolve(true)
        }
      } else reject()
    })
  }

  const cancelRecording = () => {
    stopRecording()
  }

  return {
    startRecording,
    stopRecording,
    cancelRecording,
    recordedAudio: () => recordedAudio,
  }
}
