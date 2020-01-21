<h1>API DOCUMENTATION</h1>

<span>
The Venture Care API is organised around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs. Make sure to configure base api to the below api
</span>

<br/>
<br/>

<h2>BASE URL - http://159.65.14.175:3001/api</h2>

<br/>

<h3>GET - <span>/products/getMake</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            description: String,
            categoryGroupId: String,
            files: Array <-- images,
            category: Array,
            product: Array,
        }
        
    ]

Retrieve all the makes from the inventory list

<br/>

<h3>GET - <span>/products/getModel</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            description: String,
            categoryGroupId: String,
            categoryGroupId: String,
            files: Array <-- images,
            product: [
                {
                    id: String,
                    name : String,
                    description : String,
                    isActive: Boolean,
                    isFeature: Boolean,
                    categoryGroupId: String,
                    categoryId:	String,
                    cost_Price: String,
                    selling_Price: String,
                    productVariant: Array,
                    productDetailValue: Array,
                    productOption: Array,
                    files: Array <-- images 
                }
            ]
        }
    ]

Retrieve all the models from the inventory list

<br/>

<h3>GET - <span>/categories/{ID}/category</span></h3>  

    [
        {
            id: String,
            name: String,
            description: String,
            categoryGroupId: String,
            categoryId:	String,
            tagId: String,
            files: Array,
            product: [
                 id: String,
                name : String,
                description : String,
                isActive: Boolean,
                isFeature: Boolean,
                categoryGroupId: String,
                categoryId:	String,
                cost_Price: String,
                selling_Price: String,
                productVariant: Array,
                productDetailValue: Array,
                productOption: Array,
                files: Array <-- images 
            ]
        }
    ]

Retrieve all models under a selected make's Id

<br/>

<h3>GET - <span>/categories/{ID}</span></h3>  

    {
        id: String,
        name : String,
        description : String,
        files: Array <-- images 
        product : Array
    }

Retrieve a specific model with its information and products

<br/>

<h3>GET - <span>/products/specificGrades/{ID}</span></h3>  

    fields : [
        {
            id: String,
            name: String,
            description: String,
            cost_Price: String,
            selling_Price: String,
            engine: object,
            power: object,
            fuel: object,
            files: array <-- images 
        },
    ]

Retrieve all grades under a specific model

<br/>

<h3>GET - <span>/products/{ID}</span></h3>  

    {
        id: String,
        name : String,
        description : String,
        isActive: Boolean,
        isFeature: Boolean,
        cost_Price: String,
        selling_Price: String,
        productVariant: Array,
        productDetailValue: Array,
        productOption: Array,
        files: Array <-- images 
    }

Retrieve a specific grade 

<br/>

<h3>GET - <span>/products/specificVariantExterior/{ID}</span></h3>  

    fields : {
        String : {
            id: String,
            name: String,
            groupName: "Exterior",
            objects: [
                {
                    id: String
                    name: String,
                    price: String,
                    isDefault: String,
                    productId: String,
                    productVariantId: String,
                    files : Array <-- images
                }
            ]
        }
    }

Retrieve dynamic keys and values of the product variant exterior, remember to use dynamic mapping to extract the keys and values, hard coding may produce errors in frontend as admin may change the variants anytime

<br/>


RETRIEVE PRODUCT VARIANT

This method is used to retrieve exterior product variant of a Grade
GET - /products/specificVariantExterior/:id
Return a JSON data type = response.data.fields : Array

This method is used to retrieve interior product variant of a Grade
GET - /products/specificVariantInterior/:id
Return a JSON data type = response.data.fields : Array


RETRIEVE PRODUCT OPTIONS

This method is used to retrieve Product Option of a Grade
GET - /products/specificGradeProductOption/:id
Return a JSON data type = response.data.fields : Array

RETRIEVE PRODUCT DETAILS

This method is used to retrieve Product Detail of a Grade with selected Grade ID
GET - /products/specificGradeDetail/:id
Return a JSON data type = {

    fields : {
        Info: {...},
        Detail: [...]
    }

}





RETRIEVE PRODUCT DETAILS

This method is used to retrieve Product Detail of a Grade with selected Grade ID
GET - /products/specificGradeDetail/:id
Return a JSON data type = response.data.fields : Array


RETRIEVE TAGS

This method is used to retrieve Tags of the Models
GET - /tags/getAllTags
Return a JSON data type = response.data.fields : Array

This method is used to retrieve all Models under a Tag
GET - /tags/getAllTagsModels/:id
Return a JSON data type = response.data.fields : Array



RETRIEVE FEATURED GRADES

This method is used to retrieve Featured Grades
GET - /products/getAllFeaturedCars
Return a JSON data type = response.data.fields : Array


