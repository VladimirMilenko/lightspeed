/**
 * Created by netre on 30.05.2017.
 */
import axios from 'axios';

export class DumbApi {
    //TODO: Fetch products
    fetchProducts() {
        return axios.get('http://beta.json-generator.com/api/json/get/4kiDK7gxZ')
            .then((response) => {
                return response.data
            })
    }
}