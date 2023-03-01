import jwt_decode from "jwt-decode"
import axios from "axios"

export const createOrFetchUser = async (response, addUser) => {
    const decodedResponse = jwt_decode(response.credential)

    const { sub, name, picture} = decodedResponse
    
    const user =  {
        id: sub,
        username: name,
        image: picture
    }
    axios.post(`http://localhost:3000/api/oauth`, {user})
    console.log(user)
}