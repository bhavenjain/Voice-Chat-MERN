const roomService = require('../../services/user/room-service')
const RoomDto = require('../../dtos/room-dto')

class RoomsController {
  async create (req, res) {
    const { topic, roomType } = req.body
    if (!topic || !roomType) {
      res.status(400).json({ message: 'All Fields are required' })
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id
    })

    res.json(new RoomDto(room))
  }

  async index (req, res) {
    const rooms = await roomService.getAllRooms(['open'])
    const allRooms = rooms.map(room => new RoomDto(room))
    // console.log(allRooms)
    return res.json(allRooms)
  }
}

module.exports = new RoomsController()
