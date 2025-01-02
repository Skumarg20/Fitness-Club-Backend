
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../dbconnection/entity/user.entity.js'

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const fullname = `${firstname} ${lastname}`;

    const isMatch = await User.findOne({
      where: {
        username,
        email,
      },
    });

    if (isMatch) {
      return res.status(400).json({ message: 'Please enter a unique email or username' });
    }

    const user = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    
 const userResponse=user.toJSON();
 delete userResponse.password;
    res.status(201).json({ message: 'User registered successfully', userResponse });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


userRouter.post('/login', async (req, res) => {
 try {
  const {email,username,password}=req.body;
  let user;
  if (username) {
    user = await User.findOne({ where: { username } });
  } else if (email) {
    user = await User.findOne({ where: { email } });
  }
  if(!user){
    return res.status(404).json({message:"bhai tune abhi tak signup nhi kiya hai kr le ak var please"});
  }
  const isMatch=await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.status(500).json({message:"bhai thoda dimak pe jor dal and shi password daal na yaar"});
  }
  const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1h'});
  return res.status(200).json({message:"bhai sab shi hai jab tujhe access diya maze krne ke liye ",token})
 } catch (error) {
  res.status(500).json({message:"bhai kuch to problem hai sab shi hai but kuch to problem hai try kr ak aur var nhi to mai dekhta hun"})
 }
});


userRouter.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastName, email, username,} = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    

    user.fullname =  `${firstname} ${lastName}` || user.fullname;
    user.email = email|| user.email;
    user.username = username || user.username;
    user.password=user.password;

    await user.save();

    // Convert the user instance to a plain object and delete the password field
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(200).json({ message: 'User updated successfully', user: userResponse });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

userRouter.patch('/update-password/:id',async(req,res)=>{
  try{
    const {id}=req.params;
    const {password}=req.body;
    const user=await User.findByPk(id); 
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    user.password=hashedPassword;
    await user.save();
    res.status(200).json({message:"Password updated successfully"});
  }catch(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
  });

export default userRouter;