import { useRuntimeConfig } from '#imports'

async function convertAudioToText(audioBlob: any, event: any) {
  const UPLOAD_URL = 'https://api.assemblyai.com/v2/upload'
  const TRANSCRIPT_URL = 'https://api.assemblyai.com/v2/transcript'
  const { ASSEMBLYAI_API_KEY } = useRuntimeConfig(event)

  try {
    // First, upload the audio file
    const uploadResponse = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
      },
      body: audioBlob,
    })
    if (!uploadResponse.ok) {
      throw new Error('Failed to upload audio file')
    }

    const uploadResult = await uploadResponse.json()
    const audioUrl = uploadResult.upload_url

    // Create a transcript request
    const transcriptResponse = await fetch(TRANSCRIPT_URL, {
      method: 'POST',
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        language_code: 'en',
      }),
    })

    if (!transcriptResponse.ok) {
      throw new Error('Failed to create transcript')
    }

    const transcriptResult = await transcriptResponse.json()
    const transcriptId = transcriptResult.id

    // Poll for the transcript completion
    while (true) {
      const pollingResponse = await fetch(`${TRANSCRIPT_URL}/${transcriptId}`, {
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
        },
      })

      if (!pollingResponse.ok) {
        throw new Error('Failed to poll transcript status')
      }

      const result = await pollingResponse.json()

      if (result.status === 'completed') {
        return result.text
      } else if (result.status === 'error') {
        throw new Error(`Transcription failed: ${result.error}`)
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export default convertAudioToText
