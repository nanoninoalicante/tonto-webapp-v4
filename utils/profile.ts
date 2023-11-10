

export async function getProfile(userId: string): Promise<any> {
    console.log(process.env.FEED_API)
    const url = `${process.env.FEED_API}/user/${userId}${process.env.API_KEY}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error)
        throw new Error(error.message || 'An error occurred while making the API call');
    }

    if (response.status !== 204) {
        console.log("response: ", response)
        const data = await response.json();
        return data;
    }
}