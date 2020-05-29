import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const CheckisProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!CheckisProvider) {
      return res.status(401).json({
        error: 'apenas prestadores de serviço podem visuzlisar notificações',
      });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
