import { useSelector } from 'react-redux'

const Home = () => {
    const token = useSelector((state: any) => state.user.token )
    return (
        <div>{token}</div>
    )
}
export default Home
