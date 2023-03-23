import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const signUserOut = async () => {
        await signOut(auth);
        navigate("/"); 
        navigate("/login"); 
    }
    return (
        <div className = "navbar">
            <div className = "links">
                {user && <Link to = "/">Home</Link>}
                {user? <Link to = "/create-post">Create Post</Link> : <Link to = "/login">Login</Link>}
            </div>
            <div className = "user">
                <p>{user?.displayName}</p>
                {user && <img src = {user?.photoURL || ""} width = "40px" height = "40px"/>}
                {user && <button onClick = {signUserOut}>Log Out</button>}
                {/* <p>{auth.currentUser.displayName}</p>
                <img src = {auth.currentUser?.photoURL || ""} width = "100px" height = "100px"/> */}
            </div>
        </div>
    )
}