"use client"
import { useCallback, useState } from "react"
import PreviewFrame from "./components/PreviewFrame"

export default function Home() {
  const [pdfLink, setPdfLink] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [latestHtml, setLatestHtml] = useState<string>(`
    <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-white">
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
    </body>
    </html>
  `)

  const getEligibility = useCallback(async () => {
    if (isLoading) return
    setResult("Loading...")
    if (!pdfLink) {
      setResult("Please enter a link to a PDF")
      return
    }
    setIsLoading(true)
    // Our LLM call will go here.
    setIsLoading(false)
    setResult("")
  }, [isLoading, pdfLink])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(latestHtml)
  }, [latestHtml])

  const downloadHtmlContent = () => {
    // Create a Blob with the HTML content and specify its MIME type
    const blob = new Blob([latestHtml], { type: 'text/html' });
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    // Create a temporary anchor element and set its attributes for download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'htmlContent.html'; // Specify the file name for the download
    // Append the anchor to the body, trigger the download, and remove the anchor
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke the blob URL to free up resources
    URL.revokeObjectURL(url);
  }


  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-none w-96 p-2 border-r-2 border-slate-600">
        <h1 className="text-2xl font-bold">Copilot</h1>
      </div>

      <div className="grow h-full p-2 flex flex-col">
        <h1 className="text-2xl font-bold">Preview</h1>
        <div className="h-full rounded rounded-md bg-slate-100 p-2 grow">
          <PreviewFrame htmlContent={latestHtml} />
        </div>
      </div>

      <div className="grow p-2">
      <h1 className="text-2xl font-bold">HTML</h1>
        <textarea
          className="border border-gray-400 rounded text-slate-900 w-full"
          value={latestHtml}
          rows={20}
          onChange={(e) => setLatestHtml(e.target.value)}
        />
        <button className="border border-gray-400 p-1 rounded bg-white0 text-gray-600 w-40"
          onClick={copyToClipboard}
        >
          Copy to clipboard
        </button>

        <button className="border border-gray-400 p-1 rounded bg-white0 text-gray-600 w-40"
          onClick={downloadHtmlContent}
        >
          Download
        </button>
      </div>
    </div>
  );
}

const LoadingAnimation = () => {
  return (
    <div role="status">
        <svg aria-hidden="true" className=" ml-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  )
}