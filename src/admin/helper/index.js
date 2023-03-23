import { API } from "../../backend";
  

export const deleteStudent = (userId) => {
    return fetch(`${API}student/${userId}`, { method: 'DELETE' })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCourse = (userId) => {
    return fetch(`${API}course/${userId}`, { method: 'DELETE' })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteTeacher = (userId) => {
    return fetch(`${API}teacher/${userId}`, { method: 'DELETE' })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateTeacher = (userId,user) => {
    const formData = new FormData();

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}course/${userId}/`, {
        method: "PATCH",
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch(err => console.log(err))
};

export const updateAdmin = (userId,user) => {
    
    return fetch(`${API}adminp/${userId}/`, {
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


export const addCourse = user => {

    const formData = new FormData();

    for(const name in user){
        formData.append(name, user[name])
    }

    return fetch(`${API}course/`,{
        method: "POST",
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .catch(e=>console.log(e))
}

export const updateCourse = (userId,user) => {
    
    return fetch(`${API}course/${userId}/`, {
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
