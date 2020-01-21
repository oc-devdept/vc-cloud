<h1>API DOCUMENTATION</h1>

<span>
The Venture Care API is organised around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs. Make sure to configure base api to the below api
</span>



<h2>BASE URL - http://159.65.14.175:3001/api</h2>


<h3>GET - <span>/products/getMake</span></h3>  

    fields: [
        {...},
        {...}
    ]

Retrieve all the makes from the inventory list

<br/>

<h3>GET - <span>/products/getModel</span></h3>  

    fields: [
        {...},
        {...}
    ]

Retrieve all the models from the inventory list

<br/>

<h3>GET - <span>/categories/{ID}/category</span></h3>  

    [
        {...},
        {...},
        {...}
    ]

Retrieve all models under a selected make's Id

<br/>

<h3>GET - <span>/categories/{ID}</span></h3>  

    {
        id: ...,
        name : ...,
        description : ...,
        files: [...] <-- array of images 
        product : [
            {...},
            {...}
        ]
    }

Retrieve a specific model with its information and products

<br/>

<h3>GET - <span>/products/specificGrades/{ID}</span></h3>  

    fields: [
        {
            id: ...,
            name: ...,
            description: ...,
            cost_Price: ...,
            selling_Price: ...,
            engine: {
                value: ...,
                detailCategory: {
                    name: "Engine",
                    unit: "Horsepower",
                    ...
                }
            },
            power: {...},
            fuel: {...},
            files: [...] <-- array of images 
        },
        {...}
    ]

Retrieve all grades under a specific model

<br/>




This method is used to retrieve Grades, using id of selected Model
GET - /products/specificGrades/:id
Return a JSON data type = response.data.fields : Array



RETRIEVE SPECIFIC ONE GRADE

This method is used to retrieve specific one grade, using id of selected Grade
GET - /products/:id
Return a JSON data type = response.data





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


