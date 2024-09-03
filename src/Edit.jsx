import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Loading from './components/Loading.jsx'

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io'

function Edit() {
    const { id } = useParams()
    const [todo, setTodo] = useState({
        name: ''
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)

    async function fetchTodo(todoId) {
        try {
            const response = await axios.get(`${BASE_URL}/todos/${todoId}`)
            setTodo(response.data)
            setIsLoading(false)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchTodo(id)
    }, [id])

    function handleNameChange(event) {
        setTodo((previousState) => ({
            ...previousState,
            name: event.target.value
        }))
    }

    async function updateName() {
        try {
            setIsLoading(true)
            await axios.put(`${BASE_URL}/todos/${id}`, {
                name: todo.name
            })
            setIsUpdated(true)
            setIsLoading(false)
            setTimeout(() => {
                setIsUpdated(false)
                // window.location.href = '/'
            }, 3000)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <>
            {isLoading && <Loading />}
            <Header />
            <div className='w-1/2 mx-auto'>
                <div className="toast toast-top toast-start">
                    { isUpdated &&
                        <div className="alert alert-success">
                            <span>Update successfully.</span>
                        </div>
                    }
                </div>
                <div className='form-control w-full'>
                    <div className="flex items-center py-2">
                        <Link className='btn btn-square border-collapse border-slate-600' to='/'>
                            <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                            </svg>
                        </Link>
                        <div className='pl-3'>Edit Page</div>
                    </div>
                    <div>id: <span className="badge badge-neutral">{id}</span></div>
                    <div>
                        <label className='label'>
                            <span className='label-text'>
                                Name
                            </span>
                        </label>
                        <input
                            onChange={handleNameChange}
                            type="text" className='input input-bordered w-full'
                            value={todo.name} />
                    </div>
                    <div className='flex'>
                        <button
                            onClick={updateName}
                            className='btn btn-success w-full mt-4'
                        >Edit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit