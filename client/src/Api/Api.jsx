import axios from 'axios'

const Api = async({endpoint="/",method="get",headers={},includeToken=false,data}) =>{

    try{
        const response = await axios({
            url:import.meta.env.VITE_API_URL+endpoint,
            method,
            headers
        });
        
    }
  
}

export default Api
