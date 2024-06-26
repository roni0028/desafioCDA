/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmpass] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)

            if (password !== confirmpass) {
                setError('As senhas não coincidem')
                setLoading(false)
                return
            }

            const response = await axios.post('http://localhost:3000/auth/register', {
                email,
                password
            })

            if (response.data.code !== 200) {
                setError(response.data.message)
                setLoading(false)
                return
            }

            window.location.href = '/login'
        } catch {
            setError('Falha ao registrar')
        }
    }

    return (
        <>
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p>{error}</p>
            </div>}

            <form>
                <div className="max-w-2xl mx-auto px-6 py-12 lg:px-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Registro</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Preencha o formulário abaixo para criar uma conta.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="email"
                                            onChange={e => setEmail(e.target.value)}
                                            id="email"
                                            autoComplete="email"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="meuemail@email.com"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={e => setPassword(e.target.value)}
                                            id="password"
                                            autoComplete="new-password"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="********"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="confirmpass" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirmar Senha
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="password"
                                            name="confirmpass"
                                            onChange={e => setConfirmpass(e.target.value)}
                                            id="confirmpass"
                                            autoComplete="new-confirmpass"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="********"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Já tem uma conta? Faça login
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Registrar
                    </button>
                </div>
            </form>
        </>
    )
}
