import {
  defineEventHandler,
  readMultipartFormData,
  useRuntimeConfig,
} from '#imports'
import { AssemblyAI } from 'assemblyai'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const unlinkFile = promisify(fs.unlink)

export default defineEventHandler(async (event) => {
  try {
    const { OPENAI_API_KEY } = useRuntimeConfig(event)
    console.log(OPENAI_API_KEY)
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw new Error('No form data received')
    }

    const audioFile = formData.find((file) => file.name === 'audio')
    if (!audioFile || !audioFile.data) {
      throw new Error('No audio file found')
    }
    const tempFilePath = path.join('/tmp', 'audio.wav')

    // Write the blob data to a temporary file
    await writeFile(tempFilePath, audioFile.data)
    const client = new AssemblyAI({
      apiKey: '4197449bcd0e48b8949dfcc5fed44ff0',
    })
    const data = {
      audio: tempFilePath,
    }
    const transcript = await client.transcripts.transcribe(data)
    console.log(transcript.text)
    console.log('Transcription:', transcript)
    await unlinkFile(tempFilePath)
    return {
      text: 'Audio received successfully',
      size: audioFile.data.length,
    }
  } catch (e) {
    console.error('Error processing audio:', e)
    return {
      error: e instanceof Error ? e.message : 'Unknown error occurred',
    }
  }
})
