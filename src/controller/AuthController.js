import client from '../redis/connection';
import bcrypt from 'bcryptjs';
import { Auth } from '../middlewares/generateToken';
import { hashPassword } from '../helpers/helper';
import shortid from "shortid";

const { generateToken } = Auth;

class AuthController {

  static async signUp (request, response){
    try{
      const { username, email, password } = request.body;
      const id = shortid.generate();
      const hashedpassword = hashPassword(password);
      const newUser = { id, username, email, hashedpassword }; 
  

      const token = await generateToken({id, email});

      client.hmset(`User:${email}`, newUser, () => {
        return response.status(201).json({
          status: 201,
          message: 'Signup successfully',
          token,
          newUser: {
            id,
            username,
            email
          },
        });
      })
    } catch(error){
      return response.status(500).json({ 
        status: 500,
        message: error.message
      });
    }
  }

  static async login (request, response) {
    try {
      const { email, password } = request.body;
      
      client.hexists(`User:${email}`, 'email', (error, reply) => {
      if(reply){

        client.hgetall(`User:${email}`, (err, reply) => {
         
        if (bcrypt.compareSync(password, reply.hashedpassword)) {
          const { id, username, email } = reply;

        const token = generateToken({id, email, username});
        const existingUser = { id, username, email }; 

        client.hmset(`User:${email}`, existingUser, () => {
          return response.status(200).send({
            status: 200,
            message: 'Login Successful',
            token,
            existingUser: {
              id,
              username,
              email
            }, 
          });
        });
      } else {
        return response.status(401).json({
          status: 401,
          message: 'Invalid email or password'
        });
      }
    });
    } else {
      return response.status(401).json({
        status: 401,
        message: 'Invalid email or password'
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
export default AuthController;
