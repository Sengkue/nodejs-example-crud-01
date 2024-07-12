# Node API Project

This project is a basic Node.js API that includes user authentication and category management using Express.js, Sequelize, and MySQL.

## Getting Started

These instructions will help you set up the project on your local machine.

### Prerequisites

- Node.js and npm
- MySQL

### Installing

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install the required npm packages:
    ```sh
    npm install express body-parser cors nodemon dotenv bcrypt mysql2 sequelize
    ```

3. Create a `.env` file in the root directory and add your database configuration:
    ```sh
    DB_NAME='testseng'
    USER='root'
    PASSWORD=''
    PORT='8080'
    SECRET_KEY=1181
    ```

4. Create a `.gitignore` file in the root directory:
    ```sh
    .env
    node_modules
    package-lock.json
    ```

### Running the Server

1. To start the server, run:
    ```sh
    npm start
    ```
   The server will run on the port specified in the `.env` file (default: 8080).

## Project Structure

- `server.js`: Main entry point of the application.
- `config/db.js`: Database configuration and connection using Sequelize.
- `models/category.model.js`: Category model definition.
- `controllers/category.controller.js`: Category controller with CRUD operations.
- `router/router.js`: Main router file.
- `router/category.routes.js`: Category routes.

# Code

## server.js
```javascript
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./config/db");
const routes = require("./router/router");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
  return res.json("welcome to node api");
});

app.post("/api", (req, res) => {
  console.log(req.body);
  res.send("Hello world!");
});

const port_A = 8000;
const port = process.env.PORT || port_A;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

## config/db.js
```javascript
const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
    dialectOptions: {},
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

module.exports = sequelize;
```
# models
## models/category.model.js
```javascript  
const DataTypes = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Category;
 ```
## models/product.model.js
```javascript 
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./category.model");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sale_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cost_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Barcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

module.exports = Product;

```
## models/user.model.js
```javascript
const DataTypes = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Category;

```
# router
## router/router.js
```javascript
const route = require('express').Router();
const category = require('./category.routes');
const product = require('./product.routes');
const user = require('./user.routes');

route.use('/category', category);
route.use('/product', product);
route.use('/user', user);

module.exports = route;
```
## router/category.routes.js
```javascript
const controller = require('../controllers/category.controller');
const route = require('express').Router();

route.post('/', controller.create);
route.get('/', controller.findAll);
route.get('/:id', controller.findOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.delete);

module.exports = route;
```
## product.routes.js
```javascript
const controller = require('../controllers/product.controller');
const route = require('express').Router();

route.post('/', controller.create);
route.get('/', controller.findAll);
route.put('/:id', controller.update);
route.delete('/deleteAll', controller.deleteAll);
route.delete('/:id', controller.delete);
route.get('/:id', controller.findOne);


module.exports = route;

```
## user.routes.js
```javascript
const controller = require('../controllers/user.controller');
const route = require('express').Router();

route.post('/', controller.create);
route.get('/', controller.findAll);
route.get('/:id', controller.findOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.delete);

module.exports = route;
```
# controller
## controllers/category.controller.js
```javascript
const Category = require("../models/category.model");

exports.create = (req, res) => {
  const category = {
    category: req.body.category,
  };
  Category.create(category)
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(200).json({ result: error });
    });
};

exports.findAll = (req, res) => {
  Category.findAndCountAll()
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Category.findOne({ where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const category = {
    category: req.body.category,
  };
  Category.update(category, { where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(200).json({ result: error });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Category.destroy({ where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
```

## controller/product.controller.js
```javascript
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');
exports.create = (req, res) => {
  Product.create({ ...req.body })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(200).json({ result: error });
    });
};
exports.findAll = (req, res) => {
  sequelize
    .query(
      `SELECT pr.profile, pr.id, pr.name, ca.category,pr.size, pr.color, pr.description, pr.quantity, pr.sale_price, pr.cost_price, pr.Barcode, pr.createdAt, pr.updatedAt,
      ca.id AS category_id
      FROM products pr
      INNER JOIN categories ca ON pr.category_id = ca.id`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  sequelize
    .query(
      `SELECT pr.profile, pr.id, pr.name, ca.category,pr.size_id, pr.color, pr.description, pr.quantity, pr.sale_price, pr.cost_price, pr.Barcode, pr.createdAt, pr.updatedAt, sup.name AS supplier_name,
      ca.id AS category_id, sup.id AS supplier_id
      FROM products pr
      INNER JOIN categories ca ON pr.category_id = ca.id
      INNER JOIN Suppliers sup ON pr.supplier_id = sup.id
      WHERE pr.id = :id`,
      {
        replacements: { id: id },
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ result: 'Product not found1' });
      }
      const product = data[0];
      return res.status(200).json({ result: product });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  const updatedProduct = { ...req.body };

  Product.update(updatedProduct, { where: { id: id } })
    .then((result) => {
      if (result[0] === 1) {
        // Product updated successfully
        return res.status(200).json({ result: "Product updated successfully" });
      } else {
        // Product not found
        return res.status(404).json({ result: "Product not found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Product.destroy({ where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.deleteAll = async (req, res) => {
  try {
    const deletedCount = await Product.destroy({ where: {} });
    return res.status(200).json({ result: `Deleted ${deletedCount} products successfully` });
  } catch (error) {
    return res.status(500).json({ result: error });
  }
};

```
## controller/user.controller.js
 ``` javascript
const User = require("../models/user.model");
const bcrypt = require('bcrypt');

exports.create = async(req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  const user = {
    user: req.body.user,
    password: password,
  };
  User.create(user)
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(200).json({ result: error });
    });
};

exports.findAll = (req, res) => {
  User.findAndCountAll()
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findOne({ where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const user = {
    user: req.body.user,
  };
  User.update(user, { where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(200).json({ result: error });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};

    ```








### Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/your-username)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.