import 'firebase/database'
import { ref, onValue } from 'firebase/database'
import { realDB } from '@/lib/firebase/initFirebase'

export default (req, res) => {
    const dbRef = ref(realDB, "counts/" + req.query.id)

    return onValue(dbRef, (snapshot) => {
        res.status(200).json({
            total: snapshot.val()
        })
    }, {
        onlyOnce: true
    });
}