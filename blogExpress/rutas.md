**routes/index.js**

**PUG**
**routes/posts.js**
GET /posts (index.pug) - Recupera todos los posts y me los muestra 
GET /posts/IDPOST - Recupera el post con su ID especifico
GET /posts/nuevo (form.pug) - Formulario para insertar un nuevo post
POST /posts/crear - Gestiona la creación de ese nuevo post 
GET /posts/editar/IDPOST - Formulario para editar un post (con los datos del post a editar)
POST /posts/actualizar - Gestiona esa actualización del post
GET /posts/borrar/IDPOST - Borra un post

**API**
**routes/api/posts.js** **esta seria la documentación de mi API**
GET /api/posts - recuperar todos los datos de los posts
GET /api/posts/IDPOST - recuperar los datos de un post a través de su ID
POST /api/posts - Crear un nuevo post.
PUT /api/posts - Edita un post 
DELETE /api/posts/IDPOST - Elimina un post

