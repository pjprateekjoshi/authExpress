const index = (req,res) => {
    res.render("index.ejs");
}

const create = (req,res) => {
    res.render("create.ejs");
}

const created = (req,res) => {
    //if valid data insert to database, create session, then:
        res.redirect("/user") ;
    //in case invalid data is received, res.redirect("/create"); with validation message
}

const login = (req,res) => {
    res.render("login.ejs");
}

const tryLogin = (req,res) => {
    //if authenticated, create session then:
      res.redirect("/user");
    //else res.redirect("/login"); alongwith the message of wrong credentials
}

const loggedIn = (req,res) => {
    res.send("Checks whether logged in (session set) if not then redirects to /login.<br\>Welcome for new users, secret display for existing users");
}

module.exports = {
    index,
    create,
    created,
    login,
    tryLogin,
    loggedIn
}