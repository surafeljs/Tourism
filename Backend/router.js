const express=require('express')
const  {body,validationResult, }=require('express-validator')
const jwt =require("jsonwebtoken")
const nodemailer = require("nodemailer");

const cookieParser = require('cookie-parser')
const { rateLimit } = require ('express-rate-limit')
const router=express.Router()
router.use(express.json());
router.use(express.urlencoded({extended:true}))
router.use(cookieParser())
const cors=require('cors')

const { v4: uuidv4 } = require('uuid');
const bcrypt =require('bcrypt')
const pg_connection=require('../Backend/config/database_config')
router.use(cors({
    origin: 'http://localhost:5173', 
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));




// login page limiter

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,   // 5 minute
	limit: 5, 
  handler: (req, res, next) => {
   
    res.status(429).json({
      status: false,
     errors:[
     {  msg: 'Too many requests. Please try again after 5 minutes.'}
     ]
    });
  }
})
///////////////////////////////////////////////////////////////////





// signpu / create limiter

const createlimiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	limit: 6, 
  handler: (req, res, next) => {
   
    res.status(429).json({
      status: false,
     errors:[
     {  msg: 'Too many requests. Please try again after 5 minutes.'}
     ]
    });
  }
})
////////////////////////////////////////////////////////////////////////////










//signpu / create

router.post('/create_Account',createlimiter,
    
[ body('firstname').trim().notEmpty().withMessage('First name is required'),
body('lastname').trim().notEmpty().withMessage('Last name is required'),
body('email').trim().isEmail().notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email') ,
body('password').trim().notEmpty().withMessage('password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long') 
]

,async(req,res)=>{

const user_id = uuidv4();

    const errors=validationResult(req)

  
        if (!errors.isEmpty()) {
            // Validation failed
            console.log('Validation errors:', errors.array());
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
            
        }

 try {
  const { firstname, lastname, email, password } = req.body;


  // 1️⃣ Check duplicate email
  const already = await pg_connection.query(
    'SELECT * FROM create_account WHERE email = $1',
    [email]
  );

if (already.rowCount > 0) {
  return res.status(400).json({
    status: false,
    errors: [
      { msg: 'Email already exists' }
    ]
  });
}




// hashing

const  salt=await bcrypt.genSalt(10)
const hash= await bcrypt.hash(password,salt)

  await pg_connection.query(
    `INSERT INTO create_account
     (user_id, firstname, lastname, email, password)
     VALUES ($1, $2, $3, $4, $5)`,
    [user_id, firstname, lastname, email, hash]
  );


  const payload={user_id,firstname,email}
  const secret=process.env.JWTSECRET
const token= jwt.sign(payload,secret,{expiresIn:'1h'})

res.cookie('token', token, {
  httpOnly: true,   
  secure:false,
  maxAge: 60 * 60 * 1000, 
});



  return res.json({
    status: true,
    result: 'Account created successfully',
    token:token
   
  });

} catch (error) {
  console.error(error.message);

  return res.status(500).json({
    status: false,
    errors: [
       { msg:'Server error'}
    ]
  });
}

  
})
/////////////////////////////////////////////////////////////////////////////////////////













//login

router.post('/login',limiter,body('email').trim().notEmpty().withMessage("Email is required"),
body('password').trim().notEmpty().withMessage("Password is required"),async(req,res)=>{

    const {email,password}=req.body
     
 const errors =validationResult(req)
      if (!errors.isEmpty()) {
       
            console.log('Validation errors:', errors.array());
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
            
        }


try {

const result=await pg_connection.query('SELECT * FROM create_account  WHERE email = $1 ',[email])
     


if (result.rowCount === 0){
  return res.status(400).json({
               status: false,
    errors: [
       { msg:'Invalid email or password'}
    ]
            });
}
const hashpassword =result.rows[0].password
const users =result.rows[0]


const match = await bcrypt.compare(password,hashpassword)

if (!match) {
     return res.status(400).json({
               status: false,
    errors: [
       { msg:'Incorect email or password'}
    ]
            });
}
      const payload = {
        user_id: users.user_id,
        firstname: users.firstname,
        email: users.email
      };

      const token = jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: '1h'
      });

      // ✅ SET COOKIE AGAIN
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        maxAge: 60 * 60 * 1000
      });




    return res.json({
        status:true,
      
    msg:'Login succesfuly',
     token:token
    
    })

    
    
} catch (error) {
      return res.status(400).json({
               status: false,
    errors: [
       { msg:'Server error'}
    ]
            });
}


})
////////////////////////////////////////////////////////////////////////////////////







//passwordforgate



router.post('/forgate',body('email').trim().isEmail().withMessage("Email is required"),async(req,res)=>{

  
                       const{email}=req.body
  const errors=validationResult(req)
                        if (!errors.isEmpty()) {
                             console.log('Validation errors:', errors.array());
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
                        }

try {
  const user =await pg_connection.query("SELECT *FROM create_account WHERE email = $1 ",[email])
  
const select_user_count=user.rowCount
const select_email=user.rows[0].email
console.log(select_user_count);

if (select_user_count === 0) {
  console.log('user not found');
  return res.status(400).json({
    errors:[
      {status:false},
      {msg:'user not found'}
    ]
  })
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const info={
  from: `"My App" <${process.env.EMAIL_USER}>`,
    to: `${email}`,
    subject: "Welcome",
    text: "Welcome to our app!",
    html: "<h1>Welcome</h1><p>Thanks for joining</p>",
}
   transporter.sendMail(info,(err,info)=>{
    if (err) {
     return  res.json({
errors:[
  {status:false},
  {err:err.message},
  {msg:"Email Not sent successfully"}
  
]  
    })
    }else{
     return res.json({
        sttus:true,
        msg:"Email sent successfully",
        info:info.messageId
      })
    }
  })


  
} catch (error) {
  
}


  

})













//logout


router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false // true in production
  });

  return res.json({
    status: true,
    msg: 'Logged out successfully'
  });
});












//dashbord
router.get('/dashbord', async (req, res) => {
  const token = req.cookies.token
  const secret = process.env.JWTSECRET

  if (!token) {
    return res.json({
      status: false,
      msg: ' not Unauthorized'
    })
  }


});

     
  


module.exports=router





















































