// const apiUrl = "http://localhost:8888";
const apiUrl = "https://notes-app-database.vercel.app";

export const getDataFromDB = async () => {
    return await fetch(`${apiUrl}`)
        .then(response => response.json())
        .catch(err => {
            console.log(err)
            return []
        });
}

export const addDataToDB = async (data) => {
    await fetch(`${apiUrl}/add/one`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(result => console.log(result))
        .catch((err) => console.log(err));
};

export const deleteOne = async (__id) => {
    await fetch(`${apiUrl}/delete/${__id}`, {
        method: "DELETE"
    }).then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err))
}

export const deleteAll = async () => {
    await fetch(`${apiUrl}/delete/all`, {
        method: "DELETE"
    }).then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err))
}