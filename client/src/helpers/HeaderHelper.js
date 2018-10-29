export const basicHeader = () => ({
    headers: {
    }
})

export const tokenHeader = () => ({
    headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token-prello')
    }
})