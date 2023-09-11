import { Loader2Icon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed z-50 top-0 left-0 bg-white bg-opacity-70 h-screen w-screen flex items-center justify-center backdrop-blur-sm">
      <Loader2Icon className="animate-spin w-10 h-10" />
    </div>
  )
}
