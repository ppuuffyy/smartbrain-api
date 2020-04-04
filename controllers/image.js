const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'dae96572b3ea4f699f1d993cb1188f5f'
   });
  
const handleApiCall = (req,res) => {

   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))

}
const handleImage = (req,res, db) => {
    const {id} = req.body;
    db('users').where('id','=',id).increment('entries', 1).returning('entries')
        .then(entries => {
            if (entries.length){
                res.json(entries[0]);
            }
            else {
                res.status(400).json('can not update entries');
            }
            
        }).catch(err => res.status(400).json(err));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
