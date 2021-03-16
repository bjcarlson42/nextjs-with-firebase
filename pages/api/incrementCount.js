import firebase from 'firebase/app'
import 'firebase/database'

const incrementCount = async (req, res) => {
    const ref = firebase.database().ref('counts').child(req.query.id)
    const { snapshot } = await ref.transaction((count) => {
        if (count === null) {
            return 1
        }

        return count + 1
    })

    return res.status(200).json({
        total: snapshot.val()
    })
}

export default incrementCount