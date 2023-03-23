import { API } from '../../backend'

export const signina = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}adminp/signin/`,{
        method: "POST",
        body: formData
    })
    .then((response) => {
        console.log("SUCCESS", response)
        return response.json();
    })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem("admin-jwt",JSON.stringify(data));
        next();
    }
}


export const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("admin-jwt")) {
        return JSON.parse(localStorage.getItem("admin-jwt"));
      //TODO: compare JWT with database json token
    } else {
      return false;
    }
};

export const loginname = () => {
    const username = isAuthenticated().user.name;
    return username;
}

export const signout = next => {
    const userId = isAuthenticated() && isAuthenticated().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("admin-jwt")
        //next()

        return fetch(`${API}adminp/signout/${userId}`,{
            method: "GET"
        })
        .then(response => {
            console.log("Signout Success")
            next()
        })
        .catch(err => console.log(err))
    }

}