import { useState, useEffect } from 'react'
import 'firebase/database'
import { realDB } from '@/lib/firebase/initFirebase'
import { ref, onValue, off } from "firebase/database"
import Button from 'react-bootstrap/Button'

const Counter = ({ id }) => {
    const [count, setCount] = useState('')
    useEffect(() => {
        const onCountIncrease = (count) => setCount(count.val())

        const fetchData = async () => {
            const countRef = ref(realDB, "counts/" + id)
            onValue(countRef, onCountIncrease)
        }

        fetchData()

        return () => {
            const countRef = ref(realDB, "counts/" + id)
            off(countRef, "value", onCountIncrease)
        }
    }, [id])

    const increaseCount = async () => {
        const registerCount = () => fetch(`/api/incrementCount?id=${encodeURIComponent(id)}`)
        registerCount()
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <Button onClick={increaseCount} style={{ width: '100%' }}>Increase count</Button>
            <h5 style={{ textAlign: 'center', marginTop: '5px' }}>{count ? count : '0'}</h5>
        </div>
    )
}

export default Counter