import slugify from "slugify";

const employeeData = [
    {
        "name": "Alex Windham",
        "position": "COO",
        "description": "this is the description",
        "bio": "this is the extended bio to only be showed when clicked",
        "image": "./employees/Alex_Windham_COO.png",
        "slug": slugify("Alex Windham")
        
    },
    {
        "name": "Julian Winter",
        "position": "COO",
        "description": "this is the description",
        "bio": "this is the extended bio to only be showed when clicked",
        "image": "Julian_Winter_CEO.png",
        "slug": slugify("Julian Winter")
    }
]

export default employeeData;