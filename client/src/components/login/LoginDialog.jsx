
import {Box, Button, Dialog, styled, TextField, Typography} from '@mui/material';
import { useState, useContext} from 'react';
import { authenticateSignup, authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/Dataprovider';



const Component = styled(Box)`
    height: 70vh;
    width: 90vh;
`;


const Image = styled(Box)`
  background:rgb(194, 47, 184) url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
  height: 83%;
  width: 28%;
  padding: 45px 35px;                   

  & > p, & > h5 {
    color: #FFFFFF;
    font-wright: 600;
  }
`;


const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;

  & > div , & > button, & > p {
    margin-top: 20px;
  }
`;



const LoginButton = styled(Button)`
text-transform: none;
background:rgb(251, 27, 221);
color: #fff ;
height: 48px;
border-radius: 2px;


`

const RequestOtpButton = styled(Button)`
text-transform: none;
background: #fff;
color: #2874f0 ;
height: 48px;
border-radius: 2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);


`

const Text = styled(Typography)`
font-size: 12px;
color: #878787;



`

const CreateAccount = styled(Typography)`
font-size: 13px;
text-align: center;
color: #2874f0;
font-weight: 600;
cursor: pointer;
`

const Error = styled(Typography)`
font-size: 10px;
color: #ff6161;
line-height: 0;
margin-top: 10px;
font-weight=600;
`

const accountInitialValue = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your orders, wishlist and Recommendations'
    }, 
    signup: {
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: "Signup with your mobile number to get started"
    }
}

const signupIntialvalue = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''

}

const loginInitialValues={
  username:'',
  password:''
}




function LoginDialog({open, setOpen}) {
const [account, toggleAccount] = useState(accountInitialValue.login)
const [signup, setSignup]= useState(signupIntialvalue);
const [login, setLogin]= useState(loginInitialValues);
const [error, setError] =useState(false);


const handleClose = ()=>{
    setOpen(false);
    toggleAccount(accountInitialValue.login)
}

const togglesignup =()=>{
    toggleAccount(accountInitialValue.signup);
}

const onInputChange = (e) => {
   setSignup({...signup, [e.target.name]:e.target.value });
  

}
const {setAccount} = useContext(DataContext)

const signupUser = async ()=>{
   let response = await authenticateSignup(signup);
   if(!response) return;
   handleClose();
   setAccount(signup.firstname  )

}
const onValueChange = (e) => {
  setLogin({ ...login, [e.target.name]: e.target.value });
};

const loginUser = async () => {
  try {
    let response = await authenticateLogin(login);
    if (response && response.status === 200) {
      handleClose();
      setAccount(response.data.data.firstname);
    } else {
      setError('Invalid username or password');  // Provide a more specific error message
    }
  } catch (error) {
    console.error("Login error: ", error);
    setError('An error occurred while logging in. Please try again later.');
  }
};

  return (
   <Dialog open ={open} onClose={handleClose} PaperProps={{sx:{maxWidth:'unset'}}}>
    <Component>
        <Box style={{display: 'flex', height:'100%'}}>
        <Image>
            <Typography variant='h5'>{account.heading}</Typography>
            <Typography style={{marginTop:20}}>{account.subHeading}</Typography>
        </Image>

        {
            account.view ==='login'?
            <Wrapper>
           <TextField variant='standard' onChange={(e)=> onValueChange(e)} name='username' label="Enter Username" />
           {error && <Error>Please Enter valid username and password</Error>}
           <TextField variant='standard' onChange={(e)=> onValueChange(e)} name='password' label="Enter Pasword" />
           <Text>By continuing, you agree to IndiCulture's Term of use and privacy policy.</Text>
           <LoginButton onClick={()=> loginUser()}>Login</LoginButton>
           <Typography style={{textAlign:'center'}}>OR</Typography>
           <RequestOtpButton>Request OTP</RequestOtpButton>
           <CreateAccount onClick={()=> togglesignup()}>New to Indiculture? Create an account</CreateAccount>
            

        </Wrapper>
        :
        <Wrapper>
           <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='firstname' label="Enter Firstname" />
           <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='lastname' label="Enter Lastname" />
           <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='username' label="Enter USername" />
           <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='email' label="Enter Email" />
           <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='password' label="Enter Password" />
           <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='phone' label="Enter Phone" />
           
           <LoginButton onClick={()=> signupUser()}>Continue</LoginButton>
           
            

        </Wrapper>}

        </Box>
    </Component>

   </Dialog>
  )
}

export default LoginDialog
