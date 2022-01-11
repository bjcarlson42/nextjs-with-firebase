import { db } from '@/lib/firebase/initFirebase'
import { doc, setDoc, Timestamp, GeoPoint } from "firebase/firestore"
import { useUser } from '@/lib/firebase/useUser'
import Button from 'react-bootstrap/Button'

const WriteToCloudFirestore = () => {
    const { user } = useUser()
    const sendData = async () => {
        try {
            const userDoc = doc(db, "myCollection", user.id)
            await setDoc(userDoc, {
                string_data: 'Benjamin Carlson',
                number_data: 2,
                boolean_data: true,
                map_data: { stringInMap: 'Hi', numberInMap: 7 },
                array_data: ['text', 4],
                null_data: null,
                time_stamp: Timestamp.fromDate(new Date('December 17, 1995 03:24:00')),
                geo_point: new GeoPoint(34.714322, -131.468435)
            })
            alert('Data was successfully sent to cloud firestore!')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <Button onClick={sendData} style={{ width: '100%' }}>Send Data To Cloud Firestore</Button>
        </div>
    )
}

export default WriteToCloudFirestore