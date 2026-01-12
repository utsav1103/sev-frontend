import GoogleLogin from '@/components/GoogleLogin';
import { signup } from '@/services/authService';
import { handleError } from '@/services/errorService';
import { defaultUser, signupSchema } from '@/types/schemas/authSchema';
import { PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
})

function SignupPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => signup(form.state.values),
    onSuccess: (user) => {
        console.log(user);
        navigate({
          to: "/"
        })
    },
    onError: (err) => {
      handleError(err, "Signup Failed");
    }
  })

  const form = useForm({
    defaultValues: defaultUser,
    validators: {
      onChange: signupSchema
    },
    onSubmit: () => mutate(),
  })

  return (
    <div className="mx-auto mt-12 max-w-md rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-6 text-center text-2xl font-semibold">Sign Up</h1>
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
        <form.Field name='username'>
          {(field) => (
            <TextInput
              name={"username"}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]?.message}
              withAsterisk
              leftSectionPointerEvents={'none'}
              // leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
              label={"Your username"}
              placeholder={'Your username'}
            />
          )}
        </form.Field>
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
        <form.Field name='phone'>
          {(field) => (
            <TextInput
              name={"phone"}
              type='number'
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]?.message}
              withAsterisk
              leftSectionPointerEvents={'none'}
              // leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
              label={"Your Phone"}
              placeholder={'Your Phone'}
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
        <form.Field name='confirmPassword'>
          {(field) => (
            <PasswordInput
              name={"confirmPassword"}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]?.message}
              withAsterisk
              // leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              label={'Confirm Password'}
              placeholder={'Confirm Password'}
            />
          )}
        </form.Field>

        {/* ---------------- Submit ---------------- */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
        >
          {isPending ? 'Logging in...' : 'Sign Up'}
        </button>
      </form>

      <GoogleLogin />
    </div>
  )
}


