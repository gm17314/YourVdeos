import axios from 'axios';

const base_url = 'https://yt-api.p.rapidapi.com';

const options = {
    headers: {
        'X-RapidAPI-Key': '3dea4d93b5msh454174724244e24p1ab52fjsn1bc6fce105c1',
        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
      }
};
export const fetchFromAPI = async (url) => {
    try {
        
        const { data } = await axios.get(base_url + '/' + url, options);
        console.log("API call....", url)
        

        return data;

    } catch (error) {
        console.error(error);
    }
}