import { api } from "@/lib/axios"
import { handleError } from "@/services/errorService"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

const GoogleLogin = () => {
      const navigate = useNavigate()
    
      const googleMutation = useMutation({
        mutationFn: async () => {
          const res = await api.post('/auth/google')
          return res.data
        },
        onSuccess: () => navigate({ to: '/' }),
        onError: (err : unknown) => handleError(err,'Google login failed'),
      })
    
  return (
    <>
          {/* ---------------- Divider ---------------- */}
          <div className="my-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* ---------------- Google Login ---------------- */}
          <button
              onClick={() => googleMutation.mutate()}
              disabled={googleMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded border py-2 disabled:opacity-50"
          >
              {googleMutation.isPending ? 'Connecting...' : 'Continue with Google'}
          </button>
    </>
  )
}

export default GoogleLogin