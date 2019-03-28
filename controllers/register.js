const regHandler = (req, res, bcrypt, db)=> {
	const { username, email, password } = req.body;
	if (!username || !email || !password){
		return res.status(400).json('recheck your submission')
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx=> {
		trx.insert({
		hash: hash,
		email: email
	})
		.into('login')
		.returning('email')
	.then(loginEmail => {
		return trx('users')
		.returning('*')
		.insert({
		name: username,
		email: loginEmail[0],
		joined: new Date()
		})
	})
	.then(trx.commit)
    .catch(err => {res.status(400).json(err)})
	})
	.then(user=> {res.json(user)})
	.catch(err => {res.status(400).json(err)})
	
}

module.exports = {
	regHandler: regHandler
}