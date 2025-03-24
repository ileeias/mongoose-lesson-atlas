// import { User } from '../models/User.js';

// class UserController {
//   async create(req, res) {
//     try {
//       const { fullname, email, number, city, street } = req.body;
//       const user = await new User({
//         fullname,
//         email,
//         number,
//         address: { city, street }
//       }).save();
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// export default new UserController();
import { User } from '../models/User.js';

class UserController {
  async create(req, res) {
    try {
      const { fullname, email, number, city, street } = req.body;

      // Проверка наличия всех полей
      if (!fullname || !email || !number || !city || !street) {
        return res
          .status(400)
          .json({ error: 'Все поля обязательны для заполнения.' });
      }

      // Создание пользователя
      const user = await new User({
        fullname,
        email,
        number,
        address: { city, street },
      }).save();

      console.log('Пользователь успешно создан:', user); // Лог успешного создания
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { fullname, email, number, address} = req.body;
      const result = await User.findByIdAndUpdate(
        id,
        { fullname, email, number, address},
        { new: true }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async delete(req, res) {
      try {
          const { id } = req.params;
          const result = await User.findByIdAndDelete(id);
          res.json({ message: "Удален", deletedProduct: result });
      } catch (error) {
          res.status(500).json({error: error.message});
      }
    }
}

export default new UserController();
