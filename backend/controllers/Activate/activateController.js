const Jimp = require('jimp')
const path = require('path')
const UserDto = require('../../dtos/user-dtos')
const userModel = require('../../models/userModel')

class ActivateController {
  async activate (req, res) {
    const { name, avatar } = req.body
    if (!name || !avatar) {
      res.status(400).json({ message: 'All Fields are required' })
    }
    // Converting and removing starting from type of image
    const avatarFinal = avatar.replace(/^data:image\/[a-z]+;base64,/, '')
    const buffer = Buffer.from(avatarFinal, 'base64')

    // Image Path
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`

    // Compressing the avatar
    try {
      const jimpResp = await Jimp.read(buffer)
      // Resize by providing only width to maintain aspect ratio
      jimpResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../../storage/${imagePath}`))
    } catch (error) {
      res.status(500).json({ message: 'Image Proccessing error' })
    }

    // Update the user
    try {
      const userId = req.user._id
      const user = await userModel.findOne({ _id: userId })
      if (!user) {
        res.status(404).json({ message: 'User does not exist' })
      }

      user.activated = true
      user.name = name
      user.avatar = `/storage/${imagePath}`
      user.save()
      res.json({ user: new UserDto(user), auth: true })
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'User Register error' })
    }
  }
}

module.exports = new ActivateController()
