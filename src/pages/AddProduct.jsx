import { useState } from "react"
import { getProducts, saveProducts } from "../utils/localStorage"

function AddProduct(){

const [name,setName]=useState("")
const [price,setPrice]=useState("")
const [category,setCategory]=useState("")
const [image,setImage]=useState("")

const handleImage=(e)=>{

const file=e.target.files[0]

const reader=new FileReader()

reader.onloadend=()=>{
setImage(reader.result)
}

reader.readAsDataURL(file)

}

const addProduct=(e)=>{

e.preventDefault()

const product={
name,
price,
category,
image
}

const products=getProducts()

products.push(product)

saveProducts(products)

alert("Product Added Successfully")

}

return(

<div className="container mt-4">

<h2>Add Product</h2>

<form onSubmit={addProduct}>

<input
className="form-control mb-3"
placeholder="Product Name"
onChange={(e)=>setName(e.target.value)}
required
/>

<input
className="form-control mb-3"
placeholder="Price"
onChange={(e)=>setPrice(e.target.value)}
required
/>

<select
className="form-select mb-3"
onChange={(e)=>setCategory(e.target.value)}
required
>

<option value="">Select Category</option>
<option>Tablet</option>
<option>Syrup</option>
<option>Medical Equipment</option>
<option>Health and Safety</option>

</select>

<input
type="file"
className="form-control mb-3"
onChange={handleImage}
/>

{image && <img src={image} height="120" />}

<button className="btn btn-primary">
Add Product
</button>

</form>

</div>

)

}

export default AddProduct