import {
  defineEventHandler,
  readMultipartFormData,
  setResponseStatus,
} from '#imports'
import convertAudioToText from '../utils/convertAudioToText'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw new Error('No form data received')
    }

    const audioBlob = formData.find((file) => file.name === 'audio')
    if (!audioBlob || !audioBlob.data) throw new Error('No audio data received')

    const text = await convertAudioToText(audioBlob.data, event)
    return {
      transcriptedText: text,
    }
  } catch (e) {
    setResponseStatus(event, 500)
    return {
      error: e instanceof Error ? e.message : 'Unknown error occurred',
    }
  }
})
