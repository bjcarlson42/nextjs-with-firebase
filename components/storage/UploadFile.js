// to learn how to download a file, get/use file metadata, delete files, and list files see https://firebase.google.com/docs/storage/web/start
import { useRef, useState } from 'react'
import {
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage()

const UploadFile = () => {
    const inputEl = useRef(null)
    let [value, setValue] = useState(0)

    function uploadFile() {
        // get file
        var file = inputEl.current.files[0]

        // create a storage ref
        const storageRef = ref(storage, "user_uploads" + file.name)

        // upload file
        const task = uploadBytesResumable(storageRef, file)

        // update progress bar
        task.on('state_change',

            function progress(snapshot) {
                setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },

            function error(err) {
                alert(error)
            },

            function complete() {
                alert('Uploaded to firebase storage successfully!')
            }
        )
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <progress value={value} max="100" style={{ width: '100%' }}></progress>
            <br />
            <input
                type="file"
                onChange={uploadFile}
                ref={inputEl}
            />
        </div>
    )
}

export default UploadFile