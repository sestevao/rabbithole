import axios from "axios"
import { FormEvent, useState } from "react"
import './App.css'

function App() {
  const [files, setFiles] = useState<FileList |null>(null)
  
  async function handleUploadFile(e: FormEvent) {
    e.preventDefault()

    if(!files || files.length === 0){
      return
    }

    const file = files[0]

    await axios.put("https://rabbithole-dev.adfa0ec082a27e09cdbe870f36b2b328.r2.cloudflarestorage.com/86beb3a0-1ea3-494f-a07e-4c62d190d44b-test.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=2af1d7a4f106eedf8aa73b0837e7e184%2F20240121%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240121T225857Z&X-Amz-Expires=600&X-Amz-Signature=aa29d7b6ddddbb20b6ac74f12738c2176637c0c7d04e2b8fd30d40e38e6c4631&X-Amz-SignedHeaders=host&x-id=PutObject", file, {
      headers: {
        'Content-Type': 'video/mp4'
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md col-span-full">
        <form onSubmit={handleUploadFile} className="text-white">
          <input type="file" name="file" onChange={e => setFiles(e.target.files)} className="my-4" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload File
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
