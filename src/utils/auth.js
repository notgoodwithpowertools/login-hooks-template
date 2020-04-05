export const checkAuth = (auth) => {
    
    let check = ((auth !== null) && (auth.uid !== undefined)) ? true : false 
    return check

}

export { checkAuth as default }
