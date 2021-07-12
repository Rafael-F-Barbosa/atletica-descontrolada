import axios from 'axios'

const isUserAdmin = async (userId) => {
    const url = process.env.REACT_APP_BASE_URL + '/user/' + userId
    const token = localStorage.getItem('token')
    try{
        const user = await axios.get(url,{
            headers:{
                Authorization: "Bearer " + token
            }
        })
        if (!user) {
            return false
        }
        return user.data.user.role==='Diretor'
    }catch(err){
        console.log(err);
        return false
    }
}

export default isUserAdmin