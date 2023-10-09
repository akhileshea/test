import * as React from "react";
import { User, getAuth} from 'firebase/auth'

const Home: React.FC<{user: null |User}> = ({user}) => {
    return(
        <>
        {user && <div> Welcome {user.displayName} </div>}
        <div>Home page place holder</div>
        </>
    )
}

export default Home;