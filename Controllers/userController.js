import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import User from '../Models/userModel.js'

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid Credentials' })

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' },
    )

    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export const signup = async (req, res) => {
  console.log(`This is request body data: ${req.body}`)
  const { firstname, lastname, email, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser)
      return res.status(400).json({ message: 'User Already Exists.' })

    if (password !== confirmPassword) {
      return res.status(400).json({ message: `Passwords don't match` })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)

      const result = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      })

      const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
        expiresIn: '1h',
      })

      res.status(200).json({ result, token })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
    console.log(error)
  }
}

export const updateUser = async (req, res) => {
  const {
    userId,
    dob,
    gender,
    mobile,
    occupation,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
  } = req.body
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send('No sessions with that id')
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          dob,
          gender,
          mobile,
          occupation,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
          country,
        },
        {
          new: true,
        },
      )
      res
        .status(200)
        .json({ message: 'Profile Updated Successfully.', updatedUser })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
    console.log(error)
  }
}
