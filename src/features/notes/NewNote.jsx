import NewNoteForm from './NewNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle.js'
import { useGetUsersQuery } from '../users/usersApiSlice'

const NewNote = () => {
    useTitle('techNotes: New Note')

    // const users = useSelector(selectAllUsers)

    //if (!users?.length) return <p>Not Currently Available</p>
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewNoteForm users={users} />

    return content
}
export default NewNote