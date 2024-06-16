/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()
    
    useEffect(() => {
        localStorage.removeItem('token')
        navigate('/login')
    }, [navigate])

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Saindo...
                </h2>
            </div>
        </div>
    )
  }
  