import firebase from 'firebase/app'
import 'firebase/database'

export default (req, res) => {
    const ref = firebase.database().ref('counts').child(req.query.id)

    return ref.once('value', (snapshot) => {
        res.status(200).json({
            total: snapshot.val()
        })
    })
}