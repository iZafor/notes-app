const apiUrl = "http://localhost:8888/";

export const getDataFromDB = async () => {
    return await fetch(`${apiUrl}`)
        .then(response => response.json())
        .catch(err => {
            console.log(err)
            return []
        });
}

export const addDataToDB = async (data) => {
    await fetch(`${apiUrl}`, {
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
