import { Link } from "react-router-dom"

function Sidebar(){

return(

<div style={{width:"200px",height:"100vh",background:"#1e293b",color:"white",padding:"20px"}}>

<h4>ZANITH PRIME</h4>

<hr/>

<p><Link to="/" style={{color:"white"}}>Dashboard</Link></p>

<p><Link to="/products" style={{color:"white"}}>Products</Link></p>

<p><Link to="/add-product" style={{color:"white"}}>Add Product</Link></p>

</div>

)

}

export default Sidebar