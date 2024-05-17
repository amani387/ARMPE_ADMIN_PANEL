
const isEmail =(email)=>{
    String(email)
    .toLowerCase()
    .match(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    )

}
const LoginValidator = ({  email, password }) => {
    const error = {

        email: "",
        password: "",
      
    }
   
    if (!email) {
        error.email = "email is required"
    }
    if (!password) {
        error.password = "password is required"
    } else if (password.length <= 6) {
        error.password = "password must have to be morethan 6 char "
    }

    return error
}
export default LoginValidator