import firebase from 'firebase/app'
import 'firebase/firestore'
import { useUser } from '../../firebase/useUser'
import Button from 'react-bootstrap/Button'

const ReadDataFromCloudFirestore = () => {
    const { user } = useUser()
    const readData = () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc(user.id)
                .onSnapshot(function (doc) {
                    console.log(doc.data())
                })
            alert('Data was successfully fetched from cloud firestore! Close this alert and check console for output.')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <Button onClick={readData} style={{ width: '100%' }}>Read Data From Cloud Firestore</Button>
        </div>
    )
}

export default ReadDataFromCloudFirestore