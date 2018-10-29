export const basicHeader = {
    'Access-Control-Allow-Origin': '*',
}

export const tokenHeader = {
    'Access-Control-Allow-Origin': '*',
    'Authorization' : 'Bearer ' + localStorage.getItem('prello-token')
}