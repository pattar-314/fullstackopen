

const addAuth = (req, res, next) => {
    const currentUser = window.localStorage.getItem('currentUser')
    console.log('current user: ', currentUser)
    if(currentUser){
      req.headers.set('authorization', `Bearer ${currentUser}`)
    }
    
    next()
}

export default { addAuth }