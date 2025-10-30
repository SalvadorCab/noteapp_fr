import { useParams } from 'react-router-dom'
//import { useSelector } from 'react-redux'
//import { selectUserById } from './usersApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import EditUserForm from './EditUserForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle.js'

const EditUser = () => {
    useTitle('techNotes: Edit User')

    const { id } = useParams()

    //const user = useSelector(state => selectUserById(state, id))
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return <PulseLoader color={"#FFF"} />
	
    const content = <EditUserForm user={user} />

    return content
}

export default EditUser