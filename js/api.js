const RESOURSE_URL = `http://127.0.0.1:5000/rod`

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (body) {
            reqParams.body = JSON.stringify(body);
        }
        return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
}

export const postRod = (body) => baseRequest({ method: "POST", body });

export const getAllRods = async () => {
    const rawResponse = await baseRequest({ method: "GET" });
    return await rawResponse.json();
};

export const getRod = async (id) => {
    return await (await fetch(RESOURSE_URL + "/" + id, {method: 'GET'})).json()
};

export const updateRod = (id, body) =>
    baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteRod = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });
