import axios from 'axios';
// create an base instsnce with base configuration
const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})
// register api
export const register = async(username,email,password)=>{
    try{
        const response = await api.post('/register',{
            username,
            email,
            password
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

// auth.api.js
export const login = async (email, password) => {
  console.log('📤 Sending:', { email, password });
  
  try {
    const response = await api.post('/login', {
      email,
      password
    });
    
    console.log('📥 Received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
};

// export const login = async(email,password)=>{
//     try{
//         const response = await api.post("/login",{
//             email,
//             password
//         });
//         return response.data;

//     }catch(error){
//         throw error;
//     }
// }