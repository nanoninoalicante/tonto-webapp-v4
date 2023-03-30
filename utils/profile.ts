

export async function getProfile(userId: string): Promise<any> {
    const response = await fetch(`${process.env.FEED_API}/user/${userId}${process.env.API_KEY}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred while making the API call');
    }

    if (response.status !== 204) {
        const data = await response.json();
        return data;
    }
}