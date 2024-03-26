import * as React from 'react';

export async function useGetItemCount(id) {
    // get total count of cookie with id sold in the last year
    const itemCount = await fetch(`http://localhost:3001/db/getItemCounter/${id}`)
    .then((response) => response.json())
    .then((data) => {return data.total_count})
    .catch((error) => console.error(error));

    return Promise.resolve(itemCount);
}