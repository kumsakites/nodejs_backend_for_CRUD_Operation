const express=require("express");
const mongoose=require("mongoose");
const app= express();
const Product=require("./product")
app.use(express.json());// to use express
app.use(express.urlencoded({ // to encodeurl
extended:true
}));
const productData=[];
//mongodb+srv://kumsa:admin123@kumsa.do9lpkn.mongodb.net/?retryWrites=true&w=majority

// connect to mongoose
mongoose.set('strictQuery',true);
mongoose.connect("mongodb+srv://kumsaak:123@kumsa.do9lpkn.mongodb.net/Flutter",{
    // 'useUnifiedTopology':true,
     //"useNewUrlParse":true,
},(error)=>{
   if(!error){
    console.log("Status","Connected to mongoose");
    app.post("/api/add_product",async(req,res)=>{
        console.log("Result",req.body);
        let data=Product(req.body);
        try{
           let dataToStore=await data.save();
           res.status(200).json(dataToStore)
        }catch(error){
res.status(400).json({
    'status':error.message
});
        }
        // const pdata={
        //     "id":productData.length+1,
        //     "pname":req.body.pname,
        //     "pprice":req.body.pprice,
        //     "pdesc":req.body.pdesc
        // };
        // productData.push(pdata);
        // console.log("Final",pdata);
        // res.status(200).send({
        //     "status_code":200,
        //     "message":"Product added successfully",
        //     "product":pdata
        // });
    })
    // get api
    app.get("/api/get_product/:id",async(req,res)=>{
    try{
        let data= await Product.find();
        res.status(200).json(data);
    }catch(error){
res.status(500).json(
    error.message
)
    }
        // if(productData.length > 0){
        //     res.status(200).send({
        //         "status_code":200,
        //         "product":productData
        //     });
        // }else{
        //     res.status(200).send({
        //         "status_code":200,
        //         "product":[]
        //     })  
        // }
    });
    // update api put
    app.patch("/api/update/:id",async(req,res)=>{
        let id=req.params.id;
        let updatedData=req.body;
        let option={
            new:true 
        };
        
        try{
            const data=await Product.findByIdAndUpdate(id,updatedData,option);
        res.send(data);
        }catch(error){
            res.send(error.message);
        }
        // let id=req.params.id*1;
        // let productToUpdate=productData.find(p=>p.id===id);
        // let index=productData.indexOf(productToUpdate);
        // productData[index]=req.body;
        // res.status(200).send({
        //     "status":"success",
        //     "message":"Product updated",
        // });
    });
    // Delete api
    app.delete("/api/delete/:id",async(req,res)=>{
        let id=req.params.id
        try{
const data=await Product.findByIdAndDelete(id);
res.json({
    "status":"Deleted that product ${data.pname} from database"
})
        }catch(error){
res.json(error.message);
        }
        // let productToUpdate=productData.find(p=>p.id===id);
        // let index=productData.indexOf(productToUpdate);
        // productData.splice(index,1);
        // res.status(200).send({
        //     "status":"success",
        //     "message":"Product deleted successfully",
        // });
    });
}
   else{
    console.log(error.message);
   }

});

//post api

app.listen(2000,()=>{
    console.log("Connected to server at 2000...");
})

