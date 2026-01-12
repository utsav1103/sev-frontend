import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { loginSchema } from '@/types/schemas/authSchema'
import { LoadingOverlay, TextInput, rem, PasswordInput, Button } from '@mantine/core'
import { handleError } from '@/services/errorService'
import GoogleLogin from '@/components/GoogleLogin'
import { login } from '@/services/authService'


export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
  beforeLoad: async () => {
    const token = await cookieStore.get("accessToken");
    if (token)
      redirect({
        to: '/'
      });
  }
})

function LoginPage() {
  const navigate = useNavigate()

  // --------------------
  // Login mutation
  // --------------------
  const { mutate, isPending } = useMutation({
    mutationFn: () => login(form.state.values),
    onSuccess: (user) => {
      if (!(user?.isEmailVerified)) {
        console.log("email not verified. please verify first");
        return;
      }

      navigate({ to: '/' })
    },
    onError: (err) => {
      handleError(err, "Login Failed");
    },
  })

  // --------------------
  // TanStack Form
  // --------------------
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: () => mutate(),
  })

  return (
    <div className="mx-auto mt-12 max-w-md rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-6 text-center text-2xl font-semibold">Login</h1>
      {/* 
      {serverMessage && (
        <div className="mb-4 rounded bg-yellow-50 p-3 text-sm text-yellow-800">
          {serverMessage}
        </div>
      )} */}

      {/* ---------------- Email ---------------- */}
      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }} className='flex flex-col justify-center gap-3 w-1/2 px-20'>
        <form.Field name='email'>
          {(field) => (
            <TextInput
              name={"email"}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]?.message}
              withAsterisk
              leftSectionPointerEvents={'none'}
              // leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
              label={"Your Email"}
              placeholder={'Your Email'}
            />
          )}
        </form.Field>
        <form.Field name='password'>
          {(field) => (
            <PasswordInput
              name={"password"}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]?.message}
              withAsterisk
              // leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              label={'Password'}
              placeholder={'Password'}
            />
          )}
        </form.Field>

        {/* ---------------- Submit ---------------- */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <GoogleLogin/>
    </div>
  )
}
