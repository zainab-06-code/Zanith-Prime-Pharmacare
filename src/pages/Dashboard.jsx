import { useEffect, useState } from "react"
import { getProducts } from "../utils/localStorage"

function Dashboard(){

const [products,setProducts]=useState([])

useEffect(()=>{
setProducts(getProducts())
},[])

const totalProducts=products.length
const tablets=products.filter(p=>p.category==="Tablet").length
const syrups=products.filter(p=>p.category==="Syrup").length
const equipment=products.filter(p=>p.category==="Medical Equipment").length

return(

<div className="container mt-4">

<h2>ZANITH PRIME PHARMACARE Dashboard</h2>

<div className="row mt-4">

<div className="col-md-3">
<div className="card text-center p-3 shadow">
<h4>Total Products</h4>
<h2>{totalProducts}</h2>
</div>
</div>

<div className="col-md-3">
<div className="card text-center p-3 shadow">
<h4>Tablets</h4>
<h2>{tablets}</h2>
</div>
</div>

<div className="col-md-3">
<div className="card text-center p-3 shadow">
<h4>Syrups</h4>
<h2>{syrups}</h2>
</div>
</div>

<div className="col-md-3">
<div className="card text-center p-3 shadow">
<h4>Equipment</h4>
<h2>{equipment}</h2>
</div>
</div>

</div>

</div>

)

}

export default Dashboard