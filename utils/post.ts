
export async function getPost(postId: string): Promise<any> {
    const response = await fetch(`${process.env.FEED_API}post/${postId}${process.env.API_KEY}`, {
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
        return data?.data[0];
    }
}

export async function getUserInfo(userId: string, postId: string): Promise<any> {
    if (!userId) {
        return ""
    }
    const url = `${process.env.FEED_API}user/${userId}${process.env.API_KEY}`
    const response = await fetch(url, {
        method: 'GET'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred while making the API call');
    }

    if (response.status !== 204) {
        const data = await response.json();
        const postsIds = data.data.postIds;
        const posts = postsIds.length
        const index = postsIds.indexOf(postId);
        let back = 0;
        let next = 0;
        if (index !== -1 && postsIds.length > 1) {
            if (index === 0) {
                back = postsIds[postsIds.length - 1]
                next = postsIds[index + 1]
            } else if (index === postsIds.length - 1) {
                back = postsIds[index - 1]
                next = postsIds[0]
            } else {
                back = postsIds[index - 1]
                next = postsIds[index + 1]
            }
        }
        return {
            back, next, posts
        };
    }
}

export async function getCommentsByUser(postId: string): Promise<any> {
    const url = `${process.env.FEED_API}post/${postId}/comments${process.env.API_KEY}`
    const response = await fetch(url, {
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
        return data.data;
    }
}