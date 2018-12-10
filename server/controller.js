module.exports = {
  get_products: (req, res) => {
    const dbInstance = req.app.get("db");

     dbInstance.get_products()
    .then((data) => {
        res.status(200).send(data)
      })
  },
  get_cart: (req, res) => {
    const dbInstance = req.app.get('db')

    dbInstance.get_cart()
      .then((cart) => {
      res.status(200).send(cart)

    })
   
},
  create_cart: async(req, res) => {
    const dbInstance = req.app.get("db");
    const {id} = req.params

    
    let result = await dbInstance.check_cart(id)
    if(result[0]){

     let cart = await dbInstance.update_cart(id)
      cart = await dbInstance.get_cart()
        res.status(200).send(cart)
    
    } else {
      let cart = await dbInstance.create_cart(id, 1)
      if(cart){
       dbInstance.get_cart()
       .then((cart) => {
        res.status(200).send(cart)      
      })
    }}
  },  
  
  update_count: async(req, res) => {
      const dbInstance = req.app.get('db')

      console.log(req.body, req.params.id)
      

      let cart = await dbInstance.update_count(req.body.count, req.params.id)
      if (cart) {
        dbInstance.get_cart()
        .then((data) => res.status(200).send(data))
      }
  },
  
  create_user: (req, res) => {
    const dbInstance = req.app.get('db')
    const { full_name, email, password } = req.body

    dbInstance.create_user(full_name, email, password)
      .then((user) => {
        if (user) {
          req.session.user = user[0]
          res.status(200).send(req.session.user)
        }
      })
    },
  delete_item: async (req, res) => {
    const dbInstance = req.app.get('db')
    const {id} = req.params
    console.log(id)

    let cart = await dbInstance.delete_item(id)
    if(cart){
     dbInstance.get_cart()
     .then((data) => {
       console.log(cart)
       res.status(200).send(data)
     })
    }
  },
    delete_cart: (req, res) => {
      const dbInstance = req.app.get('db')

     dbInstance.delete_cart()
     .then((cart) => {
      res.status(200).send(cart)
    })
  }
  

};
