const express=require('express')
const  {body,validationResult, }=require('express-validator')
const jwt =require("jsonwebtoken")
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

  const user = jwt.verify(token, secret)

  if (!user) {
    return res.json({
      status: false,
      msg: 'Unauthorized'
    })
  }

  console.log(user);

  // include isAdmin flag for frontend convenience
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const isAdmin = adminEmail ? (String(user.email || '').toLowerCase() === adminEmail) : false;

  return res.json({
    status: true,
    msg: user,
    isAdmin
  })

})

// authentication middleware for protected routes
function authenticate(req, res, next) {
  const token = req.cookies && req.cookies.token;
  const secret = process.env.JWTSECRET;

  if (!token) {
    return res.status(401).json({ status: false, msg: 'Unauthorized' });
  }

  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, msg: 'Invalid token' });
  }
}

// authorizeAdmin: only a single admin allowed (ADMIN_EMAIL)
function authorizeAdmin(req, res, next) {
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  if (!adminEmail) {
    return res.status(403).json({ status: false, msg: 'Admin not configured' });
  }

  const userEmail = (req.user && req.user.email) ? String(req.user.email).toLowerCase() : null;
  if (!userEmail || userEmail !== adminEmail) {
    return res.status(403).json({ status: false, msg: 'Admin access required' });
  }

  next();
}

// Admin stats endpoint
router.get('/admin/stats', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const usersRes = await pg_connection.query('SELECT COUNT(*)::int AS count FROM create_account');
    let postsCount = 0;
    try {
      const postsRes = await pg_connection.query('SELECT COUNT(*)::int AS count FROM posts');
      postsCount = postsRes.rows[0].count;
    } catch (e) {
      postsCount = 0; // posts table may not exist yet
    }

    return res.json({ users: usersRes.rows[0].count, posts: postsCount, visits: 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Server error' });
  }
});

// List users
router.get('/admin/users', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const result = await pg_connection.query('SELECT user_id, firstname, lastname, email FROM create_account ORDER BY firstname');
    return res.json({ status: true, users: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Server error' });
  }
});

// Get single user
router.get('/admin/users/:id', authenticate, authorizeAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pg_connection.query('SELECT user_id, firstname, lastname, email FROM create_account WHERE user_id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ status: false, msg: 'User not found' });
    return res.json({ status: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Server error' });
  }
});

// Update user
router.put('/admin/users/:id', authenticate, authorizeAdmin, async (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, email } = req.body;
  try {
    const exists = await pg_connection.query('SELECT user_id FROM create_account WHERE user_id = $1', [id]);
    if (exists.rowCount === 0) return res.status(404).json({ status: false, msg: 'User not found' });

    await pg_connection.query(
      'UPDATE create_account SET firstname = $1, lastname = $2, email = $3 WHERE user_id = $4',
      [firstname || exists.rows[0].firstname, lastname || exists.rows[0].lastname, email || exists.rows[0].email, id]
    );

    return res.json({ status: true, msg: 'User updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Server error' });
  }
});

// Delete user
router.delete('/admin/users/:id', authenticate, authorizeAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pg_connection.query('DELETE FROM create_account WHERE user_id = $1 RETURNING user_id', [id]);
    if (result.rowCount === 0) return res.status(404).json({ status: false, msg: 'User not found' });
    return res.json({ status: true, msg: 'User deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Server error' });
  }
});


// Create user (admin)
router.post('/admin/users', authenticate, authorizeAdmin,
  [ body('firstname').trim().notEmpty().withMessage('First name is required'),
    body('lastname').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { firstname, lastname, email } = req.body;
    try {
      // check duplicate
      const already = await pg_connection.query('SELECT * FROM create_account WHERE email = $1', [email]);
      if (already.rowCount > 0) {
        return res.status(400).json({ status: false, errors: [{ msg: 'Email already exists' }] });
      }

      const user_id = uuidv4();
      // generate temporary password for the user
      const tempPassword = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(tempPassword, salt);

      await pg_connection.query(
        `INSERT INTO create_account (user_id, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)`,
        [user_id, firstname, lastname, email, hash]
      );

      return res.json({ status: true, msg: 'User created', user: { user_id, firstname, lastname, email }, tempPassword });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: 'Server error' });
    }
  }
);

module.exports=router





















































