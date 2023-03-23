import { API } from '../../backend'


export const signupt = user => {
    
    return fetch(`${API}teacher/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}


export const signint = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}teacher/signin/`,{
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
        localStorage.setItem("teacher-jwt",JSON.stringify(data));
        next();
    }
}


export const isAuthenticatedT = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("teacher-jwt")) {
      return JSON.parse(localStorage.getItem("teacher-jwt"));
      //TODO: compare JWT with database json token
    } else {
      return false;
    }
};

export const loginnamet = () => {
    const username = isAuthenticatedT().user.fullname;
    return username;
}


export const signoutt = next => {
    const userId = isAuthenticatedT() && isAuthenticatedT().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("teacher-jwt")
        //next()

        return fetch(`${API}teacher/signout/${userId}`,{
            method: "GET"
        })
        .then(response => {
            console.log("Signout Success")
            next()
        })
        .catch(err => console.log(err))
    }

}

export const updateTeacher = (userId,user) => {

    return fetch(`${API}teacher/${userId}/`,{
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        console.log("SUCCESS", response)
        return response.json();
    })
    .catch(err => console.log(err))
}

export const uploadVideo = user => {
    const formData = new FormData()
    for(const name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}lecture/`, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const sendEmail = () => {
    return fetch(`${API}lecture/sendmail/`,{
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(e=>console.log(e))
}