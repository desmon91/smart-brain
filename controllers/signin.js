const signHandler = (req, res, bcrypt, db) => {
const { email, password } = req.body;
	if (!email || !password){
		return res.status(400).json('recheck your submission')
	}
	db.select('*').from('login')
	.where({email:email})
	.then(data=>{
	const isValid = bcrypt.compareSync(password, data[0].hash)
	if (isValid){
		return db.select('*').from('users')
		.where({email:email})
		.then(user=>{res.json(user[0])})
		}
		else { return res.status(400).json('wrong id or password')}
	})
	.catch(console.log)
}
	module.exports = {
		signHandler: signHandler
	}