import { useEffect, useState } from "react";
import UserService from "../Services/UserService";


const AccountPage = () => {
    const [user, setUser]= useState({});
    const fetchUser = async () => {
        try {
            const response = await UserService.getUser();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return <>
        <h1>Mon compte</h1>
        <p>Nom: {user.name}</p>
        <p>Prénom: {user.first_name}</p>
        <p>Email: {user.email}</p>
    </>;
}
 
export default AccountPage;