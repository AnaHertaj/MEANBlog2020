export class Post {

    //propiedades del modelo/clase
    _id: number;
    titulo: string;
    categoria: string;
    contenido: string;
    url_imagen: string;

    constructor(pId: number, pTitulo: string, pCategoria: string, pContenido: string, pUrl_imagen: string){
        this._id = pId;
        this.titulo = pTitulo;
        this.categoria = pCategoria;
        this.contenido = pContenido;
        this.url_imagen = pUrl_imagen; 
    }
    
}