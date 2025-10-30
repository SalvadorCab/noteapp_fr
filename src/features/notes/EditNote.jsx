import { useParams } from 'react-router-dom'
//import { useSelector } from 'react-redux'
//import { selectNoteById } from './notesApiSlice'
//import { selectAllUsers } from '../users/usersApiSlice'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import useAuth from '../../hooks/useAuth'

const EditNote = () => {
    useTitle('techNotes: Edit Note')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    // const note = useSelector(state => selectNoteById(state, id))
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    //const users = useSelector(selectAllUsers)
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!note || !users?.length) return <PulseLoader color={"#FFF"} />

    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    // const content = note && users ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>
    const content = <EditNoteForm note={note} users={users} />

    return content
}

export default EditNote