import firebase from 'firebase/app'
import { ref, runTransaction } from 'firebase/database'
import { realDB } from '@/lib/firebase/initFirebase'

const incrementCount = async (req, res) => {
    const dbRef = ref(realDB, "counts/" + req.query.id)

    const { snapshot } = await runTransaction(dbRef, (count) => {
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