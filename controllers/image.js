const Clarifai = require ('clarifai');


const app = new Clarifai.App({
 apiKey: 'f69bf12b70ed4b5fb58ecf64e5b336de'
});

const ApiCall = (req, res)=> {
	app.models.predict(Clarifai.FACE_DETECT_MODEL,
            req.body.input)
	.then(data=>res.json(data))
	.catch(err=>res.status(400).json(err))
}

const imgHandler = (req, res, db)=>{
	const { id } = req.body
	db('users').increment('scores',1)
	.where({id:id})
	.returning('scores')
	.then(scores=>{res.json(scores[0])})
	.catch(err=>{res.status(400).json('cannot get score')})
		}

module.exports = {
	imgHandler: imgHandler,
	ApiCall: ApiCall
}