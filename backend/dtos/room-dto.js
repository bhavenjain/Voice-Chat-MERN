class RoomDto {
  id
  topic
  ownerId
  roomType
  speakers
  createdAt

  constructor (room) {
    this.id = room._id
    this.topic = room.topic
    this.roomType = room.roomType
    this.ownerId = room.ownerId
    this.speakers = room.speakers
    this.createdAt = room.createdAt
  }
}

module.exports = RoomDto
