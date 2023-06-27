export const getService = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Ошибка сервера");
    }
    
    return await response.json();
};