async function convertAudioToText(audioBlob) {
  const API_KEY = '4197449bcd0e48b8949dfcc5fed44ff0' // Get from https://www.assemblyai.com/
  const UPLOAD_URL = 'https://api.assemblyai.com/v2/upload'
  const TRANSCRIPT_URL = 'https://api.assemblyai.com/v2/transcript'

  try {
    // First, upload the audio file
    const uploadResponse = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        authorization: API_KEY,
      },
      body: audioBlob,
    })

    const uploadResult = await uploadResponse.json()
    const audioUrl = uploadResult.upload_url

    // Create a transcript request
    const transcriptResponse = await fetch(TRANSCRIPT_URL, {
      method: 'POST',
      headers: {
        authorization: API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        language_code: 'en', // Change for different languages
      }),
    })

    const transcriptResult = await transcriptResponse.json()
    const transcriptId = transcriptResult.id

    // Poll for the transcript completion
    while (true) {
      const pollingResponse = await fetch(`${TRANSCRIPT_URL}/${transcriptId}`, {
        headers: {
          authorization: API_KEY,
        },
      })
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
