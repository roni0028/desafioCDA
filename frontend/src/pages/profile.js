/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios"
import { useState } from 'react'
import ProfileNav from "../components/profilenav"

const randomEmblem = [1, 2, 3 ,4, 5, 6, 7, 8, 9, 10];

export default function Profile(user) {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleRedeem() {
        try {
            const response = await axios.post("http://localhost:3000/emblem/add", {
                id: randomEmblem[Math.floor(Math.random() * randomEmblem.length)]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.code !== 200) {
                setError(response.data.message)
                return
            }

            setSuccess(response.data.message)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <>
            <ProfileNav data={user.user} page="home" />
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

            <div className="relative overflow-hidden bg-white">
                <div className="pb-80 pt-12 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Resgatar Emblema
                            </h1>
                            <p className="mt-4 text-xl text-gray-500">
                                Resgate um emblema aleatório.
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-64 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img
                                                        src="https://cidadealtarp.com/imagens/challenge/cidade-alta.png"
                                                        alt=""
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                                <div className="h-64 w-64 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png"
                                                        alt=""
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-64 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://cidadealtarp.com/imagens/challenge/policia.png"
                                                        alt=""
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                                <div className="h-64 w-64 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://cidadealtarp.com/imagens/challenge/hospital.png"
                                                        alt=""
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                                <div className="h-64 w-64 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://cidadealtarp.com/imagens/challenge/mecanica.png"
                                                        alt=""
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-64 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://cidadealtarp.com/imagens/challenge/taxi.png"
                                                        alt=""
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                                <div className="h-64 w-64 overflow-hidden rounded-lg">
                                                    <img
                                                        src="https://cidadealtarp.com/imagens/challenge/coruja.png"
                                                        alt=""
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="#"
                                    onClick={handleRedeem}
                                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                                >
                                    Resgatar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
