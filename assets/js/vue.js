const products = [
  { id: 1, description: 'Quarz Luxe', price: 12, img: 'assets/img/quarz-luxe.JPG'},
  { id: 2, description: 'Curren Business', price: 20, img: 'assets/img/curren-business.JPG'},
  { id: 3, description: 'Curren Sport', price: 5, img: 'assets/img/curren-sport.JPG'},
  { id: 4, description: 'Jaragar Racing', price: 8, img: 'assets/img/jaragar-racing.JPG'},
  { id: 5, description: 'Liges Hommes', price: 3, img: 'assets/img/liges-hommes.JPG'},
  { id: 6, description: 'Maserati Mechanical', price: 65, img: 'assets/img/maserati-mechanical.JPG'},
  { id: 7, description: 'Montre Mecanique', price: 25, img: 'assets/img/montre-mecanique.JPG'},
  { id: 8, description: 'Brand Designer', price: 28, img: 'assets/img/brand-designer.JPG'},
  { id: 9, description: 'Relogio Masculino', price: 4, img: 'assets/img/relogio-masculino.JPG'},
  { id: 10, description: 'Tissot Multifunction', price: 29, img: 'assets/img/tissot-multifunction.JPG'},
  { id: 11, description: 'Hip Hop Gold', price: 87, img: 'assets/img/hiphop-gold.JPG'},
  { id: 12, description: 'Mesh Genova', price: 6, img: 'assets/img/mesh-genova.JPG'},
];

let like=[];
let panier=[];

const Home={
    template:"#home",
    name:'Home',
    data:()=>{
        return{
            products,
            liked:[],
            searchKey:'',
            cart:[],
        }
    },
    computed:{
        filterList(){
            return this.products.filter((product)=>{
                return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },
        getlikeCookie(){
            let cookieValue=JSON.parse($cookies.get("like"));
            cookieValue==null ?this.liked=[]:this.liked=cookieValue;
            like=this.liked;
        },

        cartTotalAmount(){
            let total=0;
            for (let i = 0; i < this.cart.length; i++) {
                total=total+(this.cart[i].price*this.cart[i].quantite);
                
            }
            return total;
        },

        cartTotalQuantity(){
            let total=0;
            for (let i = 0; i < this.cart.length; i++) {
                total=total+this.cart[i].quantite;
                
            }
            return total;
        },

    },
    methods:{
        setLikeCookie(){
            document.addEventListener("input",()=>{
                setTimeout(()=>{
                    $cookies.set("like",JSON.stringify(this.liked));
                },300);
            });
        }, 
        addToCart(product){
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id==product.id){
                    panier[i].quantite++;
                    return this.cart[i].quantite++

                }                
            }
            this.cart.push({
                id:product.id,
                description:product.description,
                img:product.img,
                price:product.price,
                quantite:1
            });
            panier.push({
                id:product.id,
                description:product.description,
                img:product.img,
                price:product.price,
                quantite:1
            });
        },

        cartPlusOne(product){
            product.quantite=product.quantite+1;
        },

        cartRemoveItem(id){
            this.$delete(this.cart,id);
        },

        cartMinusOne(product,id){
            if (product.quantite==1) {
                this.cartRemoveItem(id);
            }else{
                product.quantite=product.quantite-1;
            }
        },


    },
    mounted:()=>{
        this.getlikeCookie;
    }
}


const WishList={
    template:'#WishList',
    name:'WishList',
    data:()=>{
        return{
            products,
            like
        }
    },
    
}

const ShoppingCart={
    template:'#ShoppingCart',
    name:'ShoppingCart',
    data:()=>{
        return{
            products,
            panier,
        }
    },
    computed:{
     
        cartTotalAmount(){
            let total=0;
            for (let i = 0; i < panier.length; i++) {
                total=total+(panier[i].price*panier[i].quantite);
                
            }
            return total;
        },

        cartTotalQuantity(){
            let total=0;
            for (let i = 0; i < panier.length; i++) {
                total=total+panier[i].quantite;
                
            }
            return total;
        },

    },
    
}

const router = new VueRouter({routes:[
    {path:'/',component:Home,name:'Home'},
    {path:'/wishlist', component:WishList,name:'WishList'},
    {path:'/shoppingcart', component:ShoppingCart,name:'ShoppingCart'},
]});

const vue =new Vue({
        router

}).$mount('#app');