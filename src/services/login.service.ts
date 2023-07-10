import http from "../http-common"
import { Login } from "../types/login.type"

const servicePath = "/auth"

const login = (login: Login) => {

    return http.post(servicePath + "/signin",login).then((res: any) => {
        http.defaults.headers.common['Authorization'] = `Bearer ${res.token}`
        return res;
    })
}

const loginService = {
    login 
}

export default loginService