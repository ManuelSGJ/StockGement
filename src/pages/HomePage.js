import {ReactSession} from 'react-client-session'

const HomePage = () => {

    const user = ReactSession.get('user')

    return (
        <div>
            <h1>Home Page:</h1>
        </div>
    )
}

export default HomePage