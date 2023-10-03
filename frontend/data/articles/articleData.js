import slugify from "slugify";


const articleData = [
    {
        "date": "2023-September-25",
        "Title": "Strong releases its Flagship Computer Vision product",
        "headerImageURL": "../waves.gif",
        "altText": "First CV in Exercise",
        "brand": "StRoNg News",
        "content": "This is the first article",
        "slug": slugify("Strong releases its Flagship Computer Vision product")
    },
    {
        "date": "2023-09-25",
        "Title": "Human Behavioral Optimization: A Journey Through Time and Space",
        "headerImageURL": "../gif_3.gif",
        "altText": "Another alt text",
        "brand": "Forbes",
        "article": "this is second article"
    },
    {
        "date": "2021-March-27",
        "Title": "Making Humans Strong Again.",
        "headerImageURL": "../gif_3.gif",
        "altText": "Another alt text",
        "brand": "Forbes",
        "article": "this is third article"
    },
    {
        "date": "2021-March-27",
        "Title": "We are creating a Human Experience that is pure, honest, secure, and confident. It's in our name. ",
        "headerImageURL": "../gif_3.gif",
        "altText": "Another alt text",
        "brand": "Forbes",
        "article": "this is fourth article"
    },
    {
        "date": "2021-February-15",
        "description": "The team that revolutionized Health, Exercise, and Fitness across Silicon Valley reflects on their journey to Strong",
        "headerImageURL": "../gif_3.gif",
        "altText": "Another alt text",
        "brand": "Forbes",
        "article": "this is fifth article"
    },
    {
        "date": "2020-December-31",
        "Title": "Strong wants to free Homo-Sapiens from uncertainty ",
        "headerImageURL": "../gif_3.gif",
        "altText": "Another alt text",
        "brand": "Forbes",
        "article": "this is sixth article"
    }
]

export default articleData;