export default function Search({ query, setQuery }) {
    return (
        <>
            <input
                type="text"
                placeholder="search..."
                className='input input-bordered'
                value={query} // รับค่า query ที่ส่งมาจาก props
                onChange={(e) => setQuery(e.target.value)} // เรียก setQuery เมื่อผู้ใช้กรอกข้อมูล
            />
        </>
    )
}