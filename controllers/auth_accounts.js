const mysql = require('mysql2');
const encryption = require('bcrypt');
const jwt = require('jsonwebtoken')


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT

});



exports.addAccount = (req, res) => {
    //console.log(req.body)
    //res.send("FORM SUBMITTED")
//let firstName = req.body.first_name;
//let LastName = req.body.last_name;
//let emailAddress = req.body.email;
//let passWord = req.body.password;
//let confirmPassword = req.body.confirm_password;


const {user_id, email, user_password, confirm_password} = req.body

db.query("SELECT email FROM users WHERE email = ?", email,
async function(err, result){
    if(err){
        return console.log("Error message" + err);
    } else {
        if(result.length > 0){
            return res.render("register", {message: "Email already exist"});
        } else if (user_password != confirm_password){
                return res.render("register", {message: "Password does not match"});
        } else {
         db.query("INSERT INTO users set ? ", {user_id: user_id, email: email, user_password: user_password},
                //db.query("INSERT INTO accounts (first_name, last_name, email, password) VALUES(?,?,?,?)",
                //[firstName, LastName, emailAddress, passWord],
        function(err, result){
            if(err){
                return console.log("Error message" + err);
            } else {
                 console.log(result);
                 return res.render("register", {message: "User have been registered successfully"})

                        }

                    })

                }}});


};




exports.loginAccount = async (req, res) => {
  
try{
    const {email, user_password} = req.body
    if(!email || !user_password){
            return res.render("index", {message: "Email or password cannot be empty"})
        } else {
            db.query("SELECT * FROM users WHERE email =?",email,
            async function(err, result){
                if(!result){
                    return res.render("index", {message: "Email or password is incorrect"});
                } else if (!(await encryption.compare(user_password, result[0].user_password))){
                    return res.render("index", {message: "Password is incorrect"});
                } else {
                    const id = result[0].user_id;
                    const token = jwt.sign(id, process.env.JWT_SECRET);
                    const cookieOption = {expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES)*24*60*1000, httpOnly:true}
                    res.cookie("cookie_access_token", token, cookieOption);
                    console.log(token);
                    db.query("SELECT * FROM users",
                    (err,result) => {
                        if(!result){
                            return res.render('users', {message: "No results found"});
                        } else {
                            res.render("users",{title: 'list of users', data: result});

                        }

                    })
                }
            }
        )
     }

}
    catch(err) {console.log(err)};
}

exports.updateForm = (req,res) => {
    const email = req.params.email;
    db.query(`SELECT * FROM users WHERE email = "${email}"`,
    (err,result) => {
        console.log(email)
        res.render("updateform",{title: 'Update user account', user: result[0]})
        });
}

exports.updateUser = (req,res) => {

    const {first_name, last_name, email} = req.body;
    db.query(`UPDATE students SET
    first_name = '${first_name}',
    last_name = '${last_name}'
    WHERE email= '${email}'`,(err) => {
        if(err) throw err
        else
            db.query('SELECT * FROM students',(err,result) => {
                res.render('students',{title: 'List of Users', data: result});
         });
    })}

    exports.deleteUser = (req,res) => {
        const email = req.params.email;
        db.query(`DELETE FROM students WHERE email = '${email}'`,
        (err) => {
            if(err) throw err
            else
            db.query('SELECT * FROM students', (err,result) => {
                res.render('students', {title: 'list of user', data:result})

            })
        })
    }


exports.logoutAccount = (req,res) => {
    res.clearCookie("cookie_access_token")
    res.render("index");
    //if(req.session){
       // req.session.destroy((err) => {
       // if(err){
          //  res.status(400).send("Unable to logout");
           // }else {
                
          //  }})
 //   } else {
       // console.log("No session");
      //  res.end();
   // }
}
 

