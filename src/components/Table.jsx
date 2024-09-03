import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'
import Search from './Search'

const BASE_URL = 'https://66d186b062816af9a4f3f5d4.mockapi.io'

export default function Table() {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');

    async function fetchTodo() {
        try {
            const response = await axios.get(`${BASE_URL}/todos`)
            setTodos(response.data)
            setIsLoading(false)
        } catch (error) {
            console.log('error', error)
        }
    }

    async function deleteTodo(id) {
        try {
            setIsLoading(true)
            await axios.delete(`${BASE_URL}/todos/${id}`)
            await fetchTodo()
            setIsLoading(false)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    // ฟังก์ชันสำหรับกรองข้อมูลที่จะแสดงในตารางตามค่าค้นหา
    const filteredTodos = todos.filter(todo =>
        todo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && <div>
                <div className='container mx-auto'>

                    <div className="flex container mx-auto">
                        <div className='flex-1 text-start py-2 px-2'>
                            <Link to={'/todo/insert'}>
                                <button className="btn btn-primary text-lg">Insert</button>
                            </Link>
                        </div>
                        <div className='flex-1 text-end py-2 px-2'>
                            <Search query={searchQuery} setQuery={setSearchQuery} />
                        </div>
                    </div>

                    <table className='min-w-full border-2 border-collapse border-slate-600 text-center'>
                        <thead className='bg-slate-500 text-white'>
                            <tr>
                                <th width='10%'>Id</th>
                                <th width='70%'>Name</th>
                                <th width='20%'>Action</th>
                            </tr>
                        </thead>
                        {
                            filteredTodos.map((todo, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.name}</td>
                                        <td>
                                            <Link to={`/todo/${todo.id}`}>
                                                <button
                                                    className='btn btn-square border-collapse border-slate-600'
                                                ><svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg>
                                                </button>
                                            </Link>
                                            <button
                                                className='btn btn-square border-collapse border-slate-600 ml-2'
                                                onClick={async () => {
                                                    await deleteTodo(todo.id)
                                                }}
                                            >
                                                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>
            </div>
            }
        </>
    )
}

