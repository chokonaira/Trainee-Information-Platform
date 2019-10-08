import client from '../redis/connection';
import shortid from "shortid";

class TraineeController {

static addTrainee(request, response) {
      try{
        const { firstname, lastname, email, stack } = request.body;
        const id = shortid.generate();
        const startDate = new Date().toLocaleDateString();

        client.hexists(`Trainee:${id}`, 'id', (err, reply) => {

        if(reply){
          return response.status(401).json({
            status: 401,
            message: 'Trainee with this record already exist',
          }); 
        } else {
          const newTrainee = {
            id, firstname, lastname, email, stack, startDate
          };    
          client.hmset(`Trainee:${id}`, newTrainee, () => {
            return response.status(201).json({
              status: 201,
              message: 'Trainee Record successfully created',
              data: newTrainee
            });
          })
        }
      });
      } catch(error){
        return response.status(500).json({ 
          status: 500,
          message: error.message
        });
      }

  }

  static getATrainee(request, response) {

    try {
      let id = request.params.id;
      client.hexists(`Trainee:${id}`, 'id', (err, reply) => {
      if(!reply){
        return response.status(404).json({
          status: 404,
          message: 'Trainee with this record does not exist',
        });
      } else {
        client.hgetall(`Trainee:${id}`, (err, reply) => {
          return response.status(200).send({
            status: 200,
            message: 'Trainee record retrieved succesfully',
            data: reply
          });
        });
      }
      });
    } catch(error){
      return response.status(500).json({ 
        status: 500,
        message: error.message
      });
    }
  }

  static editATrainee(request, response) {
    try{
      let id = request.params.id;
      const { firstname, lastname, email, stack } = request.body;
      const startDate = new Date().toLocaleDateString();

      client.hexists(`Trainee:${id}`, 'id', (err, reply) => {

      if(!reply){
        return response.status(404).json({
          status: 404,
          message: 'Trainee with this ID does not exist',
        }); 
      } else {
        const dateUpdated = new Date().toLocaleDateString();
        const newTrainee = {
          firstname, lastname, email, stack, startDate, dateUpdated
        };    
        client.hmset(`Trainee:${id}`, newTrainee, () => {
          return response.status(200).json({
            status: 200,
            message: 'Trainee Record updated successfully',
            data: newTrainee
          });
        })
      }
    });
    } catch(error){
      return response.status(500).json({ 
        status: 500,
        message: error.message
      });
    }

}

  static async getAllTrainee(request, response) {
    try {
      let keys;
      client.keys('Trainee:*', async (err, reply) => {
        keys = reply;
      const trainees = await Promise.all(keys.map( async key => {
       return new Promise((resolve, reject) => {
        client.hgetall(key, (err, reply) => {
          if(err)  reject(err);
            resolve(reply)
          });
       })
      }))
      
        if(!trainees){
          return response.status(404).send({
            status: 404,
            error: 'No Trainee record available',
          });
        } else {
          return response.status(200).send({
            status: 200,
            message: 'All Trainee records retrieved succesfully',
            data: trainees
          });
        }
      });
    } catch(error){
      return response.status(500).json({ 
        status: 500,
        message: error.message
      });
    }
  }

  static async deleteATrainee(request, response) {

    try{
      const id = request.params.id;
  
      client.hexists(`Trainee:${id}`, 'id', (err, reply) => {
      if(!reply){
        return response.status(404).json({
          status: 404,
          message: 'Trainee with this record does not exist',
        });
      } else {
        client.del(`Trainee:${id}`, () => {
          return response.status(200).json({
            status: 200,
            message: 'Trainee record succesfully deleted',
          });
        });
      }
          
    });
    } catch(error){
      return response.status(500).json({ 
        status: 500,
        message: error.message
      });
    }
  }
}
export default TraineeController;
