import * as React from 'react';

export async function useGetCustomers() {
    // Add a way to fetch user info here either directly from BE or redux
    const fulfilledOrders = await fetch('http://localhost:3001/db/getFulfilled')
    .then((response) => response.json())
    .then((data) => {return data.fullfilled_orders})
    .catch((error) => console.error(error))

    const unfulfilledOrders = await fetch('http://localhost:3001/db/getUnfulfilled')
    .then((response) => response.json())
    .then((data) => {return data.unfullfilled_orders})
    .catch((error) => console.error(error))

    const allOrders = fulfilledOrders.concat(unfulfilledOrders);

    const customers = allOrders.map((order) => {
        return {
            firstName: order.firstName,
            lastName: order.lastName,
            orderDate: order.order_date
        }
    })

    return Promise.resolve(customers);
}