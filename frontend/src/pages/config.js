/* eslint-disable eqeqeq */
import axios from 'axios';
import { useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import ProfileNav from "../components/profilenav"

export default function ConfigUser(user) {
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)

            const response = await axios.patch('http://localhost:3000/user/update', {
                username,
                avatar,
                bio
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.code != 200) {
                setError(response.data.message)
                setLoading(false)
                return
            }

            setSuccess(true)
        } catch {
            setError('Falha ao atualizar perfil')
        }

        setLoading(false)
    }

    function handleAvatarChange(e) {
        let base64 = ''
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            base64 = reader.result
            setAvatar(base64)
        }
    }

    useState(() => {
        setUsername(user?.user?.username)
        setAvatar(user?.user?.avatar)
        setBio(user?.user?.bio)
    }, [user])

    return (
        <>
            <ProfileNav data={user.user} page="config" />
            {error ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p>{error}</p>
                </div>
            ) : null}

            {success ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                    <p>Perfil atualizado com sucesso</p>
                </div>
            ) : null
            }

            <form>
                <div className="max-w-2xl mx-auto px-6 py-12 lg:px-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Dados de Perfil</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Preencha o formulário abaixo para atualizar seu perfil.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="col-span-full">
                                <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt="User profile"
                                            className="h-56 w-56 rounded-full"
                                        />
                                    ) : user?.user?.avatar ? (
                                        <img
                                            src={user.user.avatar}
                                            alt="User profile"
                                            className="h-56 w-56 rounded-full"
                                        />
                                    ) : (
                                        <UserCircleIcon className="h-56 w-56 text-gray-300" aria-hidden="true" />
                                    )}
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="photo-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="photo-upload"
                                                name="photo-upload"
                                                type="file"
                                                accept="image/png, image/jpeg, image/gif"
                                                onChange={handleAvatarChange}
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nome
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            value={username ? username : user?.user?.username}
                                            onChange={e => setUsername(e.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="nome"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            disabled={true}
                                            value={user?.user?.email}
                                            autoComplete="email"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                                    Sobre você
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows={3}
                                        value={bio ? bio : user?.user?.bio}
                                        onChange={e => setBio(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Digite uma breve descrição sobre você.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        ref={null}
                        disabled={loading}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </>
    )
}
