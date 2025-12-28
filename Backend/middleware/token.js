    const token =req.cookies.token
  const secret=process.env.JWTSECRET

    if (!token) {
        return res.json({
    status:false,
    msg:' not Unauthorized'
})
    }
// console.log(token);

    const user = jwt.verify(token,secret)


        if (!user) {
        return res.json({
    status:false,
    msg:'Unauthorized'
})

    }

