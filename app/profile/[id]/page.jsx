import { getUser, getUserProjects } from '@/lib/actions'
import ProfilePage from '@/components/ProfilePage'

const UserProfile = async ({ params : {id} }) => {
    const userEmail = `${id}@gmail.com`
    const result = await getUserProjects(userEmail)
    const user = await getUser(userEmail)

    if (!user?.rows) return (
        <p className="no-result-text">Failed to fetch user info</p>
    )

    return <ProfilePage user={user?.rows[0]} projects = {result?.rows} />
}

export default UserProfile
