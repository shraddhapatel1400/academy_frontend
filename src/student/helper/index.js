import { API } from '../../backend'


export const signup = user => {
    
    return fetch(`${API}student/`, {
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


export const signin = user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}student/signin/`,{
        method: "POST",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem("student-jwt",JSON.stringify(data));
        next();
    }
}


export const isAuthenticatedS = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("student-jwt")) {
      return JSON.parse(localStorage.getItem("student-jwt"));
      //TODO: compare JWT with database json token
    } else {
      return false
    }
};
export const loginnames = () => {
    const username = isAuthenticatedS().user.fullname;
    return username;
}


export const signouts = next => {
    const userId = isAuthenticatedS() && isAuthenticatedS().user.id

    if(typeof window !== undefined){
        localStorage.removeItem("student-jwt")
        //next()

        return fetch(`${API}student/signout/${userId}`,{
            method: "GET"
        })
        .then(response => {
            console.log("Signout Success")
            next()
        })
        .catch(err => console.log(err))
    }

}

export const updateStudent = (userId,user) => {
    
    return fetch(`${API}student/${userId}/`, {
        method: "PATCH",
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


export const createOrder = (userId, token, orderData) => {
    const formData = new FormData();

    for(const name in orderData){
        formData.append(name, orderData[name]);
    }

    return fetch(`${API}enroll/add/${userId}/${token}/`,{
        method: "POST",
        body: formData,
    })
    .then(response => {
        return response.json();
    })
    .catch(e=>console.log(e));
}

export const getmeToken = (userId, token) => {
    return fetch(`${API}payment/gettoken/${userId}/${token}/`,{
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(e=>console.log(e))
}

export const processPayment = (userId, token, paymentInfo) => {
    const formData = new FormData();

    for(const name in paymentInfo){
        formData.append(name, paymentInfo[name])
    }

    return fetch(`${API}payment/process/${userId}/${token}/`,{
        method: "POST",
        body: formData,
    })
    .then(response => {
        console.log("p-0", response);
        return response.json();
    })
    .catch(e=>console.log(e))
}
