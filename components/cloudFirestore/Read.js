import firebase from 'firebase/app'
import 'firebase/firestore'
import { useUser } from '../../firebase/useUser'

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
        <button onClick={readData}>Read Data From Cloud Firestore</button>
    )
}

export default ReadDataFromCloudFirestore