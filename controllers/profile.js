const profHandler = (req, res, db)=> {
	const { id } = req.params
	let found = false
	db.users.forEach(user=> {
		if (user.id === id){
			found = true
			return res.send(`Welcome Back ${user.username}`);}
		})
	if (!found){return res.status(400).json(`User not found!`);}
}

module.exports = {
	profHandler: profHandler
}