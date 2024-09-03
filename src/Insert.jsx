import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header.jsx'
import Loading from './components/Loading.jsx'

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io'

function Insert() {
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isInserted, setIsInserted] = useState(false)

    async function insertName() {
        try {
            setIsLoading(true)
            await axios.post(`${BASE_URL}/todos`, { name })
            setIsLoading(false)
            setIsInserted(true)
            setName('')
        } catch (error) {
            console.log('error', error)
        }
    }

    let alert = ''
    if (isInserted) {
        setTimeout(() => { setIsInserted(false) }, 3000)
        alert = (
            <div className="alert alert-success">
                <span>Add successfully.</span>
            </div>
        )
    }

    return (
        <>
            <Header />
            {isLoading && <Loading />}
            {!isLoading &&
                <div className='w-1/2 mx-auto'>
                    <div className="toast toast-top toast-start">
                        {alert}
                    </div>
                    <div className='form-control w-full'>
                        <div className="flex items-center py-2">
                            <Link className='btn btn-square border-collapse border-slate-600' to='/'>
                                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                                </svg>
                            </Link>
                            <div className='pl-3'>Insert Page</div>
                        </div>
                        <div>
                            <label className='label'>
                                <span className='label-text'>
                                    Name
                                </span>
                            </label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='flex'>
                            <button
                                onClick={insertName}
                                className='btn btn-success w-full mt-4'
                            >Edit
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Insert